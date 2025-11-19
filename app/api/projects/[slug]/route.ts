import { type NextRequest, NextResponse } from "next/server";
import type { Locale } from "next-intl";

import projectBase from "@/server/data/projects/project_base.json";
import projectsEn from "@/server/data/projects/projects_en.json";
import projectsUk from "@/server/data/projects/projects_uk.json";
import technologiesData from "@/server/data/technologies/technologies.json";

import { mergeProjectsWithTechnologies } from "@/server/lib/utils/mergeProjectsWithTechnologies";
import type { Project } from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";

const technologies = technologiesData as Technology[];

const I18N_BY_LOCALE: Record<
  Locale,
  Record<string, Pick<Project, "title" | "description" | "type" | "category">>
> = {
  en: projectsEn as Record<
    string,
    Pick<Project, "title" | "description" | "type" | "category">
  >,
  uk: projectsUk as Record<
    string,
    Pick<Project, "title" | "description" | "type" | "category">
  >,
};

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const qp = request.nextUrl.searchParams.get("locale") as Locale | null;
  const locale: Locale = qp && qp in I18N_BY_LOCALE ? qp : "en";
  const i18n = I18N_BY_LOCALE[locale] ?? I18N_BY_LOCALE.en;

  const base = (
    projectBase as Omit<
      Project,
      "title" | "description" | "type" | "category"
    >[]
  ).find((p) => p.slug === slug);

  if (!base) {
    return NextResponse.json(
      { error: "Project not found", slug, locale },
      { status: 404 },
    );
  }

  const t = i18n[slug];

  const project: Project = {
    ...base,
    title: t?.title ?? base.slug,
    description: t?.description ?? "",
    type: t?.type ?? "",
    category: t?.category ?? "",
  };

  const [projectWithTech] = mergeProjectsWithTechnologies(
    [project],
    technologies,
  );

  return NextResponse.json(projectWithTech);
}
