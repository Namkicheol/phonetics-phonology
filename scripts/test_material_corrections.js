const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const questions = f => vm.runInNewContext(read(f).match(/const (?:Q|DATA)\s*=\s*(\[[\s\S]*?\n\]);/)[1]);
// Guard the distinction between a typical environment and a necessary condition.
const flap = questions('flapping_ox.html');
assert.equal(flap[10].ans, false);
assert.match(flap[10].text, /필수 조건/);
assert.match(flap[2].correct, /흔한 환경/);
assert.match(flap[14].correct, /neutralize/);
assert.doesNotMatch(flap[13].text, /later/);
const aspiration = questions('aspiration_ox.html');
assert.equal(aspiration[7].ans, false);
assert.match(aspiration[7].text, /Strong aspiration/);
assert.match(aspiration[4].why, /weak aspiration/);
assert.match(aspiration[15].why, /2022/);
const aspirationNote = read('aspiration_study.html');
assert.match(aspirationNote, /해당 문항의 이분법/);
assert.doesNotMatch(aspirationNote, /onset 전용/);
assert.match(aspirationNote, /assets\/aspiration-scope\.svg/);
const stress = read('stress_study.html');
assert.match(stress, /comˈmittee/);
assert.match(stress, /John loves ˈMary/);
assert.match(stress, /2023 1차 B-4/);
assert.doesNotMatch(stress, /2010 1차 Q32|2014 1차 A-기입2|2020 1차 A-기입3|2017 2차 B-서술4/);
assert.equal(questions('stress_exercises.html')[8].a, 3);
assert.match(questions('stress_exercises.html')[8].o[2], /강세를 받는 음절에는 full vowel/);
assert.match(read('stress_concepts.html'), /4번째 -ic의 모음이 모두 \[ə\]/);
const hub = read('phonetics.html');
assert.equal((hub.match(/class="topic"/g)||[]).length, 14);
assert.match(hub, /min-height:44px/);
assert.match(hub, /:focus-visible/);
assert.doesNotMatch(hub, /업로드 현황|완전정복|hero-stats|--[a-z]+:/);
for (const match of hub.matchAll(/href="([^"#]+)"/g)) {
  if (!/^https?:/.test(match[1])) assert.ok(fs.existsSync(path.join(root, match[1])), match[1]);
}
for (const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))) {
  for (const match of read(file).matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    if (match[1].trim()) new vm.Script(match[1], {filename:file});
  }
}
console.log('GREEN: correction regressions, 14-topic hub links, focus/touch CSS, all inline JavaScript syntax');
