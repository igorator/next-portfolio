import { cache } from "react";
import type { Locale } from "next-intl";

import projectBase from "@/server/data/projects/project_base.json";
import projectsEn from "@/server/data/projects/projects_en.json";
import projectsUk from "@/server/data/projects/projects_uk.json";
import technologiesData from "@/server/data/technologies/technologies.json";

import { listProjectImages } from "./images";
import type {
  Project,
  ProjectWithTechnologies,
} from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";
import { mergeProjectsWithTechnologies } from "./utils/mergeProjectsWithTechnologies";
import { resolveLocale } from "./locale";

const technologies = technologiesData as Technology[];

type ProjectI18n = Pick<Project, "title" | "description" | "type" | "category">;

const I18N_BY_LOCALE: Record<Locale, Record<string, ProjectI18n>> = {
  en: projectsEn as Record<string, ProjectI18n>,
  uk: projectsUk as Record<string, ProjectI18n>,
};

function buildProject(
  base: Omit<Project, "title" | "description" | "type" | "category">,
  i18n: Record<string, ProjectI18n>,
): Project {
  const t = i18n[base.slug];
  return {
    ...base,
    title: t?.title ?? base.slug,
    description: t?.description ?? "",
    type: t?.type ?? "",
    category: t?.category ?? "",
  };
}

function fetchProjects(locale: Locale): ProjectWithTechnologies[] {
  const safeLocale = resolveLocale(locale);
  const i18n = I18N_BY_LOCALE[safeLocale];

  const bases = projectBase as Array<
    Omit<Project, "title" | "description" | "type" | "category">
  >;

  const merged = bases
    .map((base) => buildProject(base, i18n))
    .sort((a, b) => b.date.localeCompare(a.date));

  return mergeProjectsWithTechnologies(merged, technologies);
}

export const getProjects = cache(fetchProjects);

async function fetchProjectBySlug(
  slug: string,
  locale: Locale,
): Promise<(ProjectWithTechnologies & { screens: string[] }) | null> {
  const safeLocale = resolveLocale(locale);
  const i18n = I18N_BY_LOCALE[safeLocale];

  const bases = projectBase as Array<
    Omit<Project, "title" | "description" | "type" | "category">
  >;

  const base = bases.find((p) => p.slug === slug);
  if (!base) return null;

  const project = buildProject(base, i18n);
  const [projectWithTech] = mergeProjectsWithTechnologies(
    [project],
    technologies,
  );
  const images = await listProjectImages(slug);

  return {
    ...projectWithTech,
    cover: images.cover ?? undefined,
    screens: images.screens,
  };
}

export const getProjectBySlug = cache(fetchProjectBySlug);
