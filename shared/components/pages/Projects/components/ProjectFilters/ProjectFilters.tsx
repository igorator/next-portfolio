"use client";

import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import type { Technology } from "@/shared/types/technology";
import { CommercialSwitch } from "./CommercialSwitch/CommercialSwitch";
import { FilterClearButton } from "./FilterClearButton/FilterClearButton";
import styles from "./ProjectFilters.module.css";
import { SortSelect } from "./SortSelect/SortSelect";
import { TechnologyMultiSelect } from "./TechnologyMultiSelect/TechnologyMultiSelect";

type SortKey = "newest" | "oldest" | "az" | "za";

type ProjectFiltersProps = {
  technologies: Technology[];
  selectedTechnologies: string[];
  sortBy: SortKey;
  commercialOnly: boolean;
  onTechnologySelect: (id: string) => void;
  onSortChange: (value: SortKey) => void;
  onCommercialChange: (value: boolean) => void;
  onClearAll: () => void;
};

export const ProjectFilters = ({
  technologies,
  selectedTechnologies,
  sortBy,
  commercialOnly,
  onTechnologySelect,
  onSortChange,
  onCommercialChange,
  onClearAll,
}: ProjectFiltersProps) => {
  const loading = !technologies || technologies.length === 0;

  const isPristine =
    selectedTechnologies.length === 0 && sortBy === "newest" && commercialOnly;

  return (
    <div className={styles.filtersBar} aria-busy={loading}>
      <GlassSurface className={styles.technologySelectWrapper}>
        <TechnologyMultiSelect
          technologies={technologies}
          selectedTechnologies={selectedTechnologies}
          onToggle={onTechnologySelect}
          loading={loading}
        />
      </GlassSurface>

      <GlassSurface className={styles.sortSelectWrapper}>
        <SortSelect value={sortBy} onChange={onSortChange} loading={loading} />
      </GlassSurface>

      <GlassSurface className={styles.commercialSwitchWrapper}>
        <CommercialSwitch
          value={commercialOnly}
          onChange={onCommercialChange}
          loading={loading}
        />
      </GlassSurface>

      <GlassSurface
        className={styles.filterClearButtonWrapper}
        style={{ "--gs-width": "auto" }}
      >
        <FilterClearButton
          onClear={onClearAll}
          disabled={isPristine}
          loading={loading}
        />
      </GlassSurface>
    </div>
  );
};
