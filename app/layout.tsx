// app/layout.tsx
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppPortal } from "@/shared/components/layout/AppPortal/AppPortal";

type ThemeSetting = "light" | "dark" | "system";
const THEME_COOKIE = "theme";

const fontHeading = Manrope({
  variable: "--font-headings",
  subsets: ["latin"],
});
const fontText = Inter({ variable: "--font-text", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ihor's Portfolio",
  description:
    "Portfolio by Ihor Kliushnyk — design-driven, fast, and functional.",
};

// Если читаем cookies() здесь — layout становится динамическим (это нормально для темы)
// export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const theme =
    (cookieStore.get(THEME_COOKIE)?.value as ThemeSetting) ?? "system";

  const htmlAttrs =
    theme === "system" ? {} : ({ "data-theme": theme } as const);

  return (
    <html lang="en" {...htmlAttrs} suppressHydrationWarning>
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
