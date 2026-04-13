import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { HomeSection } from "@/shared/components/pages/Home/Home";
import { siteConfig } from "@/shared/config/site";
import type { LocalePageProps } from "@/shared/types/page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    title: t("title"),
    description: siteConfig.pages.home.description,
    alternates: { canonical },
    openGraph: { url: canonical },
  };
}

export default function Home() {
  return <HomeSection />;
}
