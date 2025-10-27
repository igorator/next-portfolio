import type { Locale } from "next-intl";
import { getProjectBySlug } from "@/shared/api/projects/getProjectBySlug";
import { ProjectSection } from "@/shared/components/pages/Projects/Project/Project";

export const revalidate = 60;

type Params = { slug: string; locale: Locale };
type Props = { params: Params | Promise<Params> };

export default async function ProjectPage({ params }: Props) {
  const { slug, locale } = await Promise.resolve(params); // <- ключевая строка

  const project = await getProjectBySlug(slug, locale);

  return (
    <ProjectSection
      title={project.title}
      description={project.description}
      type={project.type}
      category={project.category}
      date={project.date}
      cover={project.cover ?? ""}
      technologies={project.technologies}
      githubUrl={project.githubUrl}
      demoUrl={project.demoUrl}
      screens={project.screens ?? []}
    />
  );
}
