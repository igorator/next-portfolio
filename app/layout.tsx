// app/layout.tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { AppPortal } from "@/shared/components/layout/AppPortal/AppPortal";

type ThemeSetting = "light" | "dark" | "system";
const THEME_COOKIE = "theme";

const fontHeading = Manrope({
  variable: "--font-headings",
  subsets: ["latin"],
  display: "swap",
});
const fontText = Inter({
  variable: "--font-text",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://igorator.site";

export const metadata: Metadata = {
  title: "Ihor's Portfolio",
  description:
    "Portfolio by Ihor Kliushnyk - design-driven, fast, and functional.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      uk: "/uk",
    },
  },
  openGraph: {
    title: "Ihor's Portfolio",
    description:
      "Portfolio by Ihor Kliushnyk - design-driven, fast, and functional.",
    url: "/",
    siteName: "Ihor's Portfolio",
    images: ["/opengraph-image"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ihor's Portfolio",
    description:
      "Portfolio by Ihor Kliushnyk - design-driven, fast, and functional.",
    images: ["/opengraph-image"],
  },
};

// Если читаем cookies() здесь — layout становится динамическим (это нормально для темы)
// export const dynamic = "force-dynamic";

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
          content={
            theme === "dark"
              ? "dark light"
              : theme === "light"
                ? "light dark"
                : "light dark"
          }
        />
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
