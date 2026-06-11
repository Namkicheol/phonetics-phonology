<iframe src="https://namkicheol.github.io/phonetics-phonology/aspiration_study.html" width="100%" height="1000px" style="border: none; border-radius: 10px;"></iframe>

# 임용 음운론 Ch.2 Aspiration 완전 정리: VOT·foot-initial·/s/ cluster·allophone

음운론 phonological rules 단원에서 **Aspiration(기식)** 은 가장 기본이면서도 환경 판별에서 실수가 잦은 규칙이다. <span style="color:#3182ce;">**voiceless stop aspiration**</span> 의 적용 환경부터 <span style="color:#3182ce;">**VOT**</span> 3원 구분, <span style="color:#c53030;">**/s/ cluster 억제**</span>, 그리고 영어 allophone vs 한국어 phoneme의 음소 지위 차이까지 — 이 글은 서브노트 핵심 규칙을 **① 개념 정의** → **② 기출 맥락** → **③ 키텀 비교** → **④ 수험 팁** 4섹션으로 풀어낸다.

---

## ① 개념 정의 — 핵심 규칙을 영어 원문과 함께

### 1) Aspiration — rule과 동기

> A voiceless noncontinuant has **[+aspirated]** added to its feature matrix at the beginning of a syllable when followed by a **stressed vowel** (with an optional intervening consonant).

<span style="color:#3182ce;">**Aspiration**</span> 은 무성 폐쇄음 /p, t, k/ 가 조음 개방(release) 직후 짧은 기식을 동반해 <span style="color:#3182ce;">**[pʰ, tʰ, kʰ]**</span> 로 실현되는 현상이다. 적용 조건은 두 가지가 동시에 충족될 때다 — **① 음절 onset 자리 + ② 강세모음 앞**.

규칙 표기로 정리하면:

```
/p, t, k/ → [pʰ, tʰ, kʰ] / σ[ ___ (C) V́
            (음절초 + 선택적 개재 자음 + 강세모음 앞)
```

핵심은 "with an optional intervening consonant" — onset과 강세모음 사이에 자음이 끼어도 적용된다. <span style="color:#319795;">**creep [kʰrip]**</span> 에서 /k/ 와 강세모음 /i/ 사이에 /r/ 이 있어도 /k/ 는 기식음화된다.

| 단어 | 전사 | 환경 |
|------|------|------|
| pit | [pʰɪt] | 어두 onset + 강세모음 앞 |
| pill | [pʰɪl] | 어두 onset + 강세모음 앞 |
| repeat | [rɪpʰit] | 강세 음절 [pʰit] onset |
| apart | [əpʰaɹt] | 강세 음절 [pʰaɹt] onset |
| creep | [kʰrip] | onset + 개재 /r/ + 강세모음 |
| clip | [kʰlɪp] | onset + 개재 /l/ + 강세모음 |

Aspiration은 음소 대립을 만들지 않고 환경에서 예측되는 <span style="color:#3182ce;">**nondistinctive feature**</span> 를 더하는 규칙이라는 점이 본질이다.

---

### 2) VOT — 폐쇄음 3원 구분

> **VOT (Voice Onset Time)** is the interval between the release of a stop and the onset of voicing. A lag greater than ~30 ms gives an **aspirated** stop; a near-zero (short) lag gives a **voiceless unaspirated** stop; voicing during the closure gives a **voiced** stop.

<span style="color:#3182ce;">**VOT**</span> 는 폐쇄음의 개방 시점과 뒤따르는 성대 진동 시작 시점 사이의 시간 간격이다. 이 lag으로 폐쇄음 세 유형이 갈린다.

| 유형 | VOT | 설명 | 예 |
|------|-----|------|-----|
| **Voiced** | voice lead (음수) | 폐쇄 구간 내내 성대 진동 | Romance /b, d, ɡ/ |
| **Voiceless unaspirated** | ≈ 0 (short lag) | 개방과 거의 동시에 voicing | /s/ 뒤 영어 stop |
| **Voiceless aspirated** | > 30 ms (long lag) | 개방 후 기식 뒤 voicing | 영어 어두 강세 /p, t, k/ |

기식 정도는 언어마다 다르다 — 영어는 약하게 기식되는 편이고, Mandarin·Thai·Scots Gaelic 등은 강하게 기식된다. 표기상 <span style="color:#3182ce;">**aspiration diacritic**</span> 은 상첨자 **[ʰ]** 이며 기식음화된 자음 **뒤**에 붙인다([pʰ], [tʰ], [kʰ]). 자음 앞([ʰp])에 두면 오류다.

---

### 3) 적용 환경 — word-initial을 넘어 foot-initial로

Aspiration은 단어 첫소리에만 국한되지 않는다. <span style="color:#3182ce;">**강세 음절의 onset**</span> 이면 단어 내부에서도 일어난다.

- apart [əˈpʰaɹt] — /p/ 가 강세 음절 onset
- attack [əˈtʰæk] — /t/ 가 강세 음절 onset
- occur [əˈkʰɝ] — /k/ 가 강세 음절 onset

이 "강세 음절 onset"을 운율 단위로 바꿔 말하면 <span style="color:#3182ce;">**foot-initial position**</span> 이다. <span style="color:#3182ce;">**trochaic foot**</span>(강−약)의 첫 음절 onset에서 무성 폐쇄음이 기식음화된다. 이 연결이 2022학년도 시험에 직접 출제됐다(③ 기출 맥락 참조).

---

### 4) /s/ cluster — Aspiration 억제

> When a voiceless stop is preceded by **/s/** in the same onset cluster, aspiration is **blocked**: the stop surfaces as unaspirated [p, t, k].

강세모음 앞 음절초라도 무성 폐쇄음이 <span style="color:#c53030;">**/s/ 뒤**</span> 에 오면 aspiration이 억제되어 unaspirated로 실현된다. 이것이 minimal pair처럼 보이는 짝의 정체다.

| aspirated | unaspirated (/s/ 뒤) |
|---|---|
| pin [pʰɪn] | spin [spɪn] |
| top [tʰɑp] | stop [stɑp] |
| cool [kʰul] | school [skul] |

spy / sty / sky 도 같은 원리로 모두 unaspirated. 입 앞에 종이를 대고 발음하면 pin에서는 종이가 흔들리지만 spin에서는 거의 움직이지 않는다 — 이 차이가 기식의 유무다.

---

## ② 기출 맥락

<span style="color:#c53030;">**2022 A-6**</span> — <span style="color:#3182ce;">**voiceless stop aspiration**</span> 이 <span style="color:#3182ce;">**foot-initial position**</span> 에서 일어남을 분석하는 문항. 핵심 음운 규칙은 강세 음절 onset = foot-initial = aspiration 환경이라는 연결이다.

- **disentangle** [ˌdɪsənˈtʰæŋɡəl] — /t/ 가 강세 음절 [tæŋ]의 onset, 즉 foot-initial이라 <span style="color:#319795;">**[tʰ]**</span> 로 기식음화.
- **accountability** [əˌkaʊntəˈbɪlɪti] — /k/ 가 강세 음절 [kaʊn]의 onset(foot-initial)이라 <span style="color:#319795;">**[kʰ]**</span> 로 기식음화.

단순히 "어두 /p, t, k/"가 아니라 **강세(foot) 구조로 환경을 판별**해야 한다는 점이 이 문항의 출제 의도였다.

---

## ③ 키텀 비교

### Aspirated vs Unaspirated

| | Aspirated [pʰ, tʰ, kʰ] | Unaspirated [p, t, k] |
|---|---|---|
| **VOT** | long lag (> 30 ms) | short lag (≈ 0) |
| **환경** | 강세 음절 onset (foot-initial) | /s/ 뒤 · coda · 비강세 |
| **예** | pin, top, cool, apart | spin, stop, school |

### 영어 allophone vs 한국어 phoneme

| | 영어 | 한국어 |
|---|---|---|
| **[pʰ] / [p] 관계** | 같은 음소 /p/의 allophone | 별개 음소 /ㅍ/ vs /ㅂ/ |
| **분포** | complementary distribution | 동일 환경에서 대립 |
| **의미 구별** | 못 함 (allophonic) | 함 (phonemic) |
| **예** | pin [pʰɪn] / spin [spɪn] | 풀 [pʰul] / 불 [pul] / 뿔 [p'ul] |

<span style="color:#c53030;">**핵심**</span>: 같은 [pʰ]/[p] 차이가 영어에서는 allophonic, 한국어에서는 phonemic이다. 음소 지위는 음 자체가 아니라 **그 언어의 분포·대립**으로 결정된다. 영어에서 [pʰ]와 [p]는 환경으로 예측되므로 complementary distribution을 이루는 같은 /p/의 변이음이다.

### Onset vs Coda

| | Onset (강세 음절) | Coda (음절말) |
|---|---|---|
| 기식 | [pʰ, tʰ, kʰ] | 비기식 / 불파 |
| 예 | top의 어두 /t/ → [tʰ] | top의 /p/ → [p̚] |

---

## ④ 수험 팁

### 답안 작성 패턴 — Aspiration 분석

임용 Aspiration 문항 표준 답안 패턴:

> *"In [word], /X/ is aspirated because it occupies the **onset of a stressed syllable** (foot-initial position), where English voiceless stops surface as [Xʰ]. The aspiration rule adds [+aspirated] to a voiceless stop at the beginning of a syllable before a stressed vowel."*

/s/ cluster 답안 패턴:

> *"In [spin / stop / school], /X/ is **not** aspirated because it is preceded by /s/ in the onset cluster. After /s/, aspiration is blocked and the stop surfaces as unaspirated [X]."*

### 함정 정리

<span style="color:#c53030;">**⚠️ /s/ 뒤는 unaspirated**</span>: "강세모음 앞이면 무조건 기식"이 아니다. spin·stop·school의 /p, t, k/ 는 /s/ 뒤라 기식되지 않는다.

<span style="color:#c53030;">**⚠️ coda는 onset이 아니다**</span>: 음절말 /p, t, k/(top의 /p/)는 기식되지 않는다. aspiration은 onset 전용 규칙이다.

<span style="color:#c53030;">**⚠️ 음소 지위는 언어별**</span>: 영어 [pʰ]/[p] = allophone, 한국어 /ㅍ//ㅂ/ = phoneme. "기식음은 별개 음소"라고 일반화하면 영어에서 오답.

<span style="color:#c53030;">**⚠️ 비강세 onset은 약기식**</span>: 강세 음절 onset(foot-initial)이라야 강한 기식이다. polite [pəˈlaɪt]의 어두 /p/ 처럼 비강세 음절 onset은 약기식. 강세(foot) 구조로 판별해야 한다.

### 복습 포인트

<span style="color:#dd6b20;">**현직쌤 팁**</span>: Aspiration 문항은 결국 **세 환경 판별**로 압축된다 — ① 강세 음절 onset(foot-initial)인가(→ aspirated), ② /s/ 뒤인가(→ unaspirated), ③ coda·비강세인가(→ 비기식/약기식). 단어를 보면 강세 위치부터 찍고, /s/ cluster 여부를 확인한 뒤 onset/coda를 가른다. 음소 지위를 묻는 문항이면 영어 complementary distribution vs 한국어 minimal pair 대조를 반드시 함께 적는다.

---

<p align="center">
<a href="https://namkicheol.github.io/phonetics-phonology/aspiration_ox.html" target="_blank" style="display:inline-block;padding:14px 28px;background:#1a5276;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:15px;">🌬️ Aspiration OX 퀴즈 풀러 가기 →</a>
</p>

---

**태그**: 임용고시, 중등영어, 전공영어, 영어학, 음운론, phonology, Aspiration, aspirated stop, unaspirated, VOT, voice onset time, foot-initial, trochaic foot, complementary distribution, allophone, phoneme, s cluster, 서브노트, 기출분석
