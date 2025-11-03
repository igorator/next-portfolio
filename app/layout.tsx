import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AppPortal } from "@/shared/components/layout/AppPortal/AppPortal";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontHeading.variable} ${fontText.variable}`}>
        <Analytics />
        <SpeedInsights />
        {children}
        <AppPortal />
      </body>
    </html>
  );
}
