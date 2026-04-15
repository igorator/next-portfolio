"use client";

import { AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/components/layout/Section/Section";
import type { ProjectWithTechnologies } from "@/shared/types/projects/project";
import type { Technology } from "@/shared/types/technology";
import { ProjectFilters } from "./components/ProjectFilters/ProjectFilters";
import { ProjectsGrid } from "./components/ProjectGrid/ProjectsGrid";
import { useProjectFilters } from "./hooks/useProjectFilters";
import styles from "./Projects.module.css";

interface ProjectsSectionProps {
  projects: ProjectWithTechnologies[];
  technologies: Technology[];
}

export const ProjectsSection = ({
  projects,
  technologies,
}: ProjectsSectionProps) => {
  const t = useTranslations("projects");

  const {
    selectedTechs,
    sortBy,
    filteredProjects,
    toggleTech,
    setOnlyTechnology,
    setSortBy,
    availableTechnologies,
    commercialOnly,
    setCommercialOnly,
    clearAll,
  } = useProjectFilters(projects, technologies);

  return (
    <Section className={styles.projectSection}>
      <h2 className={styles.title}>{t("title")}</h2>

      <ProjectFilters
        technologies={availableTechnologies ?? technologies}
        selectedTechnologies={selectedTechs}
        sortBy={sortBy}
        onTechnologySelect={toggleTech}
        onSortChange={setSortBy}
        commercialOnly={commercialOnly}
        onCommercialChange={setCommercialOnly}
        onClearAll={clearAll}
      />

      <AnimatePresence mode="popLayout">
        <ProjectsGrid
          projects={filteredProjects}
          onTechnologyClick={setOnlyTechnology}
        />
      </AnimatePresence>
    </Section>
  );
};
