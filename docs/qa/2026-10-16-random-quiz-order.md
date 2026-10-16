# 퀴즈 랜덤 출제 — 20페이지

상태: **제품 코드 freeze, 독립 검수 및 최신 브라우저 최종 재실행 중**. commit/push/deploy 실행0. 공개 검증과 배포는 root가 최신 원격 기반의 별도 checkout에서 담당한다.

## 기능과 범위

- 기존20퀴즈(12 OX,2 강세 클릭 드릴,6 혼합 연습)의368문항을 그대로 사용한다. 처음 방문하면 기본 순서다. 공통 quiz-order.js가 ‘순서대로 새로 풀기’/‘랜덤으로 새로 풀기’와 현재 출제 순서를 표시한다. 최소 버튼높이44px·글자14px, 모바일 줄바꿈, 기존 버튼 색/형태를 따른다. CSS 변수는 추가하지 않았다.
- Fisher–Yates로 문제 순서만 섞는다. 선택지·정답 index·해설·문항 객체는 수정하지 않는다. 전체 문항을 중복/누락 없이 출제한다. 기본 순서로 전환하면 원래 배열 순서로 돌아간다.
- OX/클릭 드릴은 기존 SAVE_KEY에 답안과 indices/mode를 함께 저장한다. 새로고침 시 같은 문제에 같은 응답이 대응한다. order 필드가 없는 기존 풀이 기록은 원래 순서로 이어진다. 잘못된 permutation은 답안과 함께 복원하지 않는다.
- 혼합 연습은 기존처럼 답안의 새로고침 이어 풀기를 추가하지 않는다. 출제 순서는 저장해 그대로 복원한다. 초기 build는 렌더만 하고, 명시적 reset에서1회 새로 섞는다. 다시 풀면 답/점수/진행률이 초기화된다.
- 결과 팝업의 다시 풀기도 현재 모드를 유지한다. 공통 controller의 resultLater가400ms 결과 예약을 소유하고 reset에서 취소한다. retry는 이전 canvas와 RAF를 정리한다. 최고 점수 기록의 기존 key/동작은 보존한다.
- 변경: quiz-order.js 신규, score-popup.js의 선택적 onRetry/효과 정리,20HTML의 script/init/save/reset/result 예약 연결만. 그림 연결 worker의 quiz-study-figures.js·feedback 변경과 소유를 분리했다.

## 사용자 변경 보존 / 패치

- 시작 HEAD:7251b5bc489eff40d4b4a2288c6e15cf350ab3e6. 기존 사용자 변경: stress.html, compound_ox.html, deletion_ox.html, noun_verb_exercises.html, study/blog/썸네일 등. 덮어쓰거나 되돌리지 않았다.
- 시작 작업트리 원본: /tmp/phon-random-baseline-20261016.json. 20HTML 전체 text와 작업 전 git status 포함. 20 Q/DATA 선언을 이 원본과 byte 비교하여 동일함을 확인했다.
- root 확인 원격8268087에는 로컬에 없는35페이지 study-return/접근성 변경이 있다. 로컬 HTML 전체 blob을 stage/배포하지 않으며 원격 checkout에 아래의 우리 변경 전용 패치를 적용한다.
- 최종 runtime22파일 패치: /tmp/phon-random-final-runtime-20261016.patch
- SHA256:8a0eef160f92ae2765d73695e80090b0b43bcf63a0b82865a29e89d8f1cf7532
- context0 대안:/tmp/phon-random-final-runtime-zero-20261016.patch (원격 줄 위치와 적용 결과 확인이 필요하며 무검증 적용하지 않는다).
- 테스트 신규 파일만:/tmp/phon-random-tests-20261016.patch. 파일별 전후 해시:/tmp/phon-random-final-manifest-20261016.json.
- runtime 패치는 시작 원본에 **랜덤 변환만** 적용하여 만들었으므로 사용자 문항 변경과 그림 helper 변경은 포함하지 않는다. 이전 /tmp/phon-random-html-only... 패치는 중간본이며 최종 배포 대상으로 사용하지 않는다.

## 검증

- node scripts/test_quiz_order.js GREEN:20페이지/368문항. 실제 문항 객체 중복/누락0, TOTAL 일치, script 순서 sounds→score-popup→quiz-order→inline, legacy/정확한 random resume/응답 대응, 기본 순서 복귀, 잘못된 저장값·storage 차단, 혼합 연습 초기화 경로, 결과 예약 취소 fixture.
- NODE_PATH=/Users/namgicheol/.npm/_npx/31e32ef8478fbf80/node_modules node scripts/test_quiz_order_browser.js
- 실제 anonymous WebKit:20페이지 모두 랜덤 출제→실제 첫 답 클릭/입력→전체 정답 채점→결과→다시 풀기→기본 순서 복귀. OX/클릭 드릴은 reload 후 order/문제/응답 exact-match; 혼합 연습도 reload 후 order exact-match.20페이지×320/390/1280=60개 폭 검사, control 우측 잘림0, document overflow0, JS page error0.
- 경계 회귀: 완료 직후 새로 풀기 후650ms가 지나도 이전 결과 팝업0, retry 직후 이전 confetti canvas0. 동작을 수정한 최신 코드는 최종1회 재실행으로 확정한다.
- 수치/캡처: output/qa/2026-10-16-random-browser.json, random-stress-320.png, random-noun_verb_exercises-320.png.
- git diff --check GREEN. 공유 Aside/실회원/외부 저장소 쓰기 없음.

## 디자인 참고

Lazyweb ‘quiz question shuffle’ 빠른 검색 후 현재 화면을 업로드하여 작은 출제 순서 컨트롤만 추가하는 report를 생성했다. 생성 성공/degraded false, 지침대로 Codex browser에서 열었다. 공개 링크: https://www.lazyweb.com/report/lazyweb/d7f327a1-52f6-421e-997f-1addcd1bbb95/?source=create

독립 검수자는 Luna이며 최종 diff 판정을 받은 뒤 이 상태를 갱신한다. 이 문서는 로컬 작업 기록이고 공개 배포 완료를 뜻하지 않는다.
