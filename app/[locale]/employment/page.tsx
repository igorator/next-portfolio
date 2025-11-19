import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { cache } from "react";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getEmployment } from "@/shared/api/employment/getEmployment";
import { EmploymentSection } from "@/shared/components/pages/Employment/Employment";

export const revalidate = 3600;

const getEmploymentCached = cache(getEmployment);

type Params = { locale: Locale };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "employment" });
  const title = t("title");
  const description = "Employment history and linked projects.";
  const canonical =
    locale === routing.defaultLocale ? "/employment" : `/${locale}/employment`;

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

export default async function Employment({ params }: Props) {
  const { locale } = await params;

  const employmentHistory = await getEmploymentCached(locale);

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
