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
const topics = [...hub.matchAll(/<li class="topic">([\s\S]*?)<\/li>/g)].map(([, body]) => ({
  number: body.match(/class="topic-number">(\d+)</)[1],
  title: body.match(/<h2>([\s\S]*?)<\/h2>/)[1],
  links: [...body.matchAll(/href="([^"]+)"/g)].map(match => match[1])
}));
const originalTopics = [
  {
    "number": "01",
    "title": "Stress — 강세 완성",
    "links": [
      "stress_study.html",
      "stress.html",
      "stress_exercises.html",
      "stress_practice.html",
      "stress_practice2.html"
    ]
  },
  {
    "number": "02",
    "title": "Noun/Verb Stress Shift",
    "links": [
      "noun_verb_study.html",
      "noun_verb_ox.html",
      "noun_verb_exercises.html"
    ]
  },
  {
    "number": "03",
    "title": "Suffix-conditioned Stress",
    "links": [
      "stress_study.html#s6",
      "suffix_ox.html"
    ]
  },
  {
    "number": "04",
    "title": "Compound Stress vs NSR",
    "links": [
      "stress_study.html#s7",
      "compound_ox.html"
    ]
  },
  {
    "number": "05",
    "title": "Sentence Stress &amp; Focus Stress",
    "links": [
      "sentence_study.html",
      "sentence_ox.html"
    ]
  },
  {
    "number": "06",
    "title": "Assimilation 총론",
    "links": [
      "assimilation_study.html",
      "assimilation_ox.html",
      "assimilation_exercises.html"
    ]
  },
  {
    "number": "07",
    "title": "Nasalization &amp; Epenthesis",
    "links": [
      "nasalization_epenthesis_study.html",
      "nasalization_ox.html"
    ]
  },
  {
    "number": "08",
    "title": "Voice Assimilation",
    "links": [
      "voice_study.html",
      "voice_ox.html"
    ]
  },
  {
    "number": "09",
    "title": "Flapping",
    "links": [
      "flapping_study.html",
      "flapping_ox.html",
      "flapping_exercises.html"
    ]
  },
  {
    "number": "10",
    "title": "Aspiration",
    "links": [
      "aspiration_study.html",
      "aspiration_ox.html",
      "aspiration_exercises.html"
    ]
  },
  {
    "number": "11",
    "title": "Vowel Reduction &amp; Schwa",
    "links": [
      "schwa_study.html",
      "schwa_ox.html",
      "schwa_exercises.html"
    ]
  },
  {
    "number": "12",
    "title": "Deletion",
    "links": [
      "deletion_study.html",
      "deletion_ox.html"
    ]
  },
  {
    "number": "13",
    "title": "Distinctive Features",
    "links": [
      "features_study.html",
      "features_ox.html"
    ]
  },
  {
    "number": "14",
    "title": "Syllable &amp; Phonotactics",
    "links": [
      "syllable_study.html",
      "syllable_ox.html"
    ]
  }
];
assert.equal(topics.length, 15, 'The hub must have exactly 15 topic cards');
assert.deepEqual(topics.slice(0, 14), originalTopics,
  'Preserve all original 14 topic identities, order, and study/OX/practice links');
assert.deepEqual(topics[14], {
  number: '15',
  title: 'Distribution &amp; Phonemic Analysis',
  links: ['distribution_study.html']
}, 'Topic 15 must be the distribution study unit, without an invented quiz link');
assert.equal(topics.filter(topic => topic.links.includes('distribution_study.html')).length, 1,
  'The distribution entry must occur exactly once');
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
console.log('GREEN: correction regressions, 15-topic hub links (original 14 preserved + distribution), focus/touch CSS, all inline JavaScript syntax');
