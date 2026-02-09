import type { Technology } from "@/shared/types";
import type {
  Project,
  ProjectWithTechnologies,
} from "@/shared/types/projects/project";

export const mergeProjectsWithTechnologies = (
  projects: Project[],
  technologies: Technology[],
): ProjectWithTechnologies[] => {
  const techMap = new Map(technologies.map((t) => [t.id, t]));

  return projects.map((project) => {
    const { technologiesIds, ...rest } = project;
    const techs = technologiesIds
      .map((id) => techMap.get(id))
      .filter((t): t is Technology => t !== undefined);
    return { ...rest, technologies: techs };
  });
};
