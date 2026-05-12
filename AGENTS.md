# 임용 음운론 서브노트 마스터

## Codex 1차 진입 문서

이 파일이 현재 레포의 에이전트 지침 원본이다. Codex는 작업 시작 시 `AGENTS.md`를 먼저 읽고, `CLAUDE.md`를 우선 지침으로 삼지 않는다.

- `CLAUDE.md`: Claude Code 시절의 legacy 참고 문서. 현재는 호환용 포인터이며, 규칙 원본이 아니다.
- `docs/codex-handoff.md`: Claude에서 Codex로 넘어온 인수인계와 잔여 작업 목록.
- 규칙 충돌 시 우선순위: `AGENTS.md` → `docs/한글용어.md` / `docs/기출맥락_2010_2026.md` → `docs/codex-handoff.md` → `CLAUDE.md`.

## Codex 작업 흐름

1. 작업 전 `git status --short --branch`로 사용자 변경과 미추적 자료를 확인한다.
2. 콘텐츠 작업은 `docs/한글용어.md`와 `docs/기출맥락_2010_2026.md`를 먼저 대조한다.
3. `_study.html` / `*_concepts.html` 생성·anchor 변경 시 testmaster `concept_anchors.json` 연동과 `wire_concept_links.py` 검증을 함께 수행한다.
4. OX 문항·해설·블로그 본문에서 기출 연도·출제 의도·답안 패턴은 검증된 refs에 있을 때만 쓴다.
5. 작업 후 변경 파일 diff를 확인하고, 필요한 검증 명령을 실행한 뒤 결과를 요약한다.

## 검증 기준

- 문서/지침 변경: 관련 markdown diff 확인.
- HTML/CSS 변경: 모바일 우측 잘림 방지(`minmax(0,1fr)`, table scroll, `overflow-wrap`) 확인.
- 퀴즈 변경: `TOTAL` / `/N문제` / 정답 index / `sounds.js` → `score-popup.js` → 퀴즈 JS 로드 순서 확인.
- concept_link 변경: testmaster에서 `python3 scripts/wire_concept_links.py` 실행 후 `깨진링크: 0건` 확인.
- code-review-graph hook이 실행되면 결과를 확인하되, `.code-review-graph/` 산출물은 커밋하지 않는다.

## Git 처리 기준

- 사용자가 "푸쉬", "알아서 올려", "커밋해" 등으로 요청하면 관련 변경만 stage → commit → push까지 처리한다.
- 사용자가 만들었거나 출처가 불명확한 미추적 refs/자료 폴더는 명시 요청 없이는 stage하지 않는다.
- push 전 가능하면 `git fetch origin` 후 `HEAD...origin/main` 차이를 확인한다.
- 커밋 메시지는 변경 목적이 드러나게 짧게 쓴다.
- destructive 명령(`reset --hard`, `checkout --`, `rm`)은 명시 요청 없이는 실행하지 않는다.

임용고시 대비 **음성학·음운론** OX 퀴즈 + 개념 정리 + 블로그 원서 정리 웹 애플리케이션.
순수 HTML/CSS/JS (백엔드 없음). **서브노트 개념** — 책 통째 정리가 아니라 기출 분류 구조 중심.

> **레포 정의**: 음성학·음운론 단일 영역. 형태론·통사론·의미론·화용론은 별도 레포에서 다룸 (의미론·형태론은 추후 `linguistics 나머지` 통합 레포로 정리 예정).
> 변형생성문법(통사론 심화)은 sibling 레포 `transformational-grammar`에서 다룸.

---

## 한글 용어 규칙 (필수)

`_study.html` 개념 본문 / OX 퀴즈 `why` / 규칙 페이지 / 블로그 본문 등 **한글이 등장하는 모든 텍스트**에서 학술 키워드는 영어 원어로 통일한다(예: `장자음` → `geminate`, `관상 자음` → `coronal consonant`, `의무대조원리` → `Obligatory Contour Principle (OCP)`). 한글 설명 블록 자체는 유지. distinctive feature는 항상 `[+coronal]` 등 영어 표준 표기.

> 상세 매핑표·예시·위반 트리거는 **`docs/한글용어.md`** 참조. 정책 원본은 Codex 전역 지침의 "임용 관련 작업: 한국어 용어 규칙" 및 testmaster `docs/한글용어.md`.

---

## 🔗 testmaster 연동 — concept_link 자동 적용 (필수)

이 레포의 `_study.html` / `*_concepts.html` 챕터를 만들거나 변경하면, testmaster의 기출 데이터가 자동으로 그 챕터를 "💎 합격자 노트에서 더 자세히" 링크로 가리키도록 매핑표를 갱신해야 한다.

**이 레포명 (concept_anchors.json key): `phonetics-phonology`**

### 새 챕터 만들 때 절차

1. 해당 HTML 안 각 섹션에 `id="..."` anchor 부여 (의미 있는 영문 slug 권장: `aspiration`, `syllable-weight`, `flapping` 등)
2. testmaster의 `data/concept_anchors.json` 갱신 — 해당 챕터의 anchor·title·terms 추가:
   ```json
   "phonetics-phonology": {
     "stress_study.html": [
       { "anchor": "syllable-weight", "title": "Syllable Weight",
         "terms": ["Syllable Weight", "heavy syllable", "light syllable", "mora"] }
     ]
   }
   ```
3. testmaster에서 자동 적용 + 검증 실행:
   ```bash
   cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Developments/testmaster
   python3 scripts/wire_concept_links.py
   ```
4. 출력에서 `깨진링크: 0건` 확인. 깨졌으면 anchor 이름 수정.

### 트리거 (Codex 자동 실행)

다음 상황에서 별도 지시 없이 위 절차를 실행한다:
- 새 `_study.html` / `*_concepts.html` 챕터 생성/완성 직후
- 기존 챕터에 섹션 추가/제거/anchor 변경 시
- 사용자가 "기출 연동", "concept_link", "testmaster 적용", "wire" 등 언급 시

### testmaster 위치

`~/Library/Mobile Documents/com~apple~CloudDocs/Developments/testmaster/`
규칙 원본: 위 디렉토리의 `AGENTS.md` "concept_link 자동 적용" 섹션
GitHub: `https://github.com/Namkicheol/testmaster`

---

## 콘텐츠 뼈대 — 기출 분석 분류 구조

> 모든 페이지·블로그 글 제작은 아래 분류를 기준으로 삼는다.

| 분류 | 주제 | 핵심 기출 포인트 | 최근 출제 |
|------|------|-----------------|---------|
| 분류 1 | Place / Manner / Distinctive Features | +/−continuant, coronal/anterior/labial/dorsal, NC vs Glides, j-dropping | **2026 A06** |
| 분류 2 | Phoneme & Allophone | complementary distribution, free variation, allophones, geminate | **2026 A04** |
| 분류 3 | Syllable | sonority, syllabic nasals/liquids, -ization, onset/coda | 2023 |
| 분류 4/5 | Phonological Rules | aspiration, flapping, palatalization, /t//g//r/ deletion, nasal place assimilation, voice assimilation, devoicing, schwa insertion, CCS, neutralization, liquid assim./dissim., epenthesis, metathesis, schwa deletion, trisyllabic laxing, vowel neutralization | **2024 A04·B04** |
| 분류 6 | Stress & Intonation | heavy/light syllable, stress rules (N/V/Adj/compound), stress-shifting suffix, foot structure (trochaic/iambic), nuclear stress, prosodic condition | **2025 B04** |

---

## 파일 구조

**단원당 2파일 구조**: `[topic].html` (OX 퀴즈) + `[topic]_study.html` (개념 정리)
영어교육론 레포와 동일 패턴.

### 현재 파일

| 단원 | OX/적용 퀴즈 | 개념정리 |
|------|------|---------|
| (허브) | — | `phonetics.html` (전체 인덱스) |
| 강세 | `stress.html` (개념 OX) / `stress_practice.html` / `stress_practice2.html` / `stress_exercises.html` | `stress_study.html` / `stress_concepts.html` |
| Aspiration | `aspiration_ox.html` / `aspiration_exercises.html` | (예정) |
| Assimilation | `assimilation_ox.html` / `assimilation_exercises.html` | (예정) |
| Flapping | `flapping_ox.html` / `flapping_exercises.html` | (예정) |
| Schwa | `schwa_ox.html` / `schwa_exercises.html` | (예정) |
| Nasalization | `nasalization_ox.html` | (예정) |
| Voice | `voice_ox.html` | (예정) |
| Deletion | `deletion_ox.html` | (예정) |
| Compound stress | `compound_ox.html` | (예정) |
| Suffix stress | `suffix_ox.html` | (예정) |
| Noun/Verb stress | `noun_verb_ox.html` / `noun_verb_exercises.html` | (예정) |
| Sentence stress | `sentence_ox.html` | (예정) |

| 공용 파일 | 역할 |
|----------|------|
| `index.html` | 전체 레포 랜딩 페이지 |
| `phonetics.html` | 음성음운론 허브 (단원별 카드 노출) |
| `sounds.js` | 효과음 (Web Audio API) |
| `score-popup.js` | 결과 팝업 + 최고기록 |

> **stress / 규칙도출 단원**: OX 외에 IPA 전사·rule 기술·파생어 체인 문항을 OX 퀴즈 페이지 하단에 추가 섹션으로 포함.
> 기존 `*_ox.html` / `*_exercises.html` 혼용 파일은 단원별 2파일 구조로 통합 대상.

---

## 참고 자료 (refs/ 폴더)

> **구조**: `refs/phonetics/` 서브폴더 (단원별 1순위 자료) + 영어학 general refs (전 영역 기출분석·종합 노트).

### General refs (전 영역 기출분석·종합)

| 파일 | 내용 |
|------|------|
| `refs/루이스기출 5판.md` | 루이스 기출분석 5판 (OCR) — 2002~2021 영어학 기출 해설·분류 (음운론 파트) |
| `refs/메가쌤 전공영어 기출분석.md` | 메가쌤 기출분석 |
| `refs/메가쌤_기출분석.md` | 메가쌤 기출분석 (별본) |
| `refs/영어학 짱은 나야!!!_가루미 복사본.md` | 합격자 영어학 종합 노트 |
| `refs/10.영어학 정리 156p.md` | 영어학 종합 정리 (156p) |
| `refs/23-22 영어학 기출분석 by 히또리.md` | 히또리 기출분석 (2022·2023) |
| `refs/윤도형2015.md` | 전공영어학 (윤도형, 2015) |

### 음성음운론 refs (`refs/phonetics/`)

**1순위 — 합격자 노트 + 기출 분석 (항상 먼저 참조)**

| 파일 | 내용 |
|------|------|
| `refs/phonetics/23. 음운론 기출 메타 분석(기출 확장, 기본 개념, 유의점 단원별).pd.md` | 음운론 기출 메타 분석 — 단원별 기출 확장·기본 개념·유의점 |
| `refs/phonetics/features_가루미.md` | 변별자질(distinctive features) 합격자 노트 |
| `refs/phonetics/Phonological Rules_가루미.md` | 음운규칙 합격자 노트 |
| `refs/phonetics/응완벽해질게_가루미.md` | 합격자 종합 노트 |
| `refs/phonetics/Phonology & Phonetics 헷갈리는 개념 ex..md` | 헷갈리는 개념 예제 정리 |
| `refs/phonetics/［문제］모든 STRESS 표시하시오 히또리.md` | 강세 드릴 문제 (히또리) |
| `refs/phonetics/［정답］모든 STRESS 표시하시오 히또리.md` | 강세 드릴 정답 (히또리) |

**2순위 — 합격자 단권화 + 정T 시리즈**

| 파일 | 내용 |
|------|------|
| `refs/phonetics/AEP 단권화(루이스합격자).md` | AEP 합격자 단권화 |
| `refs/phonetics/AEP 보충프린트_앤드류 강의.md` | AEP 보충프린트 |
| `refs/phonetics/7. 정T_AEP Chap.7 정리.md` | 정T AEP Chap.7 강세 정리 |

**3순위 — 원서 (개념 깊이 보충)**

| 파일 | 내용 | 참조 범위 |
|------|------|-----------|
| `refs/phonetics/aep.md` | Applied English Phonology (Yavaş) | 전체 |
| `refs/phonetics/ail.md` | An Introduction to Language 10판 | 음성·음운 파트 |
| `refs/phonetics/English_Phonetics_and_Phonology.md` | English Phonetics and Phonology (Roach) | 전체 |
| `refs/phonetics/introducing-phonetics-and-phonology-3nbsped-9781444109887-144410988x_compress.md` | Introducing Phonetics and Phonology 3판 | 전체 |

**4순위 — 기출 문항 DB (testmaster)**

> 경로: `~/Library/Mobile Documents/com~apple~CloudDocs/Developments/testmaster/data/`
> `linguistics_YYYY_*.json` (음운론 영역 — `linguistics_domain: phonology`) — `derivation.steps`, `answer.model_answer`, `source.references` 조회

---

## 개발 핵심 규칙

- 백엔드 없음 — 순수 클라이언트사이드
- CSS 변수 사용 금지, 클래스 스타일로 처리
- `sounds.js` + `score-popup.js` 반드시 포함, 퀴즈 JS보다 먼저 로드
- 새 단원 추가 시 `index.html` (랜딩) + `phonetics.html` (허브) 함께 업데이트
- **⚠️ "루이스" 글자 사용 금지** (블로그·UI 텍스트) — `5판`·`기출`·`해설` 등으로만 표기
- 기존 HTML 리팩터링 시 영어교육론 레포의 quiz/study 구조 참조

### 모바일 테이블 수평 스크롤 패턴

**문제**: 전역 `table { width:100% }` 가 `overflow-x:auto` 컨테이너 안에서도 테이블을 강제로 컨테이너 너비로 축소 → 수평 스크롤 안 됨, 우측 잘림

**파일별 해결책 (두 가지 패턴)**

#### 패턴 A — `_study.html` 스타일 (`.stage-wrap` 래퍼 이미 있음)
```css
/* stage-wrap 안의 table만 width 해제 */
.stage-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; }
.stage-wrap table { width:auto; }  /* 이 한 줄 추가 */
```

#### 패턴 B — `_concepts.html` 스타일 (래퍼 없음)
```css
/* 새 스크롤 래퍼 클래스 */
.table-scroll { overflow-x:auto; -webkit-overflow-scrolling:touch; margin:18px 0; }
/* 테이블에 min-width 설정 — 모바일에서 뷰포트 초과 → 스크롤 발생 */
.cmp-table { width:100%; min-width:480px; ... }
```
```html
<!-- 각 테이블을 래퍼로 감쌈 -->
<div class="table-scroll"><table class="cmp-table">...</table></div>
```

> **min-width 기준**: 컬럼 수 × 평균 컬럼 폭. 4~5컬럼 데이터 테이블은 480px 이상 권장.

### 🚨 CSS Grid 1fr 우측 잘림 패턴 (반복 실수 주의)

**문제**: `grid-template-columns: 1fr 1fr 1fr` 에서 `1fr` = `minmax(auto, 1fr)`. `auto` 최솟값은 `min-content`이므로 좁은 화면에서 JetBrains Mono 텍스트(예: "Unstressed", "Secondary")가 `min-content` 폭을 주장해 컬럼이 viewport 밖으로 밀림 → 페이지 우측 잘림.

**필수 수정**: 멀티컬럼 그리드 항상 `minmax(0, 1fr)` 사용
```css
/* ❌ 틀림 */
.compare.three { grid-template-columns: 1fr 1fr 1fr }
.grid.col3     { grid-template-columns: 1fr 1fr 1fr }

/* ✅ 올바름 */
.compare.three { grid-template-columns: repeat(3, minmax(0, 1fr)) }
.grid.col3     { grid-template-columns: repeat(3, minmax(0, 1fr)) }
```

**추가 보완**: 카드 내부 텍스트에 `word-break:break-word; overflow-wrap:break-word` 필수
```css
.compare-item { word-break: break-word; overflow-wrap: break-word }
```

**`white-space:pre` 패턴**: `.foot-tree`, 코드 블록 등에 `white-space:pre` 사용 시 부모에 `overflow-x:auto` 필수
```css
.foot-box { overflow-x: auto; -webkit-overflow-scrolling: touch }
```

**영향 파일 체크리스트** (새 파일 만들 때 확인):
- OX 퀴즈: `.compare.three` 그리드 → `repeat(3,minmax(0,1fr))`
- Study 노트: `.grid.col3` → `repeat(3,minmax(0,1fr))` + 미디어 쿼리 768px
- `white-space:pre` 요소 → 부모에 `overflow-x:auto`

---

## 방향 원칙

- **서브노트 접근**: 책 전체 정리 X → 기출 분류 분석에서 출발해 핵심만 압축
- **콘텐츠 우선순위**: 기출 분석 분류 구조 → 합격자 노트 → 원서 보충
- **원서 정리 서브노트 스타일**: sibling 레포 `transformational-grammar`와 동일 컨셉 (책 단위·영역 단위 분리, 한 영역 내에선 깊게)

---

## 🚨 기출 추정 절대 금지 (전 콘텐츠 공통)

블로그·사이트 콘텐츠·해설·OX 어디든 임용 **기출 관련 정보(연도·출제 의도·답안 패턴 등) 추정 금지**. 검증된 refs에서만 인용한다.

**검증 절차** (음운론):
1. **1차**: `refs/루이스기출 5판.md` 음운론 파트 — 연도-rule/IPA/단원 매핑
2. **2차**: `refs/phonetics/23. 음운론 기출 메타 분석...md`, `features_가루미.md`, `Phonological Rules_가루미.md` 등 합격자 노트
3. **3차**: `refs/메가쌤_기출분석.md`, `refs/23-22 영어학 기출분석 by 히또리.md` 보조
4. **2022년 이후**: 루이스 5판 범위 밖 → testmaster의 `refs/2025 전공 기출 김재균해설.md`, `refs/2026 기출 권두걸팀 해설서.md` 음운론 파트

**원칙**:
- **연도·기출 정보 표기는 OPTIONAL** — 블로그 작성 시 검증 부담스러우면 본문에 박지 않아도 됨. 개념 위주로 작성해도 무방
- **박는 경우에만** refs 검증 필수. 검증 매칭 0건이면 표기 **생략**. "그럴법한" 추정값 박지 말 것
- 추정 = 수험생에게 잘못된 정보 제공 = **치명적 오류**

---

## 블로그 글 작성

전역 블로그 지침 `~/Library/Mobile Documents/com~apple~CloudDocs/Developments/blog writings/blog write.md` 의 **"임용고시 (영어학·영교론)"** 섹션과 그 하위 **"📚 임용 블로그 글쓰기 규칙"** 을 따른다.

본 레포 유형: **A형 (음운론 서브노트)** — 블로그 작성 대상.

### 파일명 규칙 (현행 표준)

`blog/` 폴더에 단원당 4파일 구조로 작성:

| 파일 | 역할 | 분량 |
|------|------|------|
| `Ch01-[단원].md` | **개념정리 메인** — 4섹션 구조 (개념 정의 + 기출 맥락 + 키텀 비교 + 수험 팁) | 본문 위주 |
| `Ch01-[단원]-OX.md` | OX 풀이 해설 글 | 5,000~10,000자 |
| `Ch01-[단원]-Drill1.md` | 응용 드릴 1 풀이 해설 | 5,000~10,000자 |
| `Ch01-[단원]-Drill2.md` | 응용 드릴 2 풀이 해설 (필요 시) | 5,000~10,000자 |

> 단원별 OX·Drill 응용 페이지가 여러 개일 때 `-OX`, `-Drill1`, `-Drill2` … 로 분리.
> 응용이 적은 단원은 메인 1편 + OX 1편으로 충분.

### 핵심 규칙

- 블로그 글은 `.md` 파일로 작성
- **본문 = 서브노트 핵심 + 4섹션 보강** (① 개념 정의 [필수] + ②③④ 중 최소 2개)
  - ② 기출 맥락 / ③ 키텀 비교 / ④ 수험 활용 팁
  - **합격자 노트(`refs/phonetics/`)에 팁 있으면 ④ 무조건 포함**
- **한글 설명 시 용어는 영어 원문 그대로** (예: `place assimilation`을 "조음위치 동화"로 번역 X). 학자명·이론명·기술 용어는 모두 영어 유지
- **본문에 출처 인용 표기 불필요** (`— Roach Ch.5` 같은 표기 X)
- **키워드 하이라이트 필수** (5색): 이론명·rule·기술 용어 → 파랑 `#3182ce` / 학자명 → 보라 `#805ad5` / 함정·주의 → 빨강 `#c53030` / 정문·올바른 분석 → 청록 `#319795` / 현직쌤 팁 → 주황 `#dd6b20`
- **기출 연도 빨간색 인라인** (`#c53030`)
- 핵심 개념은 **영어 원문 한 문단 + 한글 설명 한 문단** 교차 (개념정리 페이지 수록 개념 + 알파)
- **SVG 사용 금지** (블로그 한정. 웹앱 페이지 SVG 다이어그램은 별개. 음운규칙 derivation은 마크다운 표·bracketed notation으로 표현)

### iframe / 링크 배치

- ✅ **메인 글 문두에 자신의 GitHub Pages iframe 필수** — `https://namkicheol.github.io/phonetics-phonology/[단원]_study.html` 형식으로 개념정리 페이지를 문서 맨 위 첫 줄에 반드시 삽입
- ✅ **OX·Drill 글 문두 iframe**: 해당 OX/응용 페이지 (`stress.html`, `stress_practice.html` 등) 임베드
- ❌ **외부(타인) 사이트 iframe 금지** — 자신의 레포 외 다른 출처 iframe 불가
- ✅ 메인 글 본문 끝에 OX·Drill 링크 버튼 추가 — `obangti.tistory.com/<post-id>` 형식
- ✅ OX·Drill 글 끝에 메인 개념정리 글로 돌아가기 링크 (사이클 형성)
- 링크 버튼 템플릿:
  ```html
  <p align="center">
  <a href="https://obangti.tistory.com/<post-id>" target="_blank" style="display:inline-block;padding:14px 28px;background:#3182ce;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:15px;">📝 [단원명] OX 풀러 가기 →</a>
  </p>
  ```

### 📝 OX·Drill 블로그 글 구조 (별도 발행 — 해설 중심 3섹션)

- ① 짧은 도입 (1-2줄)
- ② 본문 = **N문항 × 자세한 해설** (90%): 문항/답(✅❌)/영어 원문 인용 1-2문장/한글 풀이/⚠️ 함정/빨간 연도/5색 하이라이트
- ③ 메인 개념정리 글로 돌아가기 링크 버튼
- 음운론 특화: rule 적용 문항은 **단계별 derivation 시연** 해설에 포함 (Underlying → Step → Surface)
- IPA 전사 해설은 풍부하게
- 분량: 5,000~10,000자 (문항당 250-500자)
- 자세한 규칙은 `blog write.md` "📝 OX·실전·응용 블로그 글 구조" 참조

### 4섹션 보강 포인트 (음운론 특화)

- ① **개념 정의**: IPA 전사·rule 표기 예시를 **풍부하게**. 서브노트가 1~2개 예시면 블로그는 5~10개로 확장
- ② **기출 맥락**: `refs/루이스기출 5판.md` 음운론 파트 + `refs/phonetics/23. 음운론 기출 메타 분석...md` 우선 활용
- ④ **rule 단원은 단계별 derivation 시연 필수**: phonological rule(예: nasal place assimilation, flapping, vowel reduction 등)을 다룰 때 입력 → 단계별 적용 → 출력을 마크다운으로 시연. 예:
  ```
  Underlying:  /ɪn + p ə s ɪ b əl/
  Step 1 (place assim): /ɪmpəsɪbəl/
  Surface:     [ɪmpɑsəbl̩]
  ```

### 🖼 썸네일 이미지 생성

임용 블로그는 **썸네일만** 생성 (본문 이미지 없음). 저장 위치: `blog/thumbnails/`. 파일명은 글 파일명과 동일 (`Ch01-Stress.png`, `Ch01-Stress-OX.png` 등).

| 순위 | 방법 | 비고 |
|------|------|------|
| 1순위 | **Canva** (권장) | 텍스트·레이아웃 품질 최고. 사용자가 직접 제작 후 저장 |
| 2순위 | HuggingFace Flux | `~/scripts/gen_thumb.py --style phonetics` |
| 3순위 | Pollinations.ai | HF 실패 시 fallback — `~/.pollinations_token` |

**Canva style guide (phonetics)**:
- Background: dark + yellow/golden accent
- Elements: IPA symbols, articulation diagram, sound wave
- Text: English only (e.g. `Ch.1 Stress Rules`, `English Phonology`)
- Ratio: 16:9 (1280×720)


---

## 📋 기출 맥락 참조 (블로그·서브노트·OX 공통)

**`docs/기출맥락_2010_2026.md`** — 2010~2026 전 연도 기출 문항별 핵심 용어·맥락 인덱스 (testmaster에서 동기화).

| 작업 | 참조 방법 |
|------|----------|
| **블로그 글 작성** | 연도·문항 확인 → 해당 챕터 개념이 어느 해 어떤 맥락으로 출제됐는지 인용 |
| **서브노트 개념 정리** (`_study.html`) | 해당 챕터 용어의 출제 연도·문항 번호를 "기출 이력" 란에 표기 |
| **OX 문제 작성** | 기출 맥락 근거로 실제 출제 각도·선지 함정 설정; 해설에 연도 인용 |

---

## 🤖 신규 페이지 작성 시 Codex 보조 작업 규칙

`_study.html` 또는 OX 파일을 **신규 작성하거나 대폭 수정**할 때 아래 검증 작업을 반드시 함께 수행한다.

Codex 실행 원칙:
- 사용자가 명시적으로 "백그라운드 에이전트", "subagent", "병렬 에이전트"를 요청한 경우에만 Codex subagent를 띄운다.
- 사용자가 요청하지 않은 경우에는 메인 Codex가 같은 검증을 직접 수행한다.
- 보조 에이전트를 쓰더라도 `git add` / commit / push는 사용자가 별도 요청했을 때만 수행한다.
- 기출 이력과 기출 각도는 `docs/기출맥락_2010_2026.md`에서 확인된 항목만 반영한다. 매칭 0건이면 생략한다.

### 트리거 조건

| 트리거 | 필수 보조 검증 |
|--------|-------------|
| 새 `_study.html` 챕터 작성·수정 | **기출이력 추가 검증** |
| 새 OX 파일(`*_ox.html`) 작성·문항 추가 | **OX 기출각도 보강 검증** |

### 보조 검증 작업 명세

**기출이력 추가 검증**이 해야 할 일:
1. `docs/기출맥락_2010_2026.md` 읽기
2. 해당 `_study.html`의 각 `.concept` div에서 핵심 용어 추출
3. 기출맥락에서 해당 용어 검색 → 출제 연도·문항·맥락 확인
4. 각 concept 끝에 `.exam` 블록 추가:
   ```html
   <div class="exam">
     <div class="exam-label">📋 기출 이력</div>
     <p><strong>20XX 1차 QX</strong> — [맥락 설명]</p>
   </div>
   ```
5. 기출맥락에 없는 개념 → 건너뜀 (추정 금지)
6. 변경 후 해당 파일만 diff로 검토

**OX 기출각도 보강 검증**이 해야 할 일:
1. `docs/기출맥락_2010_2026.md`에서 해당 챕터 개념의 실제 출제 각도 확인
2. 기출에서 확인된 각도로 OX 문항 1~2개 추가 (파일당):
   ```js
   {src:"...", cat:"기출 — 20XX 1차", text:"...", ans:true/false,
    correct:"...", why:"... (20XX 1차 QX 출제 각도)", source:"기출맥락_2010_2026.md", compare:[...]}
   ```
3. `TOTAL` 변수 및 `/N문제` 표시 업데이트
4. 변경 후 해당 파일만 diff로 검토

### Codex subagent 호출 예시

사용자가 명시적으로 병렬 에이전트를 요청한 경우에만:
```
3 background agents launched (↓ to manage)
├ [챕터명] _study.html 기출이력 추가
├ [챕터명] OX 기출각도 보강
```

## 블로그 작성 규칙

- 블로그 글은 `blog/` 아래에 작성하고, 첫 줄에 해당 GitHub Pages 앱 iframe을 넣는다.
- 개념정리 글과 OX 해설 글을 구분한다. 파일명은 기존 `ChNN-Topic.md`, `ChNN-Topic-OX.md` 패턴을 우선 따른다.
- 블로그 본문에서도 한글 설명은 유지하되, 학술 키워드와 개념 용어는 영어 원어를 기본으로 쓴다. `docs/한글용어.md` 또는 refs에 없는 한국어 번역 조어를 만들지 않는다.
- 기출 연도, 출제 의도, 답안 패턴은 `docs/기출맥락_2010_2026.md`, refs, 또는 해당 study page에 이미 확인된 경우에만 표기한다. 확인되지 않으면 생략한다.
- 썸네일은 `blog/thumbnails/`에 저장한다. 로컬 도형 합성으로 급조하지 말고, 사용자가 요구한 경우 ChatGPT/image model 또는 Canva급 결과물을 기준으로 만든다.
- 썸네일 파일은 16:9 비율, 기본 `1280x720` PNG를 우선 사용한다. 개념정리와 OX 썸네일은 한눈에 구분되게 한다.
- 작업 완료 전 블로그 파일 대상으로 금지/주의 용어 검색, iframe URL 확인, `git diff --check`를 실행한다.
- 커밋할 때는 이번 블로그 작업 파일과 썸네일만 선별 stage한다. 기존 dirty/untracked 자료는 명시 요청 없이는 포함하지 않는다.
