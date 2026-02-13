import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { AppPortal } from "@/shared/components/layout/AppPortal/AppPortal";
import { siteConfig } from "@/shared/config/site";

type ThemeSetting = "light" | "dark" | "system";
const THEME_COOKIE = "theme";

const fontHeading = Manrope({
  variable: "--font-headings",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});
const fontText = Inter({
  variable: "--font-text",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "transparent",
};

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      uk: "/uk",
    },
  },
  openGraph: {
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("NEXT_LOCALE")?.value ?? routing.defaultLocale;
  const theme =
    (cookieStore.get(THEME_COOKIE)?.value as ThemeSetting) ?? "system";

  const htmlAttrs =
    theme === "system" ? {} : ({ "data-theme": theme } as const);

  return (
    <html lang={locale} {...htmlAttrs} suppressHydrationWarning>
      <head>
        <meta
          name="color-scheme"
          content={theme === "dark" ? "dark light" : "light dark"}
        />
        {theme !== "system" && (
          <meta
            name="theme-color"
            content={theme === "dark" ? "#000000" : "#ffffff"}
          />
        )}
      </head>
      <body className={`${fontHeading.variable} ${fontText.variable}`}>
        <Analytics />
        <SpeedInsights />
        {children}
        <AppPortal />
      </body>
    </html>
  );
}
