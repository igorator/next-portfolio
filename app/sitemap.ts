import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import projectBase from "@/server/data/projects/project_base.json";
import { siteConfig } from "@/shared/config/site";

const STATIC_PATHS = ["/", "/projects", "/employment", "/cv"] as const;

const projectEntries = (
  projectBase as Array<{ slug: string; date?: string }>
).map((project) => ({
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
    for (const path of STATIC_PATHS) {
      urls.push({
        url: new URL(localePath(locale, path), siteConfig.url).toString(),
        lastModified: new Date(),
      });
    }

    for (const project of projectEntries) {
      urls.push({
        url: new URL(
          localePath(locale, `/projects/${project.slug}`),
          siteConfig.url,
        ).toString(),
        lastModified: project.lastModified ?? new Date(),
      });
    }
  }

  return urls;
}
