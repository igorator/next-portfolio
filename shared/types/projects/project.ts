import type { Technology } from "../technology";

export type Project = {
  slug: string;
  title: string;
  date: string;
  description: string;
  type: string;
  category: string;
  technologiesIds: string[];
  cover?: string;
  screens?: string[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  isCommercial?: boolean;
  isHighlighted?: boolean;
};

export type ProjectWithTechnologies = Omit<Project, "technologiesIds"> & {
  technologies: Technology[];
};
