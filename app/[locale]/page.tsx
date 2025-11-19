import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeSection } from "@/shared/components/pages/Home/Home";

type Params = { locale: Locale };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "navigation" });

  const title = t("root");
  const description =
    "Portfolio of Ihor Kliushnyk - design-driven, fast, and functional web experiences.";

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
