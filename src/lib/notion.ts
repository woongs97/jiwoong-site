import { cache } from "react";
import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  RichTextItemResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { staticPosts, type PostBlock } from "../data/posts";

// ─── Client ───────────────────────────────────────────────
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// ─── Helpers ──────────────────────────────────────────────
function richTextToPlain(rt: RichTextItemResponse[]): string {
  return rt.map((t) => t.plain_text).join("");
}

function getProperty(page: PageObjectResponse, key: string) {
  return page.properties[key];
}

function getTitle(page: PageObjectResponse, key = "Name"): string {
  const prop = getProperty(page, key);
  if (prop?.type === "title") return richTextToPlain(prop.title);
  return "";
}

function getRichText(page: PageObjectResponse, key: string): string {
  const prop = getProperty(page, key);
  if (prop?.type === "rich_text") return richTextToPlain(prop.rich_text);
  return "";
}

function getSelect(page: PageObjectResponse, key: string): string {
  const prop = getProperty(page, key);
  if (prop?.type === "select") return prop.select?.name ?? "";
  return "";
}

function getMultiSelect(page: PageObjectResponse, key: string): string[] {
  const prop = getProperty(page, key);
  if (prop?.type === "multi_select") return prop.multi_select.map((s) => s.name);
  return [];
}

function getDate(page: PageObjectResponse, key: string): string {
  const prop = getProperty(page, key);
  if (prop?.type === "date") return prop.date?.start ?? "";
  return "";
}

function getUrl(page: PageObjectResponse, key: string): string {
  const prop = getProperty(page, key);
  if (prop?.type === "url") return prop.url ?? "";
  return "";
}

function getCover(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  if (page.cover.type === "external") return page.cover.external.url;
  if (page.cover.type === "file") return page.cover.file.url;
  return null;
}

// ─── Types ────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
  cover: string | null;
  published: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link: string;
  cover: string | null;
  color: string;
}

export interface ThoughtItem {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  icon: string;
}

// ─── Blog ─────────────────────────────────────────────────
function staticPostsAsBlogPosts(): BlogPost[] {
  return staticPosts.map((p) => ({
    id: `static-${p.slug}`,
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    date: p.date,
    readTime: p.readTime,
    cover: p.cover,
    published: true,
  }));
}

function mergeAndSortPosts(notionPosts: BlogPost[]): BlogPost[] {
  const merged = [...notionPosts, ...staticPostsAsBlogPosts()];
  // 날짜 내림차순. 빈 날짜는 뒤로.
  merged.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  });
  return merged;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!databaseId) return mergeAndSortPosts(getSampleBlogPosts());

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "Date", direction: "descending" }],
    });

    const notionPosts: BlogPost[] = response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => ({
        id: page.id,
        slug: getRichText(page, "Slug") || page.id,
        title: getTitle(page),
        description: getRichText(page, "Description"),
        category: getSelect(page, "Category"),
        date: getDate(page, "Date"),
        readTime: getRichText(page, "ReadTime") || "5분 읽기",
        cover: getCover(page),
        published: true,
      }));

    return mergeAndSortPosts(notionPosts);
  } catch {
    return mergeAndSortPosts(getSampleBlogPosts());
  }
}

export type PostBySlugResult =
  | { kind: "static"; post: BlogPost; staticBlocks: PostBlock[] }
  | { kind: "notion"; post: BlogPost; blocks: BlockObjectResponse[] };

export async function getPostBySlug(
  slug: string
): Promise<PostBySlugResult | null> {
  // 1) 정적 포스트부터 확인
  const sp = staticPosts.find((p) => p.slug === slug);
  if (sp) {
    return {
      kind: "static",
      post: {
        id: `static-${sp.slug}`,
        slug: sp.slug,
        title: sp.title,
        description: sp.description,
        category: sp.category,
        date: sp.date,
        readTime: sp.readTime,
        cover: sp.cover,
        published: true,
      },
      staticBlocks: sp.blocks,
    };
  }

  // 2) Notion fallback
  const databaseId = process.env.NOTION_BLOG_DATABASE_ID;
  if (!databaseId) return null;

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: { property: "Slug", rich_text: { equals: slug } },
    });

    const rawPage = response.results[0];
    if (!rawPage || !("properties" in rawPage)) return null;
    const page = rawPage as PageObjectResponse;

    const blocks = await notion.blocks.children.list({ block_id: page.id });

    return {
      kind: "notion",
      post: {
        id: page.id,
        slug,
        title: getTitle(page),
        description: getRichText(page, "Description"),
        category: getSelect(page, "Category"),
        date: getDate(page, "Date"),
        readTime: getRichText(page, "ReadTime") || "5분 읽기",
        cover: getCover(page),
        published: true,
      },
      blocks: blocks.results.filter(
        (b): b is BlockObjectResponse => "type" in b
      ),
    };
  } catch {
    return null;
  }
}

// ─── Portfolio ────────────────────────────────────────────
export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const databaseId = process.env.NOTION_PORTFOLIO_DATABASE_ID;
  if (!databaseId) return getSamplePortfolioItems();

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "Order", direction: "ascending" }],
    });

    const colors = [
      "from-blue-500 to-purple-600",
      "from-emerald-500 to-teal-400",
      "from-amber-500 to-red-500",
      "from-pink-500 to-rose-400",
    ];

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page, i) => ({
        id: page.id,
        title: getTitle(page),
        description: getRichText(page, "Description"),
        tags: getMultiSelect(page, "Tags"),
        link: getUrl(page, "Link"),
        cover: getCover(page),
        color: colors[i % colors.length],
      }));
  } catch {
    return getSamplePortfolioItems();
  }
}

// ─── Thoughts ─────────────────────────────────────────────
export async function getThoughts(): Promise<ThoughtItem[]> {
  const databaseId = process.env.NOTION_THOUGHTS_DATABASE_ID;
  if (!databaseId) return getSampleThoughts();

  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [{ property: "Date", direction: "descending" }],
    });

    const iconMap: Record<string, string> = {
      아이디어: "💡",
      배움: "📘",
      회고: "🪞",
      기록: "📝",
    };

    return response.results
      .filter((p): p is PageObjectResponse => "properties" in p)
      .map((page) => {
        const category = getSelect(page, "Category");
        return {
          id: page.id,
          title: getTitle(page),
          description: getRichText(page, "Description"),
          category,
          date: getDate(page, "Date"),
          icon: iconMap[category] || "📝",
        };
      });
  } catch {
    return getSampleThoughts();
  }
}

// ─── Sample Data (Notion 미연결시 표시) ───────────────────
function getSampleBlogPosts(): BlogPost[] {
  return [
    {
      id: "1",
      slug: "nextjs-app-router",
      title: "Next.js App Router로 블로그를 새로 만들면서 배운 것들",
      description:
        "기존 Pages Router에서 App Router로 마이그레이션하면서 겪은 시행착오와 인사이트를 정리했습니다.",
      category: "개발",
      date: "2026-04-18",
      readTime: "8분 읽기",
      cover: null,
      published: true,
    },
    {
      id: "2",
      slug: "good-portfolio",
      title: "좋은 포트폴리오란 무엇인가에 대한 고민",
      description:
        "단순히 프로젝트를 나열하는 것이 아니라, 자신의 사고 과정과 성장을 보여주는 포트폴리오에 대해.",
      category: "생각",
      date: "2026-04-12",
      readTime: "5분 읽기",
      cover: null,
      published: true,
    },
    {
      id: "3",
      slug: "career-roadmap-2y",
      title: "2년차 개발자가 돌아보는 커리어 로드맵",
      description:
        "입사 후 2년간의 여정을 돌아보며, 앞으로의 방향성과 목표를 정리해봤습니다.",
      category: "커리어",
      date: "2026-04-05",
      readTime: "6분 읽기",
      cover: null,
      published: true,
    },
  ];
}

function getSamplePortfolioItems(): PortfolioItem[] {
  return [
    {
      id: "1",
      title: "개인 블로그 & 포트폴리오",
      description:
        "Next.js + Notion API 기반의 개인 웹사이트. ISR로 빠른 로딩, Notion에서 편하게 콘텐츠 관리.",
      tags: ["Next.js", "Notion API", "Vercel", "TypeScript"],
      link: "",
      cover: null,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "2",
      title: "할 일 관리 앱",
      description:
        "React Native로 만든 심플한 투두 앱. 로컬 스토리지 기반으로 오프라인에서도 동작.",
      tags: ["React Native", "Expo", "AsyncStorage"],
      link: "",
      cover: null,
      color: "from-emerald-500 to-teal-400",
    },
    {
      id: "3",
      title: "데이터 대시보드",
      description:
        "실시간 데이터를 시각화하는 대시보드. Chart.js와 WebSocket을 활용한 라이브 차트.",
      tags: ["React", "Chart.js", "WebSocket", "Node.js"],
      link: "",
      cover: null,
      color: "from-amber-500 to-red-500",
    },
  ];
}

function getSampleThoughts(): ThoughtItem[] {
  return [
    {
      id: "1",
      title: "사이드 프로젝트에서 가장 중요한 건 '완성'이다",
      description: "기술 스택보다 완성 경험이 더 많은 걸 가르쳐준다",
      category: "아이디어",
      date: "2026-04-20",
      icon: "💡",
    },
    {
      id: "2",
      title: "TypeScript strict mode를 켜고 나서 코드 품질이 확실히 달라졌다",
      description: "처음엔 번거롭지만 장기적으로 생산성이 올라가는 경험",
      category: "배움",
      date: "2026-04-15",
      icon: "📘",
    },
    {
      id: "3",
      title: "코드 리뷰를 받을 때 방어적이지 않기",
      description: "피드백은 나를 향한 게 아니라 코드를 향한 것",
      category: "회고",
      date: "2026-04-08",
      icon: "🪞",
    },
  ];
}

// ─── Request-scoped cache (React cache) ───────────────────
export const getCachedBlogPosts = cache(getBlogPosts);
