import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CVSection } from "@/shared/components/pages/CV/CV";
import { siteConfig } from "@/shared/config/site";
import type { LocalePageProps } from "@/shared/types/page";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });

  const title = t("title");
  const canonical = locale === routing.defaultLocale ? "/cv" : `/${locale}/cv`;

  return {
    title,
    description: siteConfig.pages.cv.description,
    alternates: { canonical },
    openGraph: { url: canonical },
  };
}

const cvFilePath = "/cv/CV_KLIUSHNYK_FRONTEND.pdf";

export default function CV() {
  return <CVSection cvFile={cvFilePath} />;
}
