# jiwoong-site

한지웅의 개인 사이트 — 이력서 / 포트폴리오 / 글을 통합 관리.

## 스택

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
- ISR(60s)
- 정적 콘텐츠 (이력서·포트폴리오·일부 글) → `src/data/*.ts`
- 일상 글 → Notion API (`@notionhq/client`)
- 한국어/영어 분리: `/`, `/about`, `/portfolio`, `/blog/[slug]`, `/portfolio/[slug]` (KO) · `/en`, `/en/about` (EN)

## 로컬 실행

```bash
npm install
npm run dev
```

→ http://localhost:3000

## 환경 변수

`.env.local` 에 아래 값들이 필요합니다 (Notion 연동용):

```
NOTION_TOKEN=...
NOTION_BLOG_DATABASE_ID=...
NOTION_PORTFOLIO_DATABASE_ID=...
NOTION_THOUGHTS_DATABASE_ID=...
NEXT_PUBLIC_SITE_URL=https://your-domain.com  # 배포 시
```

`NEXT_PUBLIC_SITE_URL` 은 OG 메타데이터·sitemap 생성에 사용됩니다.

## 데이터 수정

| 영역 | 위치 |
|------|------|
| 프로필 (이름·태그라인·연락처) | `src/data/profile.ts` |
| 경력 타임라인 | `src/data/career.ts` |
| 프로젝트 + 케이스 스터디 | `src/data/projects.ts` |
| 스킬 | `src/data/skills.ts` |
| 학력·자격 | `src/data/education.ts` |
| 정적 블로그 글 | `src/data/posts.ts` |
| 일상 글 | Notion 블로그 DB |

## 배포

Vercel:

1. GitHub 레포로 push
2. https://vercel.com/new 에서 import
3. 환경 변수 등록 (위 표 참고)
4. Deploy

## 라우트

- `/` 한국어 홈 (인트로 + 글 리스트, `?category=` 필터)
- `/about` 이력서
- `/portfolio` 포트폴리오 카드 그리드
- `/portfolio/[slug]` 케이스 스터디 (5단 구조)
- `/blog/[slug]` 글 상세 (정적 + Notion 통합)
- `/en`, `/en/about` 영어 버전
