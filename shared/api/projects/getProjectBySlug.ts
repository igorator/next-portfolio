// server side
import type { Locale } from "next-intl";
import { cache } from "react";
import { listProjectImages } from "../assets/listProjectImages";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchProjectBySlug = async (slug: string, locale: Locale) => {
  const res = await fetch(`${API_URL}/projects/${slug}?locale=${locale}`, {
    next: { revalidate: 300 },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Project not found");

  const project = await res.json();
  const { cover, screens } = await listProjectImages(slug);

  return { ...project, cover, screens };
};

export const getProjectBySlug = cache(fetchProjectBySlug);
