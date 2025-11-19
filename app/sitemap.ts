import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import projectBase from "@/server/data/projects/project_base.json";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://igorator.site";

const STATIC_PATHS = ["/", "/projects", "/employment", "/cv"] as const;

type ProjectEntry = { slug: string; date?: string };

const projectEntries = (projectBase as ProjectEntry[]).map((project) => ({
  slug: project.slug,
  lastModified: project.date ? new Date(`${project.date}-01`) : undefined,
}));

const localePath = (locale: string, path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    // Static pages
    for (const path of STATIC_PATHS) {
      urls.push({
        url: new URL(localePath(locale, path), siteUrl).toString(),
        lastModified: new Date(),
      });
    }

    // Project detail pages
    for (const project of projectEntries) {
      urls.push({
        url: new URL(
          localePath(locale, `/projects/${project.slug}`),
          siteUrl,
        ).toString(),
        lastModified: project.lastModified ?? new Date(),
      });
    }
  }

  return urls;
}
