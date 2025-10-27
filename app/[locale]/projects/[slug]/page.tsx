import type { Locale } from "next-intl";
import { getProjectBySlug } from "@/shared/api/projects/getProjectBySlug";
import { ProjectSection } from "@/shared/components/pages/Projects/Project/Project";

export const revalidate = 60;
export const dynamic = "force-static";

type ProjectPageProps = {
  params: Promise<{ slug: string; locale: Locale }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale } = await params;
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
