# Codex Handoff — phonetics-phonology

작성일: 2026-05-12

이 문서는 Claude worktree 안에 있던 인수인계 내용을 Codex 작업 시작점으로 옮긴 요약본이다. 상세 레포 규칙은 루트 `AGENTS.md`를 우선한다.

## 0초 컨텍스트

- 레포 유형: 임용고시 대비 음성학·음운론 OX 퀴즈 + 개념정리 + 블로그 정리 웹앱.
- 기술 스택: 순수 HTML/CSS/JS, 백엔드 없음.
- 1차 출처: `refs/phonetics/` 합격자 노트 + 임용 기출 문제지.
- 기출 정보는 추정 금지. 검증된 refs나 `docs/기출맥락_2010_2026.md`에 없으면 표기하지 않는다.
- 한글 설명 안의 학술 키워드는 영어 원어로 통일한다. 상세 기준은 `docs/한글용어.md`.
- Codex 기준 지침 원본은 `AGENTS.md`; `CLAUDE.md`는 호환용 포인터로만 유지한다.

## 최근 완료 흐름

| 커밋 | 내용 |
|---|---|
| `34328fd` | 신규 페이지 작성 시 보조 검증 지침 추가 |
| `a3bd42d` | `stress_study.html` / `stress_concepts.html` 기출 이력 추가, aspiration·assimilation·flapping OX 기출 각도 문항 추가 |
| `e41bf23` | `docs/기출맥락_2010_2026.md` 추가 |
| `d1ad61e` | 강세 드릴 카테고리 라벨에서 정답 힌트 제거 |
| `a057be4` | 모바일 우측 잘림 방지용 CSS Grid `minmax(0,1fr)` 적용 |

## 현재 상태

| 단원 | OX 파일 | 개념정리 | OX 기출각도 | 개념정리 기출이력 |
|---|---|---|---|---|
| Stress | `stress.html`, `stress_practice.html`, `stress_practice2.html`, `stress_exercises.html` | `stress_study.html`, `stress_concepts.html` | 일부 반영 | 반영됨 |
| Aspiration | `aspiration_ox.html`, `aspiration_exercises.html` | 없음 | 1개 | 없음 |
| Assimilation | `assimilation_ox.html`, `assimilation_exercises.html` | 없음 | 2개 | 없음 |
| Flapping | `flapping_ox.html`, `flapping_exercises.html` | 없음 | 2개 | 없음 |
| Schwa | `schwa_ox.html`, `schwa_exercises.html` | 없음 | 없음 | 없음 |
| Nasalization | `nasalization_ox.html` | 없음 | 없음 | 없음 |
| Voice | `voice_ox.html` | 없음 | 없음 | 없음 |
| Deletion | `deletion_ox.html` | 없음 | 없음 | 없음 |
| Compound stress | `compound_ox.html` | 없음 | 없음 | 없음 |
| Suffix stress | `suffix_ox.html` | 없음 | 없음 | 없음 |
| Noun/Verb stress | `noun_verb_ox.html`, `noun_verb_exercises.html` | 없음 | 없음 | 없음 |
| Sentence stress | `sentence_ox.html` | 없음 | 없음 | 없음 |

## 우선순위

1. P0: 비어 있는 단원별 `_study.html` 작성
   - 우선 후보: `aspiration_study.html`, `flapping_study.html`, `assimilation_study.html`
   - 스타일은 `stress_study.html`을 템플릿으로 삼는다.
   - 각 concept에 의미 있는 anchor id를 둔다.
   - `docs/기출맥락_2010_2026.md`에 매칭되는 경우에만 `.exam` 블록을 추가한다.

2. P0: testmaster concept_link 연동
   - `_study.html` 또는 `*_concepts.html` 생성/anchor 변경 시 외부 레포 `testmaster/data/concept_anchors.json` 갱신.
   - `python3 scripts/wire_concept_links.py` 실행 후 `깨진링크: 0건` 확인.

3. P1: OX 페이지 기출 각도 문항 보강
   - 대상: `schwa_ox.html`, `nasalization_ox.html`, `voice_ox.html`, `deletion_ox.html`, `compound_ox.html`, `suffix_ox.html`, `noun_verb_ox.html`, `sentence_ox.html`.
   - `TOTAL` 상수와 `/N문제` 표시를 함께 갱신한다.

4. P1: `index.html` / `phonetics.html` 링크 갱신
   - 새 `_study.html` 추가 시 랜딩과 허브에 개념정리 링크를 함께 노출한다.

5. P2: 블로그 스텁 채우기
   - `blog/Ch01-Stress-OX.md`
   - `blog/Ch01-Stress-Drill1.md`
   - `blog/Ch01-Stress-Drill2.md`

## 단원 1개 완료 체크리스트

- `_study.html` 생성 또는 수정
- concept anchor id 부여
- 검증된 기출 이력만 `.exam` 블록에 반영
- 한글 학술 조어 없이 영어 원어 사용
- `index.html` / `phonetics.html` 링크 갱신
- testmaster `concept_anchors.json` 갱신 및 `wire_concept_links.py` 검증
- 필요 시 OX 기출 각도 문항 추가
- 모바일 우측 잘림 방지: `minmax(0,1fr)`, `overflow-wrap`, table scroll 확인

## Codex 운영 메모

- Codex에서는 `AGENTS.md`를 먼저 읽고, 이 문서는 진행 상태 파악용으로만 사용한다.
- subagent는 사용자가 명시적으로 요청한 경우에만 사용한다.
- commit/push는 사용자가 요청한 경우에만 수행한다.
- `.claude/`는 로컬 이전 흔적으로 보고 git 추적에서 제외한다.
