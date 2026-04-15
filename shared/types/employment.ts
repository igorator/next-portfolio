export type Employment = {
  id: string;
  company: string;
  period?: string;
  startDate?: string;
  endDate?: string;
  type: string;
  position?: string;
  roles: string[];
  projects: string[];
  linkedProjects?: Array<{
    slug: string;
    title: string;
  }>;
};
