# 학습자료 수정 검토 — 2026-10-16

## 범위

이번 변경은 학습자료의 확인된 설명·예시·표기·기출 연결을 정정하고, 학습 허브의 탐색 구조를 간결하게 만드는 초안이다. 모든 학습자료에 오류가 없음을 인증하는 검토가 아니다. 운영 배포는 별도 검토 대상이다.

- Aspiration: strong/weak 분포 구분. AEP 2판 pp.58–59의 비강세 음절, syllabic consonant 앞, release되는 말끝 stop의 weak aspiration 가능성을 반영한다.
- 2022 A06: 해당 시험의 이분법과 제시 자료를 유지한다. 일반 설명을 근거로 원문 판단 기준이나 정답을 뒤집지 않는다.
- Assimilation: 과정 명칭과 방향을 구분하고, 2019 A04 해설의 앞/뒤 모음 관계를 명확히 한다.
- Flapping: 흔한 환경을 유일한 필요조건으로 서술하지 않는다. Latter–ladder 비교와 neutralization 설명을 맞춘다. AEP의 word-boundary 예외를 구분한다.
- Deletion: function-word initial /h/ rule의 범위를 명시한다.
- Nasalization/epenthesis: same-syllable 조건, 후행 nasal, 삽입되는 모음과 suffix 전체를 구분한다.
- Stress: committee/geometrical/nationality/photographic의 marker, compound 품사 유형, NSR 예시를 교정한다. Photographic의 AEP 숫자표는 원서의 reduced-vowel transcription과 함께 제시한다.
- Sentence stress: 행위/방식, given information의 대조 초점 예외, 비교 예시의 표기를 맞춘다.
- 14개 단원의 허브에서 개념정리와 OX를 테두리 버튼으로 표시한다. 원래의 학습 링크는 모두 유지하고 추가 연습은 펼치기 영역에 둔다.
- 검증된 aspiration SVG를 별도 파일로 삽입해 다른 HTML의 CSS와 충돌하지 않게 한다. 크게 보기 링크와 본문 캡션을 제공한다.

## 기출 이력의 근거 수준

- 원본 시험지 이미지 확인: 2010 Q32는 통사론 문항이므로 해당 이력 제거. 2014 A 기입형 2번은 듣기 관련 문항이므로 제거. 2020 A3은 formality이므로 제거. 2023 B4는 제1차 전공B의 -al/stress/foot 문항으로 단계와 맥락을 교정.
- 저장소의 실제 passage 확인: 대체 연결인 2010 Q33은 syllable weight와 stress-shifting suffix를 다룬다. 이 대체 문항의 원본 이미지까지 확인했다고 주장하지 않는다.
- 2017의 옛 유형별 번호와 현재 번호 대응이 확인되지 않은 stress 이력은 제거하고 임의의 대체 번호를 만들지 않았다.
- 기존 `기출맥락_2010_2026.md`에는 이번 검토에서 실제 원문과 다른 연결이 발견됐다. 이 문서의 나머지 행을 원본 검증 완료 자료로 간주해서는 안 된다.

## 검증

- 전체 20개 퀴즈, 368문항의 개수와 기존 `ans`/`a` 배열을 변경 전 HEAD와 대조해 보존 확인.
- `node scripts/test_quiz_order.js`: 랜덤화, 정확한 재개, 구버전 저장 상태, 초기화, 점수 팝업, storage failure, 문항 수/로드 순서 통과.
- `node scripts/test_quiz_study_figures.js`: 4개 기존 도식 연결과 anchor, 안전한 정적 마크업 통과.
- `node scripts/test_material_corrections.js`: 수정 회귀 사례, 허브의 모든 내부 링크, focus/touch CSS, inline JavaScript 문법 통과.
- 변경된 개념 페이지의 기존 anchor ID를 보존한다. 새 챕터나 concept anchor는 만들지 않는다.
- SVG는 이전 단계에서 XML 및 320/360/560px raster 검증을 마쳤다. 이번 통합에서 링크와 파일 존재를 확인한다.
- 실제 브라우저 통합/모바일 QA는 완료하지 못했다. WebKit 실행 파일이 없고, Chromium은 환경의 socket 제한으로 시작하지 못했다. 권한 확장 실행도 환경 시작 오류로 실패했다. CSS의 44px 최소 높이·반응형 배치·focus 표시를 실제 기기에서 다시 확인해야 한다.

## 남은 검토

모든 OX의 세부 IPA·방언·optional rule·출처 귀속을 개별적으로 완결 검증한 것은 아니다. 이번에 고치지 않은 조건부/출처 보류 항목, 모든 기출 이력의 원본 이미지 대조, 전체 페이지의 한국어/타이포그래피와 실제 모바일 렌더 검증이 남아 있다. Fry 원논문을 직접 확인한 것으로 처리하지 않고 AEP의 2차 인용으로 표시했다. 정답 키 보존은 의미 정확성의 보증이 아니므로 문장·해설·비교 필드를 함께 재검토했다.
