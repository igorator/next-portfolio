import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/server/lib/projects";
import { getTechnologies } from "@/server/lib/technologies";
import { ProjectsSection } from "@/shared/components/pages/Projects/Projects";
import { siteConfig } from "@/shared/config/site";
import type { LocalePageProps } from "@/shared/types/page";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("title");
  const canonical =
    locale === routing.defaultLocale ? "/projects" : `/${locale}/projects`;

  return {
    title,
    description: siteConfig.pages.projects.description,
    alternates: { canonical },
    openGraph: { url: canonical },
  };
}

export default async function Projects({ params }: LocalePageProps) {
  const { locale } = await params;

  const [projects, technologies] = await Promise.all([
    getProjects(locale),
    getTechnologies(),
  ]);

  return <ProjectsSection projects={projects} technologies={technologies} />;
}
