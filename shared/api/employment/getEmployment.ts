import type { Locale } from "next-intl";
import { cache } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchEmployment = async (locale: Locale = "en") => {
  const res = await fetch(`${API_URL}/employment?locale=${locale}`, {
    next: { revalidate: 3600 },
    cache: "force-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch employment data");
  return res.json();
};

export const getEmployment = cache(fetchEmployment);
