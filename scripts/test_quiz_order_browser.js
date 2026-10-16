const {webkit} = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const base = process.env.QUIZ_BASE_URL || 'http://127.0.0.1:8771/';
const output = process.env.QUIZ_QA_DIR || path.join(root, 'output', 'qa');
const files = fs.readdirSync(root).filter(name => name.endsWith('.html')
  && /const (Q|DATA)\s*=\s*\[/.test(fs.readFileSync(path.join(root, name), 'utf8')));

(async () => {
  const browser = await webkit.launch();
  const results = [];
  try {
    const page = await browser.newPage({viewport: {width: 320, height: 900}});
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const name of files) {
      await page.goto(new URL(name, base).href);
      await page.waitForSelector('.quiz-order');
      const single = await page.evaluate(() => typeof Q !== 'undefined');
      const original = await page.evaluate(() => JSON.stringify(typeof Q !== 'undefined' ? Q : DATA));
      if (name === 'stress.html') {
        await page.evaluate(() => {
          const old = {cur: 0, answers: Array(TOTAL).fill(null)};
          old.answers[0] = {picked: Q[0].ans, correct: true};
          localStorage.setItem(SAVE_KEY, JSON.stringify(old));
        });
        await page.reload();
        assert.equal(await page.evaluate(() => answers[0].correct && quizOrder.snapshot().mode === 'ordered'), true);
      }
      await page.locator('.quiz-order button').nth(1).click();
      const randomOrder = await page.evaluate(() => quizOrder.snapshot());
      assert.equal(randomOrder.mode, 'random');
      assert.equal(new Set(randomOrder.indices).size, randomOrder.indices.length);
      if (single) {
        const first = await page.evaluate(() => ({ans: Q[0].ans, drill: !!Q[0].syls, text: JSON.stringify(Q[0])}));
        if (first.drill) await page.locator('.syl-btn').nth(first.ans).click();
        else await page.locator(first.ans ? '#ob' : '#xb').click();
        assert.equal(await page.evaluate(() => answers[0].correct), true);
        await page.reload();
        await page.waitForSelector('.quiz-order');
        assert.deepEqual(await page.evaluate(() => quizOrder.snapshot()), randomOrder);
        assert.equal(await page.evaluate(() => JSON.stringify(Q[0])), first.text);
        assert.equal(await page.evaluate(() => answers[0].correct), true);
        await page.locator('#qa .next-btn').click();
        assert.equal(await page.evaluate(() => cur), 1);
        await page.evaluate(() => {
          while (cur < TOTAL) { if (!answers[cur]) pick(Q[cur].ans); next(); }
        });
        await page.waitForSelector('#sp-retry');
        assert.equal(await page.locator('#sp-score').textContent(), '100점');
        await page.locator('#sp-retry').click();
        assert.equal(await page.locator('#sp-overlay').count(), 0);
        assert.equal(await page.locator('#sp-canvas').count(), 0, 'retry cleans the previous celebration');
        assert.equal(await page.evaluate(() => cur === 0 && answers.every(answer => answer === null)), true);
      } else {
        await page.reload();
        await page.waitForSelector('.quiz-order');
        assert.deepEqual(await page.evaluate(() => quizOrder.snapshot()), randomOrder, 'mixed drill initial build preserves saved order');
        const first = await page.evaluate(() => DATA[0]);
        if (first.t === 'ox') await page.locator(first.a ? '#bo0' : '#bx0').click();
        else if (first.t === 'mc') await page.locator(`#bm0_${first.a}`).click();
        else {
          for (let j = 0; j < first.blanks.length; j++) await page.locator(`#fi0_${j}`).fill(first.blanks[j]);
          await page.locator('#qc0 .fi-cfm').click();
        }
        assert.equal(await page.evaluate(() => COR === 1 && ANS[0]), true);
        await page.evaluate(() => DATA.forEach((q, i) => {
          if (ANS[i]) return;
          if (q.t === 'ox') doOX(i, q.a);
          else if (q.t === 'mc') doMC(i, q.a);
          else { q.blanks.forEach((answer, j) => { document.getElementById(`fi${i}_${j}`).value = answer; }); doFI(i); }
        }));
        assert.equal(await page.evaluate(() => COR === DATA.length && ANS.every(Boolean)), true);
        await page.locator('.r-btn').click();
        assert.equal(await page.evaluate(() => COR === 0 && ANS.every(answer => !answer)), true);
      }
      const nextOrder = await page.evaluate(() => quizOrder.snapshot());
      assert.equal(nextOrder.mode, 'random');
      assert.notDeepEqual(nextOrder.indices, randomOrder.indices);
      if (['stress.html', 'noun_verb_exercises.html'].includes(name)) {
        await page.locator('.quiz-order').scrollIntoViewIfNeeded();
        fs.mkdirSync(output, {recursive: true});
        await page.screenshot({path: path.join(output, `random-${name.replace('.html', '')}-320.png`)});
      }
      await page.locator('.quiz-order button').nth(0).click();
      assert.equal(await page.evaluate(() => JSON.stringify(typeof Q !== 'undefined' ? Q : DATA)), original);
      const layout = await page.locator('.quiz-order').evaluate(panel => ({
        overflow: document.documentElement.scrollWidth - innerWidth,
        controlsOutside: [...panel.querySelectorAll('button')].some(button => button.getBoundingClientRect().right > innerWidth),
        minTarget: Math.min(...[...panel.querySelectorAll('button')].map(button => button.getBoundingClientRect().height))
      }));
      assert.equal(layout.controlsOutside, false);
      assert.ok(layout.minTarget >= 44);
      results.push({name, type: single ? 'single' : 'mixed', width: 320, ...layout});
    }
    for (const width of [390, 1280]) {
      await page.setViewportSize({width, height: 900});
      for (const name of files) {
        await page.goto(new URL(name, base).href);
        await page.waitForSelector('.quiz-order');
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        const outside = await page.locator('.quiz-order button').evaluateAll(buttons => buttons.some(button => button.getBoundingClientRect().right > innerWidth));
        assert.equal(outside, false);
        results.push({name, width, overflow, controlsOutside: outside});
      }
    }
    await page.goto(new URL('stress.html', base).href);
    await page.waitForSelector('.quiz-order');
    await page.evaluate(() => {
      freshStart();
      while (cur < TOTAL) { pick(Q[cur].ans); next(); }
      freshStart();
    });
    await page.waitForTimeout(650);
    assert.equal(await page.locator('#sp-overlay').count(), 0, 'starting again before the completion timer prevents a stale result');
    assert.deepEqual(errors, []);
    fs.mkdirSync(output, {recursive: true});
    fs.writeFileSync(path.join(output, '2026-10-16-random-browser.json'), JSON.stringify(results, null, 2));
    console.log(`GREEN: ${files.length} actual quizzes completed/retried; ${results.length} viewport checks; exact resume and original-order restoration; no page errors`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
