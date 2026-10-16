const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'quiz-order.js'), 'utf8');

function fixture(initial, blocked = false) {
  const storage = new Map(initial || []);
  const ids = {};
  const timers = new Map();
  let timerId = 0;
  const createElement = () => ({children: [], attributes: {}, appendChild(child) {
    this.children.push(child); if (child.id) ids[child.id] = child;
  }, setAttribute(key, value) { this.attributes[key] = value; }});
  const parent = {insertBefore(panel) { this.panel = panel; }};
  ids.nav = {parentNode: parent};
  let nextRandom = 9, popupArgs;
  const math = Object.create(Math);
  math.random = () => { nextRandom = (nextRandom * 48271) % 2147483647; return nextRandom / 2147483647; };
  const context = {
    Math: math, JSON, Set, Number, Array, Object, location: {pathname: '/quiz.html'},
    setTimeout(callback) { timers.set(++timerId, callback); return timerId; },
    clearTimeout(id) { timers.delete(id); },
    localStorage: {
      getItem(key) { if (blocked) throw Error('blocked'); return storage.get(key) || null; },
      setItem(key, value) { if (blocked) throw Error('blocked'); storage.set(key, value); },
      removeItem(key) { if (blocked) throw Error('blocked'); storage.delete(key); }
    },
    document: {getElementById: id => ids[id] || null, createElement, head: createElement()},
    window: {showScorePopup(...args) { popupArgs = args; }}
  };
  vm.runInNewContext(source, context);
  return {context, storage, parent, get popupArgs() { return popupArgs; },
    flushTimers() { const callbacks = [...timers.values()]; timers.clear(); callbacks.forEach(callback => callback()); }};
}

const originals = Array.from({length: 12}, (_, id) => ({id, answer: id % 2 === 0}));
const questions = originals.slice();
const one = fixture();
let controller, restarts = 0;
const restart = () => { restarts++; controller.reset(); controller.save({cur: 0, answers: Array(12).fill(null)}); };
controller = one.context.window.QuizOrder.create(questions, {saveKey: 'quiz', restart});
assert.deepEqual(questions, originals, 'first visit keeps the learning order');
const [ordered, random] = one.parent.panel.children[1].children;
random.onclick();
assert.equal(restarts, 1);
assert.notDeepEqual(questions.map(q => q.id), originals.map(q => q.id));
assert.deepEqual([...questions].sort((a, b) => a.id - b.id), originals, 'shuffle contains each unchanged question once');
assert.equal(random.attributes['aria-pressed'], 'true');
const sequence = questions.map(q => q.id);
const answers = Array(12).fill(null);
answers[0] = {picked: questions[0].answer, correct: true};
controller.save({cur: 1, answers});

const two = fixture(one.storage);
const restored = originals.slice();
const again = two.context.window.QuizOrder.create(restored, {saveKey: 'quiz', restart() {}});
assert.deepEqual(restored.map(q => q.id), sequence, 'reload restores the exact random order');
assert.equal(again.progress.cur, 1);
assert.equal(again.progress.answers[0].picked, restored[0].answer, 'saved answer remains attached to the same question');
assert.equal(again.progress.answers[0].correct, true);
one.context.window.showScorePopup(12, 12, {nextText: 'Next'});
assert.equal(one.popupArgs[2].nextText, 'Next');
assert.equal(one.popupArgs[2].onRetry, restart, 'result retry uses the same reset path');
one.popupArgs[2].onRetry();
assert.equal(controller.snapshot().mode, 'random');
assert.notDeepEqual(questions.map(q => q.id), sequence, 'retry reshuffles the next run');
ordered.onclick();
assert.deepEqual(questions, originals, 'switch back restores original content order');
assert.equal(controller.snapshot().mode, 'ordered');
let lateResults = 0;
controller.resultLater(() => lateResults++);
restart();
one.flushTimers();
assert.equal(lateResults, 0, 'starting a new run cancels the old result timer');
controller.resultLater(() => lateResults++);
one.flushTimers();
assert.equal(lateResults, 1, 'current-run result still opens normally');

const old = fixture([['quiz', JSON.stringify({cur: 1, answers})]]);
const legacy = originals.slice();
const migrated = old.context.window.QuizOrder.create(legacy, {saveKey: 'quiz', restart() {}});
assert.deepEqual(legacy, originals);
assert.equal(migrated.progress.cur, 1, 'legacy progress is preserved in its original order');
for (const indices of [[0, 0], Array(12).fill(0), Array.from({length: 12}, (_, i) => i + 1)]) {
  const bad = fixture([['quiz', JSON.stringify({cur: 1, answers, order: {mode: 'random', indices}})]]);
  const state = bad.context.window.QuizOrder.create(originals.slice(), {saveKey: 'quiz', restart() {}});
  assert.equal(state.progress, null, 'invalid stored permutation must not pair old answers with new questions');
}
for (const state of [fixture([['quiz', '{']]), fixture([], true)]) {
  const quiz = state.context.window.QuizOrder.create(originals.slice(), {saveKey: 'quiz', restart() {}});
  assert.doesNotThrow(() => { quiz.reset(); quiz.save({cur: 0, answers}); });
}

const mixed = fixture();
let drill;
drill = mixed.context.window.QuizOrder.create(originals.slice(), {restart() { drill.reset(); }});
mixed.parent.panel.children[1].children[1].onclick();
const mixedOrder = drill.snapshot();
const mixedReload = fixture(mixed.storage);
const reloadedDrill = mixedReload.context.window.QuizOrder.create(originals.slice(), {restart() {}});
assert.equal(JSON.stringify(reloadedDrill.snapshot()), JSON.stringify(mixedOrder), 'mixed drill reload restores the order even without saved answers');

let pages = 0, total = 0;
for (const name of fs.readdirSync(root).filter(name => name.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, name), 'utf8');
  const declaration = /const (Q|DATA)\s*=\s*\[/.exec(html);
  if (!declaration) continue;
  const start = html.indexOf('[', declaration.index);
  const end = html.indexOf('\n];', start);
  assert.ok(end > start, name);
  const items = vm.runInNewContext(`(${html.slice(start, end + 2)})`);
  const count = /const TOTAL=(\d+)/.exec(html);
  if (count) assert.equal(items.length, Number(count[1]), `${name}: question total`);
  if (declaration[1] === 'DATA') {
    assert.doesNotMatch(html, /function build\(\) \{\s*quizOrder\.reset\(\)/, `${name}: initial render must not reshuffle`);
    assert.match(html, /function reset\(\) \{\s*quizOrder\.reset\(\);\s*build\(\);/, `${name}: new run shuffles once before rendering`);
  }
  assert.equal((html.match(/src="[^"\n]*quiz-order\.js/g) || []).length, 1, `${name}: common controller once`);
  assert.ok(html.indexOf('sounds.js') < html.indexOf('score-popup.js'), `${name}: sound/popup load order`);
  assert.ok(html.indexOf('score-popup.js') < html.indexOf('quiz-order.js'), `${name}: controller load order`);
  const state = fixture();
  let quiz;
  const list = [...items];
  quiz = state.context.window.QuizOrder.create(list, {restart() { quiz.reset(); }});
  state.parent.panel.children[1].children[1].onclick();
  assert.equal(new Set(list).size, items.length, `${name}: no repeat or omission`);
  assert.ok(list.every(q => items.includes(q)), `${name}: exact question objects, answers and explanation unchanged`);
  pages++; total += items.length;
}
assert.equal(pages, 20);
console.log(`GREEN: ${pages} quiz pages / ${total} questions; shuffle, exact resume, legacy progress, reset, popup retry, storage failure, totals and load order`);
