import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import projectBase from "@/server/data/projects/project_base.json";
import { siteConfig } from "@/shared/config/site";

const STATIC_PATHS = ["/", "/projects", "/employment"] as const;

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

function alternatesForPath(path: string) {
  return {
    languages: Object.fromEntries(
      routing.locales.map((l) => [
        l,
        new URL(localePath(l, path), siteConfig.url).toString(),
      ]),
    ),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const path of STATIC_PATHS) {
    urls.push({
      url: new URL(
        localePath(routing.defaultLocale, path),
        siteConfig.url,
      ).toString(),
      alternates: alternatesForPath(path),
    });
  }

  for (const project of projectEntries) {
    const projectPath = `/projects/${project.slug}`;
    urls.push({
      url: new URL(
        localePath(routing.defaultLocale, projectPath),
        siteConfig.url,
      ).toString(),
      lastModified: project.lastModified ?? new Date(),
      alternates: alternatesForPath(projectPath),
    });
  }

  return urls;
}
