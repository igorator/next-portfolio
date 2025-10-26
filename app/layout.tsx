import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { MobileOverlay } from "@/shared/components/widgets/MobileOverlay/MobileOverlay";

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
        <SpeedInsights />
        <MobileOverlay />
        {children}
      </body>
    </html>
  );
}
