const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const http = require('node:http');

const root = path.resolve(__dirname, '..');
const cases = [
  ['stress.html', 'Trochaic Foot', 'Foot Structure', 'Trochee (Trochaic)'],
  ['flapping_ox.html', 'Flapping', '규칙 형식화', 'attic and attack'],
  ['nasalization_ox.html', 'Epenthesis', '복수 /ɪz/', 'Plural forms'],
  ['suffix_ox.html', '-y (photography)', '강세 이동 예시', 'Two effects of suffix']
];
const helper = fs.readFileSync(path.join(root, 'quiz-study-figures.js'), 'utf8');

for (const [file, src, cat, expected] of cases) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const questions = vm.runInNewContext(html.match(/const Q\s*=\s*(\[[\s\S]*?\n\]);/)[1]);
  const window = {location: {pathname: '/' + file}};
  vm.runInNewContext(helper, {window});
  const matches = questions.filter(q => q.src === src && q.cat === cat);
  assert.equal(matches.length, 1, file + ': unique stable question labels');
  const figure = window.QuizStudyFigures.render(matches[0]);
  assert.ok(figure.includes(expected), file + ': relevant existing figure');
  assert.match(figure, /^<details class="quiz-study-figure">/);
  assert.doesNotMatch(figure, /<details[^>]*\bopen\b/);
  assert.doesNotMatch(figure, /<script|foreignObject|\son\w+=|(?:href|src)=["']https?:|<image|<use/i);
  const href = figure.match(/href="\.\/([^"]+)"/)[1];
  const [study, anchor] = href.split('#');
  assert.ok(fs.readFileSync(path.join(root, study), 'utf8').includes('id="' + anchor + '"'));
  for (const q of questions.filter(q => q !== matches[0])) {
    assert.equal(window.QuizStudyFigures.render(q), '', file + ': unrelated question unchanged');
  }
  window.location.pathname = '/unrelated.html';
  assert.equal(window.QuizStudyFigures.render(matches[0]), '', 'no cross-page propagation');
  assert.equal((html.match(/src="\.\/quiz-study-figures\.js/g) || []).length, 1);
  assert.ok(html.indexOf('quiz-study-figures.js') > html.indexOf('score-popup.js'));
}
console.log('GREEN: four exact mappings, unrelated questions, closed details, safe static markup, study anchors');

async function browserTest() {
  const {webkit} = require('playwright');
  const server = http.createServer((req, res) => {
    const filename = path.join(root, decodeURIComponent(new URL(req.url, 'http://local').pathname));
    if (!filename.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try {
      const types = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css'};
      res.setHeader('Content-Type', types[path.extname(filename)] || 'application/octet-stream');
      res.end(fs.readFileSync(filename));
    } catch (_) { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await webkit.launch();
  const results = [];
  const output = path.join(root, 'output', 'qa');
  fs.mkdirSync(output, {recursive:true});
  try {
    for (const width of [320, 390, 1280]) {
      for (const [file, src, cat] of cases) {
        const context = await browser.newContext({viewport:{width,height:900}});
        const page = await context.newPage();
        const errors = [];
        let requests = 0;
        page.on('pageerror', error => errors.push(error.message));
        page.on('request', () => requests++);
        await page.route('**/*', route => new URL(route.request().url()).origin === origin && route.request().method() === 'GET' ? route.continue() : route.abort());
        await page.goto(origin + '/' + file);
        await page.waitForFunction(() => typeof Q !== 'undefined' && window.QuizStudyFigures && window.QuizOrder);
        await page.getByRole('button', {name:'🔀 랜덤으로 새로 풀기', exact:true}).click();
        await page.evaluate(({src,cat}) => {cur=Q.findIndex(q=>q.src===src&&q.cat===cat);render();}, {src,cat});
        assert.equal(await page.locator('.quiz-study-figure').count(), 0, 'no figure before grading');
        // Every mapped question is true: cover both wrong and correct feedback paths.
        await page.locator(width === 390 ? '#xb' : '#ob').click();
        const detail = page.locator('.quiz-study-figure');
        assert.equal(await detail.count(), 1);
        assert.equal(await detail.getAttribute('open'), null);
        const storage = await page.evaluate(() => JSON.stringify(localStorage));
        const beforeOpen = requests;
        await detail.locator('summary').click();
        await page.evaluate(async () => {
          await Promise.all(document.getAnimations().map(animation => animation.finished.catch(()=>{})));
          await new Promise(resolve => requestAnimationFrame(()=>requestAnimationFrame(resolve)));
        });
        const geometry = await detail.evaluate(el => {
          const svg = el.querySelector('svg');
          const body = el.querySelector('.quiz-study-figure-body');
          const invalid = svg ? [...svg.querySelectorAll('text')].filter(t=>{
            const b=t.getBBox(), v=svg.viewBox.baseVal;
            return b.x<v.x-1 || b.y<v.y-1 || b.x+b.width>v.x+v.width+1 || b.y+b.height>v.y+v.height+1;
          }).map(t=>t.textContent) : [];
          return {pageOverflow:document.documentElement.scrollWidth>innerWidth+1,
            minFont:svg ? Math.min(...[...svg.querySelectorAll('text')].map(t=>parseFloat(getComputedStyle(t).fontSize)*svg.getBoundingClientRect().width/svg.viewBox.baseVal.width)) : parseFloat(getComputedStyle(el.querySelector('.quiz-foot-tree')).fontSize),
            invalid, internalScroll:body.scrollWidth>body.clientWidth+1};
        });
        assert.equal(geometry.pageOverflow, false, file + ' page overflow at ' + width);
        assert.equal(geometry.internalScroll, false, file + ' complete figure fits at ' + width);
        assert.deepEqual(geometry.invalid, [], file + ' clipped SVG labels');
        assert.ok(geometry.minFont >= 15, 'readable figure labels');
        assert.equal(await page.evaluate(() => JSON.stringify(localStorage)), storage, 'opening figure must not change progress');
        assert.equal(requests, beforeOpen, 'static expansion must not request remote resources');
        if (width === 320) await detail.screenshot({path:path.join(output, file.replace('.html','') + '-figure-320.png')});
        await page.reload();
        await page.waitForSelector('.quiz-study-figure');
        assert.equal(await page.locator('.quiz-study-figure').getAttribute('open'), null, 'restored answer starts collapsed');
        assert.equal(await page.evaluate(() => Q[cur].src), src, 'randomized answered question restores');
        assert.equal(await page.evaluate(() => JSON.stringify(localStorage)), storage, 'reload preserves saved progress');
        const xmlErrors = await page.locator('.quiz-study-figure').evaluate(el => {
          const svg=el.querySelector('svg');
          if (!svg) return 0;
          const xml=new DOMParser().parseFromString(svg.outerHTML,'image/svg+xml');
          const labels=svg.getAttribute('aria-labelledby').split(/\s+/);
          if (!labels.every(id=>svg.querySelector('[id="'+id+'"]'))) return 1;
          return xml.querySelectorAll('parsererror').length;
        });
        assert.equal(xmlErrors, 0, 'valid accessible SVG');
        assert.deepEqual(errors, []);
        results.push({file,width,...geometry,status:'GREEN'});
        await context.close();
      }
    }
    fs.writeFileSync(path.join(output,'quiz-study-figures-20261016.json'), JSON.stringify(results,null,2));
    console.log('GREEN: WebKit 12 cases; random-order grading/correct/wrong/reload, disclosure, no extra requests/progress changes, 320/390/1280 layout');
  } finally {
    await browser.close();
    await new Promise(resolve=>server.close(resolve));
  }
}

if (process.argv.includes('--ui')) browserTest().catch(error=>{console.error(error);process.exitCode=1;});
