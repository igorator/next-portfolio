import { NextResponse } from "next/server";
import type { Locale } from "next-intl";

import employmentBase from "@/server/data/employment/employment_base.json";
import employmentEn from "@/server/data/employment/employment_en.json";
import employmentUk from "@/server/data/employment/employment_uk.json";

import projectBase from "@/server/data/projects/project_base.json";
import projectsEn from "@/server/data/projects/projects_en.json";
import projectsUk from "@/server/data/projects/projects_uk.json";

import type { Employment } from "@/shared/types";
import type { Project } from "@/shared/types/projects/project";

type LocalizedMap = Record<string, { type: string; roles: string[] }>;

const EMPLOYMENT_BY_LANG: Record<Locale, LocalizedMap> = {
  en: employmentEn as LocalizedMap,
  uk: employmentUk as LocalizedMap,
} as const;

function mergeEmployment(locale: Locale): Employment[] {
  const map = EMPLOYMENT_BY_LANG[locale] ?? EMPLOYMENT_BY_LANG.en;
  const enMap = EMPLOYMENT_BY_LANG.en;

  // Build set of existing project slugs for safe linking
  const availableProjectSlugs = new Set(
    (
      projectBase as Array<
        Omit<Project, "title" | "description" | "type" | "category">
      >
    ).map((p) => p.slug),
  );

  const projectsI18n = (locale === "uk" ? projectsUk : projectsEn) as Record<
    string,
    Pick<Project, "title" | "description" | "type" | "category">
  >;

  return employmentBase.map((baseItem) => {
    const loc = map[baseItem.id] ?? enMap[baseItem.id];

    const linkedProjects = (baseItem.projects || [])
      .filter((slug) => availableProjectSlugs.has(slug))
      .map((slug) => ({ slug, title: projectsI18n[slug]?.title ?? slug }));

    return {
      ...baseItem,
      type: loc?.type ?? "unknown",
      roles: loc?.roles ?? [],
      linkedProjects,
    } as Employment;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || "en";

  const employment = mergeEmployment(locale);
  return NextResponse.json(employment);
}
