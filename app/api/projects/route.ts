import { NextResponse } from "next/server";
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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || "en";
  const i18n = I18N_BY_LOCALE[locale] ?? I18N_BY_LOCALE.en;

  const merged: Project[] = (
    projectBase as Array<
      Omit<Project, "title" | "description" | "type" | "category">
    >
  )
    .map((project) => {
      const t = i18n[project.slug];

      return {
        ...project,
        title: t?.title ?? project.slug,
        description: t?.description ?? "",
        type: t?.type ?? "",
        category: t?.category ?? "",
      } satisfies Project;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const projectsWithTechnologies = mergeProjectsWithTechnologies(
    merged,
    technologies,
  );

  return NextResponse.json(projectsWithTechnologies);
}
