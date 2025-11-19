import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://igorator.site";

export const runtime = "edge";

export function GET(): MetadataRoute.Robots {
  const locales = routing.locales;
  const sitemapUrls = locales.map((locale) =>
    `${siteUrl}${locale === routing.defaultLocale ? "" : `/${locale}`}/sitemap.xml`,
  );

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: sitemapUrls,
    host: siteUrl,
  };
}
