import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ProjectWithTechnologies } from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";

type SortKey = "newest" | "oldest" | "az" | "za";
type MatchMode = "any" | "all";

const SORT_VALUES = new Set<SortKey>(["newest", "oldest", "az", "za"]);
const MATCH_VALUES = new Set<MatchMode>(["any", "all"]);

function parseSortKey(value: string | null): SortKey {
  return value && SORT_VALUES.has(value as SortKey)
    ? (value as SortKey)
    : "newest";
}

function parseMatchMode(value: string | null): MatchMode {
  return value && MATCH_VALUES.has(value as MatchMode)
    ? (value as MatchMode)
    : "all";
}

export const useProjectFilters = (
  projects: ProjectWithTechnologies[],
  technologies: Technology[],
) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTechs = useMemo(() => {
    const param = searchParams.get("tech");
    return param ? param.split(",").filter(Boolean) : [];
  }, [searchParams]);

  const sortBy = parseSortKey(searchParams.get("sort"));
  const matchMode = parseMatchMode(searchParams.get("match"));
  const commercialOnly = searchParams.get("commercial") === "true";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === null) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  const toggleTech = useCallback(
    (id: string) => {
      const next = selectedTechs.includes(id)
        ? selectedTechs.filter((t) => t !== id)
        : [...selectedTechs, id];
      updateParams({ tech: next.length > 0 ? next.join(",") : null });
    },
    [selectedTechs, updateParams],
  );

  const setOnlyTechnology = useCallback(
    (id: string) => updateParams({ tech: id }),
    [updateParams],
  );

  const clearTechnologies = useCallback(
    () => updateParams({ tech: null }),
    [updateParams],
  );

  const setSortBy = useCallback(
    (value: SortKey) =>
      updateParams({ sort: value === "newest" ? null : value }),
    [updateParams],
  );

  const setMatchMode = useCallback(
    (value: MatchMode) =>
      updateParams({ match: value === "all" ? null : value }),
    [updateParams],
  );

  const setCommercialOnly = useCallback(
    (value: boolean) => updateParams({ commercial: value ? "true" : null }),
    [updateParams],
  );

  const clearAll = useCallback(
    () =>
      updateParams({ tech: null, sort: null, match: null, commercial: null }),
    [updateParams],
  );

  const filteredProjects = useMemo(() => {
    const toIdArray = (p: ProjectWithTechnologies): string[] =>
      (p.technologies ?? []).map((t) => t.id).filter(Boolean);

    let filtered = projects;

    if (selectedTechs.length > 0) {
      filtered = projects.filter((project) => {
        const projectTechIds = toIdArray(project);

        if (matchMode === "all") {
          return selectedTechs.every((id) => projectTechIds.includes(id));
        } else {
          return selectedTechs.some((id) => projectTechIds.includes(id));
        }
      });
    }

    if (commercialOnly) {
      filtered = filtered.filter((project) => Boolean(project.isCommercial));
    }

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.date.localeCompare(a.date);
        case "oldest":
          return a.date.localeCompare(b.date);
        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [projects, selectedTechs, sortBy, matchMode, commercialOnly]);

  const availableTechnologies = useMemo(() => {
    const projectHasTech = (project: ProjectWithTechnologies, techId: string) =>
      (project.technologies ?? []).some((t) => t.id === techId);

    return technologies.filter((tech) =>
      projects.some((project) => projectHasTech(project, tech.id)),
    );
  }, [projects, technologies]);

  return {
    selectedTechs,
    sortBy,
    matchMode,
    commercialOnly,
    filteredProjects,
    availableTechnologies,
    toggleTech,
    setOnlyTechnology,
    clearTechnologies,
    setSortBy,
    setMatchMode,
    setCommercialOnly,
    clearAll,
  };
};
