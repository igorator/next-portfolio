import { cache } from "react";
import type { Locale } from "next-intl";

import employmentBase from "@/server/data/employment/employment_base.json";
import employmentEn from "@/server/data/employment/employment_en.json";
import employmentUk from "@/server/data/employment/employment_uk.json";

import projectBase from "@/server/data/projects/project_base.json";
import projectsEn from "@/server/data/projects/projects_en.json";
import projectsUk from "@/server/data/projects/projects_uk.json";

import type { Employment } from "@/shared/types";
import type { Project } from "@/shared/types/projects/project";
import { resolveLocale } from "./locale";

type LocalizedMap = Record<
  string,
  { type: string; position?: string; roles: string[] }
>;

const EMPLOYMENT_BY_LANG: Record<Locale, LocalizedMap> = {
  en: employmentEn as LocalizedMap,
  uk: employmentUk as LocalizedMap,
};

function fetchEmployment(locale: Locale): Employment[] {
  const safeLocale = resolveLocale(locale);
  const map = EMPLOYMENT_BY_LANG[safeLocale];
  const enMap = EMPLOYMENT_BY_LANG.en;

  const availableProjectSlugs = new Set(
    (
      projectBase as Array<
        Omit<Project, "title" | "description" | "type" | "category">
      >
    ).map((p) => p.slug),
  );

  const projectsI18n = (
    safeLocale === "uk" ? projectsUk : projectsEn
  ) as Record<
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
      position: loc?.position,
      roles: loc?.roles ?? [],
      linkedProjects,
    } as Employment;
  });
}

export const getEmployment = cache(fetchEmployment);
