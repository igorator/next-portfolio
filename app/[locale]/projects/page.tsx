import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { getProjects } from "@/shared/api/projects/getProjects";
import { getTechnologies } from "@/shared/api/technologies/getTechnologies";
import { ProjectsSection } from "@/shared/components/pages/Projects/Projects";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function Projects({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const [projects, technologies] = await Promise.all([
    getProjects(locale),
    getTechnologies(),
  ]);

  return <ProjectsSection projects={projects} technologies={technologies} />;
}
