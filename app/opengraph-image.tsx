import { ImageResponse } from "next/og";
import { routing } from "@/i18n/routing";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://igorator.site";

export default function OgImage() {
  const brand = "Ihor Kliushnyk";
  const subtitle = "Design-driven, fast, functional.";

  return new ImageResponse(
    <div
      tw="w-full h-full flex flex-col items-start justify-center"
      style={{
        background:
          "linear-gradient(135deg, #0b1224 0%, #122044 50%, #0b1224 100%)",
        color: "#eef2ff",
        padding: "72px",
        letterSpacing: "-0.02em",
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div tw="text-3xl mb-5 opacity-90">{siteUrl}</div>
      <div
        tw="text-7xl font-bold"
        style={{
          lineHeight: 1.1,
          textShadow: "0 10px 40px rgba(0,0,0,0.35)",
        }}
      >
        {brand}
      </div>
      <div tw="text-4xl mt-4 text-indigo-100 opacity-90">{subtitle}</div>
      <div
        tw="mt-10 inline-flex items-center text-2xl font-semibold"
        style={{
          color: "#a5b4fc",
          gap: "12px",
        }}
      >
        <span>Portfolio</span>
        <span tw="opacity-70">·</span>
        <span>{routing.locales.join(" / ")}</span>
      </div>
    </div>,
    {
      width: size.width,
      height: size.height,
    },
  );
}
