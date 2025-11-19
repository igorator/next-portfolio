import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { cache } from "react";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/shared/api/projects/getProjects";
import { getTechnologies } from "@/shared/api/technologies/getTechnologies";
import { ProjectsSection } from "@/shared/components/pages/Projects/Projects";

export const revalidate = 300;

const getProjectsCached = cache(getProjects);
const getTechnologiesCached = cache(getTechnologies);

type Params = { locale: Locale };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const title = t("title");
  const description = "Selected projects and case studies by Ihor Kliushnyk.";
  const canonical =
    locale === routing.defaultLocale ? "/projects" : `/${locale}/projects`;

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

export default async function Projects({ params }: Props) {
  const { locale } = await params;

  const [projects, technologies] = await Promise.all([
    getProjectsCached(locale),
    getTechnologiesCached(),
  ]);

  return <ProjectsSection projects={projects} technologies={technologies} />;
}
