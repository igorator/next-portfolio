import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { cache } from "react";
import { getProjects } from "@/shared/api/projects/getProjects";
import { getTechnologies } from "@/shared/api/technologies/getTechnologies";
import { ProjectsSection } from "@/shared/components/pages/Projects/Projects";

export const metadata: Metadata = { title: "Projects" };
export const revalidate = 300;

const getProjectsCached = cache(getProjects);
const getTechnologiesCached = cache(getTechnologies);

type Params = { locale: Locale };
type Props = { params: Params | Promise<Params> };

export default async function Projects({ params }: Props) {
  const { locale } = await Promise.resolve(params); // ключевая строка

  const [projects, technologies] = await Promise.all([
    getProjectsCached(locale),
    getTechnologiesCached(),
  ]);

  return <ProjectsSection projects={projects} technologies={technologies} />;
}
