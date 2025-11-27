import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { HomeSection } from "@/shared/components/pages/Home/Home";

type Params = { locale: Locale };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = "Ihor Kliushnyk - Developer";
  const description =
    "Design-driven, fast, and functional web experiences portfolio.";

  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
    },
  };
}

export default function Home() {
  return <HomeSection />;
}
