import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CVSection } from "@/shared/components/pages/CV/CV";

type Params = { locale: Locale };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cv" });

  const title = t("title");
  const description = "Download or view the CV of Ihor Kliushnyk.";
  const canonical = locale === routing.defaultLocale ? "/cv" : `/${locale}/cv`;

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

const cvFilePath = "/cv/CV_KLIUSHNYK_FRONTEND.pdf";

export default function CV() {
  return <CVSection cvFile={cvFilePath} />;
}
