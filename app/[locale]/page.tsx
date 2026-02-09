import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { HomeSection } from "@/shared/components/pages/Home/Home";
import { siteConfig } from "@/shared/config/site";
import type { LocalePageProps } from "@/shared/types/page";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;

  const canonical = locale === routing.defaultLocale ? "/" : `/${locale}`;

  return {
    title: siteConfig.pages.home.title,
    description: siteConfig.pages.home.description,
    alternates: { canonical },
    openGraph: { url: canonical },
  };
}

export default function Home() {
  return <HomeSection />;
}
