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
};

export const ProjectFilters = ({
  technologies,
  selectedTechnologies,
  sortBy,
  commercialOnly,
  onTechnologySelect,
  onSortChange,
  onCommercialChange,
}: ProjectFiltersProps) => {
  const handleClear = () => {
    if (sortBy !== "newest") onSortChange("newest");

    if (selectedTechnologies.length) {
      selectedTechnologies.map((id) => onTechnologySelect(id));
    }

    if (commercialOnly) onCommercialChange(false);
  };

  const isPristine =
    selectedTechnologies.length === 0 && sortBy === "newest" && !commercialOnly;

  return (
    <div className={styles.filtersBar}>
      <GlassSurface className={styles.technologySelectWrapper}>
        <TechnologyMultiSelect
          technologies={technologies}
          selectedTechnologies={selectedTechnologies}
          onToggle={onTechnologySelect}
        />
      </GlassSurface>

      <GlassSurface className={styles.sortSelectWrapper}>
        <SortSelect value={sortBy} onChange={onSortChange} />
      </GlassSurface>

      <GlassSurface className={styles.commercialSwitchWrapper}>
        <CommercialSwitch
          value={commercialOnly}
          onChange={onCommercialChange}
        />
      </GlassSurface>

      <GlassSurface className={styles.filterClearButtonWrapper}>
        <FilterClearButton onClear={handleClear} disabled={isPristine} />
      </GlassSurface>
    </div>
  );
};
