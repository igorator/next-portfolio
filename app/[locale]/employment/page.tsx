import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getEmployment } from "@/server/lib/employment";
import { EmploymentSection } from "@/shared/components/pages/Employment/Employment";
import { siteConfig } from "@/shared/config/site";
import type { LocalePageProps } from "@/shared/types/page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "employment" });

  const title = t("title");
  const canonical =
    locale === routing.defaultLocale ? "/employment" : `/${locale}/employment`;

  return {
    title,
    description: siteConfig.pages.employment.description,
    alternates: { canonical },
    openGraph: { url: canonical },
  };
}

export default async function Employment({ params }: LocalePageProps) {
  const { locale } = await params;

  const employmentHistory = await getEmployment(locale);

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
