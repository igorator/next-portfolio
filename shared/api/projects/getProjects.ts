import type { Locale } from "next-intl";
import { cache } from "react";
import type { ProjectWithTechnologies } from "@/shared/types/projects/project";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchProjects = async (locale: Locale = "en") => {
  const res = await fetch(`${API_URL}/projects?locale=${locale}`, {
    next: { revalidate: 300 },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json() as Promise<Array<ProjectWithTechnologies>>;
};

export const getProjects = cache(fetchProjects);
