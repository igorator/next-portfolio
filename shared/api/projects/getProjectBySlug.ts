// server side
import type { Locale } from "next-intl";
import { listProjectImages } from "../assets/listProjectImages";

export const getProjectBySlug = async (slug: string, locale: Locale) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}?locale=${locale}`,
    { next: { revalidate: 60 } },
  );
  if (!res.ok) throw new Error("Project not found");

  const project = await res.json();
  const { cover, screens } = await listProjectImages(slug);

  return { ...project, cover, screens };
};
