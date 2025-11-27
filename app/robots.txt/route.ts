const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://igorator.site";

export function GET() {
  const sitemaps = [`${siteUrl}/sitemap.xml`];

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
