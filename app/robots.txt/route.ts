import { routing } from "@/i18n/routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://igorator.site";

export const runtime = "edge";

export function GET() {
  const locales = routing.locales;
  const sitemaps = locales.map(
    (locale) =>
      `${siteUrl}${locale === routing.defaultLocale ? "" : `/${locale}`}/sitemap.xml`,
  );

  const lines = [
    "User-agent: *",
    "Allow: /",
    ...sitemaps.map((url) => `Sitemap: ${url}`),
    `Host: ${siteUrl}`,
  ];

  return new Response(lines.join("\n"), {
    status: 200,
    headers: { "Content-Type": "text/plain" },
  });
}
