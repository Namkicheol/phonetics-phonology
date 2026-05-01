# 임용 영어학 통합 서브노트 마스터

임용고시 대비 **영어학 통합 서브노트** OX 퀴즈 + 개념 정리 웹 애플리케이션.
순수 HTML/CSS/JS (백엔드 없음). **서브노트 개념** — 책 통째 정리가 아니라 기출 분류 구조 중심.

> **레포 정의**: 음성학·음운론 + 형태론·통사론 개요 + 의미론 + 화용론 + school grammar 통합.
> 폐기된 `phonetics-phonology` 레포의 음운론 콘텐츠를 흡수하면서, 영어학 전 영역으로 확장.
> 변형생성문법(통사론 심화)은 별도 `transformational-grammar` 레포에서 다룸 — 본 레포는 **개요 수준**.

---

## 한글 용어 규칙 (필수)

`_study.html` / `_concepts.html` 본문 / OX 퀴즈 `why` / 카드 본문 등 **한글이 등장하는 모든 본문**에서 학술 키워드는 영어 원어로 통일한다(예: `달성 동사` → `achievement verb`, `굴절 접사` → `inflectional morpheme`, `구정보` → `given information`). 한글 설명 블록 자체는 유지. 음운론 distinctive feature·통사 원리·의미상 분류명·담화 정보구조 용어는 모두 영어 원어 표준.

> 상세 도메인별 매핑표(음운/형태/통사/의미/화용)·예시·위반 트리거는 **`docs/한글용어.md`** 참조. 정책 원본은 전역 `~/.claude/CLAUDE.md` "임용 관련 작업: 한국어 용어 규칙" 및 testmaster `docs/한글용어.md`.

---

## 🔗 testmaster 연동 — concept_link 자동 적용 (필수)

이 레포의 `_study.html` / `*_concepts.html` 챕터를 만들거나 변경하면, testmaster의 기출 데이터가 자동으로 그 챕터를 "💎 합격자 노트에서 더 자세히" 링크로 가리키도록 매핑표를 갱신해야 한다.

**이 레포명 (concept_anchors.json key): `linguistics`**

### 새 챕터 만들 때 절차

1. 해당 HTML 안 각 섹션에 `id="..."` anchor 부여 (의미 있는 영문 slug 권장: `aspiration`, `theta-criterion`, `entailment` 등)
2. testmaster의 `data/concept_anchors.json` 갱신 — 해당 챕터의 anchor·title·terms 추가:
   ```json
   "linguistics": {
     "phonetics.html": [
       { "anchor": "aspiration", "title": "Aspiration",
         "terms": ["aspiration", "aspirated", "VOT"] }
     ]
   }
   ```
3. testmaster에서 자동 적용 + 검증 실행:
   ```bash
   cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Developments/testmaster
   python3 scripts/wire_concept_links.py
   ```
4. 출력에서 `깨진링크: 0건` 확인. 깨졌으면 anchor 이름 수정.

### 트리거 (Claude 자동 실행)

다음 상황에서 별도 지시 없이 위 절차를 실행한다:
- 새 `_study.html` / `*_concepts.html` 챕터 생성/완성 직후
- 기존 챕터에 섹션 추가/제거/anchor 변경 시
- 사용자가 "기출 연동", "concept_link", "testmaster 적용", "wire" 등 언급 시

### testmaster 위치 (2026-04 iCloud 이전 완료)

`~/Library/Mobile Documents/com~apple~CloudDocs/Developments/testmaster/`
규칙 원본: 위 디렉토리의 `CLAUDE.md` "concept_link 자동 적용" 섹션
GitHub: `https://github.com/Namkicheol/testmaster`

---

## 챕터 구조 (5+1 영역)

| CH | 영역 | 상태 | 주요 단원 |
|----|------|------|----------|
| **CH01** | Phonetics & Phonology | ✅ 완료 (phonetics-phonology 레포에서 흡수) | features, allophone, syllable, phonological rules, stress |
| CH02 | Morphology | ⏳ 예정 | morpheme, derivation, inflection, compound, word formation |
| CH03 | Syntax (개요) | ⏳ 예정 | phrase structure, X-bar 개요, 주요 구조 — 심화는 `transformational-grammar` 레포 |
| CH04 | Semantics | ⏳ 예정 | sense relations, entailment, presupposition, thematic roles, lexical semantics |
| CH05 | Pragmatics | ⏳ 예정 | speech acts, implicature (Grice), deixis, politeness |
| CH06 | School Grammar | ⏳ 예정 | 학교문법(8품사·문장5형식·시제·서법) — 임용 출제 포인트 중심 |

> **CH01 허브**: `phonetics.html` (인덱스 역할). 하위 단원 페이지(`features_*`, `stress_*`, `aspiration_*` 등)에서 모이는 구조.
> `index.html`은 전체 레포 랜딩 — CH별 카드 노출.

---

## 파일 구조

**단원당 2파일 구조**: `[topic].html` (OX 퀴즈) + `[topic]_study.html` (개념 정리)
영어교육론 레포와 동일 패턴.

### CH01 Phonetics·Phonology 현재 파일

| 단원 | OX/적용 퀴즈 | 개념정리 |
|------|------|---------|
| (허브) | — | `phonetics.html` (CH01 인덱스) |
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

### CH02~CH06 예정 파일명 규칙

| CH | 예정 파일 |
|----|-----------|
| CH02 Morphology | `morphology.html` / `morphology_study.html` (필요 시 단원 분할) |
| CH03 Syntax | `syntax.html` / `syntax_study.html` |
| CH04 Semantics | `semantics.html` / `semantics_study.html` |
| CH05 Pragmatics | `pragmatics.html` / `pragmatics_study.html` |
| CH06 School Grammar | `school_grammar.html` / `school_grammar_study.html` |

| 공용 파일 | 역할 |
|----------|------|
| `sounds.js` | 효과음 (Web Audio API) |
| `score-popup.js` | 결과 팝업 + 최고기록 |
| `index.html` | 전체 레포 랜딩 — CH별 카드 |

---

## 참고 자료 (refs/ 폴더)

> **구조**: `refs/phonetics/` 서브폴더 (CH01 전용) + 영어학 general refs (CH 전반).
> CH02~CH06 추가 시 `refs/morphology/`, `refs/semantics/` 등 서브폴더 확장 가능.

### General refs (CH 전반)

| 파일 | 내용 |
|------|------|
| `refs/루이스기출 5판.md` | 루이스 기출분석 5판 (OCR) — 2002~2021 영어학 기출 해설·분류 (전 영역) |
| `refs/메가쌤 전공영어 기출분석.md` | 메가쌤 기출분석 |
| `refs/메가쌤_기출분석.md` | 메가쌤 기출분석 (별본) |
| `refs/영어학 짱은 나야!!!_가루미 복사본.md` | 합격자 영어학 종합 노트 |
| `refs/10.영어학 정리 156p.md` | 영어학 종합 정리 (156p) — 전범위 |
| `refs/23-22 영어학 기출분석 by 히또리.md` | 히또리 기출분석 (2022·2023) |
| `refs/윤도형2015.md` | 전공영어학 (윤도형, 2015) — 전 영역 |

### CH01 Phonetics·Phonology refs (`refs/phonetics/`)

**1순위 — 합격자 노트 + 기출 분석**

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

### 4순위 — 기출 문항 DB (testmaster)

> 경로: `~/Library/Mobile Documents/com~apple~CloudDocs/Developments/testmaster/data/`
> `linguistics_YYYY_*.json` — `derivation.steps`, `answer.model_answer`, `source.references` 조회

---

## 개발 핵심 규칙

- 백엔드 없음 — 순수 클라이언트사이드
- CSS 변수 사용 금지, 클래스 스타일로 처리
- `sounds.js` + `score-popup.js` 반드시 포함, 퀴즈 JS보다 먼저 로드
- 새 단원 추가 시 `index.html` (랜딩) + `phonetics.html` (CH01 허브) 함께 업데이트
- **⚠️ "루이스" 글자 사용 금지** (블로그·UI 텍스트) — `5판`·`기출`·`해설` 등으로만 표기
- 기존 phonetics-phonology 레포 콘텐츠가 그대로 흡수됨 — 추가 리팩터링 시 영어교육론 레포의 quiz/study 구조 참조

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

---

## 방향 원칙

- **서브노트 접근**: 책 전체 정리 X → 기출 분류 분석에서 출발해 핵심만 압축
- **콘텐츠 우선순위**: 기출 분석 분류 구조 → 합격자 노트 → 원서 보충
- **영역 간 균형**: CH01 Phonetics·Phonology가 가장 두꺼움 (기출 빈도 高). CH02~CH06은 서브노트 수준 압축
- **통사론 분담**: CH03 Syntax는 개요 수준만. 변형생성문법 심화는 `transformational-grammar` 레포

---

## 🚨 기출 추정 절대 금지 (전 콘텐츠 공통)

블로그·사이트 콘텐츠·해설·OX 어디든 임용 **기출 관련 정보(연도·출제 의도·답안 패턴 등) 추정 금지**. 검증된 refs에서만 인용한다.

**검증 절차** (영어학):
1. **1차**: `refs/루이스기출 5판.md` — 연도-rule/단원 매핑 (전 영역)
2. **2차**: 영역별 합격자 노트 — CH01은 `refs/phonetics/23. 음운론 기출 메타 분석...md`, `features_가루미.md`, `Phonological Rules_가루미.md` 등
3. **3차**: `refs/메가쌤 전공영어 기출분석.md`, `refs/23-22 영어학 기출분석 by 히또리.md` 보조
4. **2022년 이후**: 루이스 5판 범위 밖 → testmaster의 `refs/2025 전공 기출 김재균해설.md`, `refs/2026 기출 권두걸팀 해설서.md` 영역별 파트

**원칙**:
- **연도·기출 정보 표기는 OPTIONAL** — 블로그 작성 시 검증 부담스러우면 본문에 박지 않아도 됨. 개념 위주로 작성해도 무방
- **박는 경우에만** refs 검증 필수. 검증 매칭 0건이면 표기 **생략**. "그럴법한" 추정값 박지 말 것
- 추정 = 수험생에게 잘못된 정보 제공 = **치명적 오류**

---

## 블로그 글 작성

전역 블로그 지침 `~/Library/Mobile Documents/com~apple~CloudDocs/Developments/blog writings/blog write.md` 의 **"임용고시 (영어학·영교론)"** 섹션과 그 하위 **"📚 임용 블로그 글쓰기 규칙"** 을 따른다.

본 레포 유형: **A형 (영어학 통합 서브노트)** — 블로그 작성 대상.

핵심:
- 블로그 글은 `.md` 파일로 작성
- **본문 = 서브노트 핵심 + 4섹션 보강** (① 개념 정의 [필수] + ②③④ 중 최소 2개)
  - ② 기출 맥락 / ③ 키텀 비교 / ④ 수험 활용 팁
  - **합격자 노트(`refs/`)에 팁 있으면 ④ 무조건 포함**
- **한글 설명 시 용어는 영어 원문 그대로** (예: `place assimilation`을 "조음위치 동화"로 번역 X, `entailment`를 "함의"로 번역 X). 학자명·이론명·기술 용어는 모두 영어 유지
- **본문에 출처 인용 표기 불필요** (`— Yavaş Ch.5` 같은 표기 X)
- **키워드 하이라이트 필수** (5색): 이론명·rule·기술 용어 → 파랑 `#3182ce` / 학자명 → 보라 `#805ad5` / 함정·주의 → 빨강 `#c53030` / 정문·올바른 분석 → 청록 `#319795` / 현직쌤 팁 → 주황 `#dd6b20`
- **기출 연도 빨간색 인라인** (`#c53030`)
- 핵심 개념은 **영어 원문 한 문단 + 한글 설명 한 문단** 교차
- **신규 글 썸네일은 Pencil MCP** (`blog-image-pencil` 스킬)로 생성. 기존 글은 그대로 유지
- **SVG 사용 금지** (블로그 한정. 웹앱 페이지 SVG 다이어그램은 별개. CH01 음운규칙 derivation, CH03 partial tree는 마크다운 표·bracketed notation으로 표현)

### 영어학 통합 블로그 고유 규칙

**사이트 구조 → 블로그 매핑**
- 사이트는 단원당: `*_study.html` (개념정리) + `*.html` (OX) + 응용 페이지(stress 등)
- **블로그 글 단위 옵션**:
  - **단원당 1편 통합** (기본)
  - **개념편 + 응용 풀이편 분리** (CH01 stress·rule 도출처럼 응용이 많을 때)

**iframe / 링크 배치 — iframe 미사용 원칙**
- ❌ 개념정리(`*_study.html`) iframe 임베드 금지
- ❌ OX·응용 iframe 임베드 금지 (이미 별도 obangti.tistory.com 글로 발행됨)
- ✅ 본문 끝에 OX·응용 링크 버튼만 추가 — `obangti.tistory.com/<post-id>` 형식

**📝 OX·응용 블로그 글 구조** (별도 발행 — 해설 중심 3섹션)
- ① 짧은 도입 (1-2줄)
- ② 본문 = N문항 × 자세한 해설 (90%): 문항/답(✅❌)/영어 원문 인용 1-2문장/한글 풀이/⚠️ 함정/빨간 연도/5색 하이라이트
- ③ 개념정리 글로 돌아가기 링크 버튼 (사이클 형성)
- 분량: 5,000~10,000자 (문항당 250-500자)

**4섹션 보강 포인트 (영역별)**
- **CH01 Phonetics·Phonology**: rule 단원은 단계별 derivation 시연 필수 (Underlying → Step → Surface). IPA 전사 풍부하게. `refs/phonetics/` 1순위 합격자 노트 적극 인용
- **CH02 Morphology**: morpheme 분석 트리·word formation 단계 시연. 파생/굴절 구분
- **CH03 Syntax (개요)**: 심화 분석은 `transformational-grammar` 레포로 링크. 본 레포는 phrase structure·기본 X-bar 개요만
- **CH04 Semantics**: sense relations(synonymy·antonymy 등)·entailment·presupposition 차이 강조. thematic roles 표
- **CH05 Pragmatics**: speech acts (Searle)·implicature (Grice's maxims) 분류·deixis 유형
- **CH06 School Grammar**: 임용 출제 포인트 중심 (8품사·5형식·시제 일치·서법). 학교문법 vs 생성문법 관점 차이 주의
