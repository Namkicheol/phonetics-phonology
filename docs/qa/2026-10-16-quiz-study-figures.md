# Quiz feedback: existing study figures

Status: implementation and local WebKit checks GREEN; independent review pending. No commit, push or deployment performed.

## Scope

Four exact question mappings only. All question arrays, answers, why/source/compare text and progress-storage code are unchanged. The helper uses filename + `src` + `cat`, so random order does not change the mapping. It adds a closed **그림으로 이해하기** disclosure after graded feedback, including restored answered questions. Unanswered/unrelated questions receive no figure. Expanding it makes no requests or progress writes.

| Quiz question | Reused illustration | Study link |
| --- | --- | --- |
| `stress.html`: Trochaic Foot / Foot Structure | Existing `stress_study.html` first foot-box: Ft → S/W | `stress_study.html#s9` |
| `flapping_ox.html`: Flapping / 규칙 형식화 | Testmaster `linguistics_2016_B02` SVG, attic vs attack | `flapping_study.html#rule` |
| `nasalization_ox.html`: Epenthesis / 복수 /ɪz/ | Testmaster `linguistics_2011_X33` SVG, kids vs buses; [ə]/[ɪ] variation retained | `nasalization_epenthesis_study.html#epenthesis` |
| `suffix_ox.html`: -y (photography) / 강세 이동 예시 | Testmaster `linguistics_2016_A06` SVG, PHOtograph→phoTOGraphy vs SUMmer→SUMmery | `stress_study.html#s6` |

The three SVG strings are exact copies of already independently reviewed source diagrams; no new phonological diagram was invented. Public markup has no local refs paths or internal author names. It uses static SVG title/desc/viewBox/ARIA, no scripts, external asset URLs, event attributes or foreignObject.

## Source checks

Physical LF line numbers follow `rg -n`; the one-line AEP locations are character offsets already checked in Testmaster's source QA. The copied SVGs preserve their lexical-example limits and qualifications.

- Foot: phonetics repo `refs/영어학 짱은 나야!!!_가루미 복사본.md:794–801` (strong followed by optional weak syllables), `refs/메가쌤_기출분석.md:3087–3121,3199–3207` (trochaic foot and initial position), English original Carr, `refs/phonetics/English_Phonetics_and_Phonology.md:6408–6426` (trochaic feet). The existing study box is at `stress_study.html:1142–1148` before this patch.
- Flapping: Testmaster `refs/영어학 짱은 나야!!!_가루미.md:525–529`; `refs/23. 음운론 기출 메타 분석(기출 확장, 기본 개념, 유의점 단원별).pdf.md:476–495`; Yavas, *Applied English Phonology*, 3rd ed., Ch.3 pp.62–63, `refs/aep.md:1`, chars142928–145250. attic/attack compare following stress; lexical exceptions remain explicit.
- Insertion: Testmaster `refs/영어학 짱은 나야!!!_가루미.md:484–500`; `refs/루이스기출문제.md:3218`, p.357; Fromkin et al., *An Introduction to Language*, 10th ed., Ch.6 pp.247–248, `refs/An Introduction to Language 10th Edition1.md:19307–19330`. Plural /z/ after sibilants and inserted vowel; both [ə] and [ɪ] transcriptions are acknowledged.
- Suffix: Testmaster `refs/영어학 짱은 나야!!!_가루미.md:750–768`; meta-analysis MD above `1210–1228`; Yavas, AEP3 Ch.7 pp.189–191, `refs/aep.md:1`, chars400700–401120. Noun/adjective -y contrast; graph compares these examples rather than asserting obligatory visible movement for every base.
- Prior independent source verification: Testmaster `docs/qa/2026-10-16-linguistics-diagrams-next-phonology.md` and `docs/qa/2026-10-16-linguistics-phonology-review.md`. No new definitions/translations were authored in this patch.

## Validation

- `node scripts/test_quiz_study_figures.js` — GREEN: four real-question mappings, uniqueness, all other question mappings empty, closed disclosure, safe static markup and existing study anchors.
- `NODE_PATH=/Users/namgicheol/.npm/_npx/a8e354ef885d5297/node_modules node scripts/test_quiz_study_figures.js --ui` — GREEN: native WebKit, 4 types ×320/390/1280 =12 cases; correct and wrong feedback, random order, reload restoring the same answered question, unchanged local progress on expand/reload, no additional requests, valid SVG/ARIA, no page overflow or clipped SVG labels. Mobile figures fit without internal horizontal scrolling. Label minimum: SVG15.79px at320,17px at390/1280; existing foot tree17px.
- All four Q arrays deep-equal the pre-random-change snapshot `/tmp/phon-random-baseline-20261016.json`, including user modifications already present there.
- Screenshots inspected after finite card/feedback animations complete: `output/qa/stress-figure-320.png`, `flapping_ox-figure-320.png`, `nasalization_ox-figure-320.png`, `suffix_ox-figure-320.png`. Measurement: `output/qa/quiz-study-figures-20261016.json`.
- Browser context is isolated and local-only; external requests are blocked. No Aside session or real user storage is accessed. These are local checks, not production readback.
- Shared Lazyweb research handled by the random-order worker: https://www.lazyweb.com/report/lazyweb/d7f327a1-52f6-421e-997f-1addcd1bbb95/?source=create

## Out-of-scope existing issue

`stress.html`, `src="W-S sequence"`, `cat="Foot Structure"`: the statement describes toDAY/aLONE as Iambic foot and currently has `ans:true`, but its existing correct/why paragraphs explicitly distinguish a W-S surface sequence from Carr's foot analysis. Carr `English_Phonetics_and_Phonology.md:8650–8675` explains an initial stray unstressed syllable outside the following foot and denies W-S feet in that analysis. This item was excluded from illustration mappings and left unchanged. A separate source-grounded question/answer review is required; this patch must not silently change user question data.

## Handoff

Owned runtime files: `quiz-study-figures.js`, `quiz-study-figures.css`, plus only their includes and renderExp hooks in the four HTML files above. Owned test: `scripts/test_quiz_study_figures.js`. The random-order worker owns quiz-order.js, other init/save/reset hooks, score-popup.js and its own tests. Do not stage whole shared HTML files without separating baseline→owned hunks. Standalone owner patch is prepared under `/tmp/phon-figures-only-20261016.patch` for the parent release process.
