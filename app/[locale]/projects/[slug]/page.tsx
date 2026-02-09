import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getProjectBySlug } from "@/server/lib/projects";
import { ProjectSection } from "@/shared/components/pages/Projects/Project/Project";
import { siteConfig } from "@/shared/config/site";
import type { SlugPageProps } from "@/shared/types/page";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) {
    return { title: "Not Found" };
  }

  const title = project.title || slug;
  const description =
    project.description || siteConfig.pages.project.fallbackDescription;
  const canonical =
    locale === routing.defaultLocale
      ? `/projects/${slug}`
      : `/${locale}/projects/${slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      images: project.cover ? [project.cover] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: SlugPageProps) {
  const { slug, locale } = await params;
  const project = await getProjectBySlug(slug, locale);

  if (!project) notFound();

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
