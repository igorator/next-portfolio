import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { routing } from "@/i18n/routing";
import { getProjectBySlug } from "@/shared/api/projects/getProjectBySlug";
import { ProjectSection } from "@/shared/components/pages/Projects/Project/Project";

export const revalidate = 60;

type Params = { slug: string; locale: Locale };
type Props = { params: Promise<Params> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;

  try {
    const project = await getProjectBySlug(slug, locale);

    const title = project.title || slug;
    const description =
      project.description || "Project details from Ihor Kliushnyk's portfolio.";
    const canonical =
      locale === routing.defaultLocale
        ? `/projects/${slug}`
        : `/${locale}/projects/${slug}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        images: project.cover ? [project.cover] : undefined,
      },
      twitter: {
        title,
        description,
        card: "summary_large_image",
        images: project.cover ? [project.cover] : undefined,
      },
    };
  } catch (error) {
    const canonical =
      locale === routing.defaultLocale
        ? `/projects/${slug}`
        : `/${locale}/projects/${slug}`;
    return {
      title: slug,
      description: "Project details",
      alternates: { canonical },
    };
  }
}

export default async function ProjectPage({ params }: Props) {
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
