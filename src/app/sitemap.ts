import type { MetadataRoute } from "next";
import { staticPosts } from "../data/posts";
import { projects } from "../data/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    { url: `${siteUrl}/about`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/portfolio`, lastModified: now, priority: 0.9 },
    { url: `${siteUrl}/en`, lastModified: now, priority: 0.8 },
    { url: `${siteUrl}/en/about`, lastModified: now, priority: 0.8 },
  ];

  const postPages: MetadataRoute.Sitemap = staticPosts.map((p) => ({
    url: `${siteUrl}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.ko
    .filter((p) => p.caseStudy)
    .map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      lastModified: now,
      priority: 0.8,
    }));

  return [...staticPages, ...postPages, ...projectPages];
}
