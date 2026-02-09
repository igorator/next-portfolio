import { cache } from "react";
import technologiesData from "@/server/data/technologies/technologies.json";
import type { Technology } from "@/shared/types/technology";

const technologies = technologiesData as Technology[];

function fetchTechnologies(): Technology[] {
  return [...technologies].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.priority - b.priority;
  });
}

export const getTechnologies = cache(fetchTechnologies);
