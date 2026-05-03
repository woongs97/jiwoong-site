# jiwoong-site — Handoff

다른 컴퓨터(또는 새 대화)에서 이 프로젝트 작업을 이어갈 때 필요한 모든 것.

## 1. 사이트 정보

- **GitHub**: https://github.com/woongs97/jiwoong-site
- **Vercel 라이브 URL**: (대시보드에서 확인 — `https://jiwoong-site*.vercel.app` 형태)
- **로컬 경로**: `C:\Users\han_jiwoong03\Documents\Claude\Projects\C System\jiwoong-site`

## 2. 새 컴퓨터에서 처음 셋업

### 필요한 것 설치
1. **Node.js LTS** — https://nodejs.org 또는 `winget install OpenJS.NodeJS.LTS`
2. **Git** — `winget install --id Git.Git -e --source winget`
3. (Mac이면) `brew install node git`

### 레포 받기
```powershell
git clone https://github.com/woongs97/jiwoong-site.git
cd jiwoong-site
```

### 환경 변수 (`.env.local` 직접 만들기)
git에 안 올라가니까 직접 만들어줘야 함. 프로젝트 루트에 `.env.local` 파일 생성하고:

```
NOTION_TOKEN=ntn_…              # Notion 통합 페이지에서 복사
NOTION_BLOG_DATABASE_ID=…       # Notion DB URL의 32자리 hex
NOTION_PORTFOLIO_DATABASE_ID=…
NOTION_THOUGHTS_DATABASE_ID=…
NEXT_PUBLIC_SITE_URL=https://localhost:3000
```

값은 **Vercel → Project → Settings → Environment Variables** 에 다 들어가 있음. 거기서 복사하면 됨.

또는 기존 컴퓨터 `.env.local`을 1Password 등으로 옮겨도 됨.

### 의존성 설치 + 실행
```powershell
npm install
npm run dev
```
→ http://localhost:3000

### Git 사용자 셋업 (한 번만)
```powershell
git config --global user.name "Han Jiwoong"
git config --global user.email "krfrontman@gmail.com"
```

## 3. 사이트 구조

### 라우트 (KO 기본 / EN은 `/en` prefix)
| URL | 역할 |
|---|---|
| `/` | 홈 — 인트로 + 글 리스트 (`?category=` 필터 가능) |
| `/about` | 이력서 (Hero · Quick Card · About · Career · Skills · Education · Contact) |
| `/portfolio` | 포트폴리오 카드 그리드 (8개) |
| `/portfolio/[slug]` | 케이스 스터디 5단 (표지 · 문제·원인 · 해결 · 결과 · 상세 역할) |
| `/blog/[slug]` | 글 상세 + 카테고리 칩 + 이전/다음 + 관련 글 |
| `/en` | 영어 홈 |
| `/en/about` | 영어 이력서 |

### 데이터 (이게 핵심 — 콘텐츠는 모두 여기서 관리)
| 파일 | 내용 |
|---|---|
| `src/data/profile.ts` | 이름, 직함, 자기소개, 연락처 (ko/en) |
| `src/data/career.ts` | 회사별 경력 타임라인 (ko/en) |
| `src/data/projects.ts` | 8개 프로젝트 + Strong Yes 3개 케이스 스터디 (ko/en) |
| `src/data/skills.ts` | 스킬 그룹 (ko/en) |
| `src/data/education.ts` | 학력 + 자격 (ko/en) |
| `src/data/posts.ts` | 정적 블로그 글 (현재 1개: working-backward) |
| Notion DB 3개 | 자주 바뀌는 글·생각·포트폴리오 (사용자가 Notion에서 직접) |

### 컴포넌트
- `Sidebar` (좌측 고정) + `SidebarClient` (locale-aware, 카테고리 필터, KO/EN 토글)
- `MobileHeader` (모바일 상단)
- `AboutContent` — 이력서 페이지 본문 (KO/EN 공유)
- `CaseStudyView` — 포트폴리오 케이스 스터디 5단 렌더
- `StaticPostContent` — 정적 블로그 본문 (블록 단위 렌더)
- `NotionBlock` — Notion 블록 → HTML 렌더
- `BlogCard`, `PortfolioCard`, `PostListItem`, `ThoughtItem` — 카드/리스트 아이템
- `Nav`, `Footer` — 거의 안 쓰임 (Sidebar로 대체됨)

### 핵심 라이브러리
`src/lib/notion.ts` — Notion API 래핑 + 정적/Notion 글 머지

## 4. 워크플로우 (지웅 ↔ Claude)

**원칙**: 사용자는 Notion(자주 바뀌는 글)만 직접 만짐. CV·이력·프로젝트·스킬·자기소개 같은 정적 콘텐츠는 챗으로 Claude한테 던지면 Claude가 `src/data/*.ts`를 수정.

**한 사이클**:
1. 지웅이 챗으로 "이거 수정해줘 / 추가해줘"
2. Claude가 `src/data/...` 또는 컴포넌트 수정
3. 로컬에서 `npm run dev`로 확인
4. PowerShell에서 `git add . && git commit -m "..." && git push`
5. Vercel이 1~2분 안에 자동 배포

**ISR**: Notion 글은 1분 안에 자동 갱신. push 없이도.

**롤백**: Vercel 대시보드에서 이전 배포 클릭 → "Promote to Production".

## 5. 대기 중인 작업 (다음 대화에서 이어가면 좋은 것)

### 즉시 할 수 있는 것 (정보만 주면 됨)
- **Strong Yes 3개 프로젝트의 케이스 스터디 빈 칸 채우기** — `[채워주세요]` 표시된 부분들. 각 프로젝트마다:
  - 구체 지표 (잔여재고율, 결정 리드타임, 룰 적용률 등)
  - 도구 형태 (대시보드/룰엔진/매뉴얼 등)
  - SCM × AI 컨셉의 구체 검증 내용
  - 결과 숫자 3개 (Before/After/변화)
  - 솔직한 한계
  - 본인 R&R 상세 범위
- **다이소 BP / SPAO 1조 전략서 등 다른 프로젝트 추가** — 위 5단 골격에 채우면 됨

### 구조적 다음 단계
- 영어 포트폴리오 (`/en/portfolio`, `/en/portfolio/[slug]`) — 데이터는 이미 ko/en 둘 다 있음, 라우트만 추가하면 됨
- "회사 밖 활동" 섹션 (사이드 프로젝트, 강연, 모임)
- 도메인 시각화 카드 (about 페이지)
- "특별한 강점 narrative" 한두 줄 (about 자기소개 끝)
- Vercel 커스텀 도메인 연결

### 폴리시 / SEO
- 한국어 OG 이미지 (현재 영어만) — 디자인 툴로 1200x630 PNG 만들어 `src/app/opengraph-image.png` 덮어쓰기
- favicon은 그라데이션 PNG 들어가 있음
- robots.ts, sitemap.ts 자동 생성 중

## 6. 알아두면 좋은 운영 노트

### 개인정보
공개 사이트에는 **이메일(krfrontman@gmail.com)과 GitHub만** 노출. 휴대폰·자택주소·희망연봉은 메모리 저장 안 했고 사이트에도 안 들어가 있음.

### 자료 — 한국어 사이트, 영어 분리
한국어가 기본. 영어는 `/en/` prefix. 글 상세는 한국어로 통일(글 자체가 한국어 콘텐츠라).

### 빌드 환경
- Next.js 16.2.4, React 19, Tailwind v4, TypeScript
- ISR `revalidate = 60`
- Vercel: Next.js preset 자동 감지, 별도 설정 없음

### 정적 빌드 함정 — 데이터 추가 시
새 프로젝트의 `caseStudy`를 추가하면 `/portfolio/[slug]` 페이지가 자동 생성. `generateStaticParams`가 src/data/projects.ts를 읽어서 처리.

새 정적 블로그 글을 `src/data/posts.ts`에 추가하면 `/blog/[slug]`도 자동 생성.

### 환경 변수
- 로컬: `.env.local` (gitignore됨)
- Vercel: Settings → Environment Variables (이미 5개 다 등록)
- 갱신 시 Vercel에서 Redeploy 한 번 필요

## 7. 자주 쓰는 명령

```powershell
# 로컬 실행
npm run dev

# 타입 체크 (배포 전 검증)
npx tsc --noEmit --skipLibCheck

# 빌드 테스트
npm run build

# git 한 사이클
git add .
git commit -m "메시지"
git push
```

## 8. Claude한테 새 대화에서 이어 작업할 때

이 파일(`HANDOFF.md`)을 보여주고 "이어서 작업할게" 라고 말하면 됨. 파일에 모든 컨텍스트가 있음.

추가로 이 정보들이 도움이 됨:
- 진행 중인 구체 작업 (예: "Strong Yes 1번 케이스 스터디 채우는 중")
- 최근 push된 브랜치/커밋
- Vercel 라이브 URL의 최신값
