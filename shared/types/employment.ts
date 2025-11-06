export type Employment = {
  id: string;
  company: string;
  period: string;
  type: string;
  roles: string[];
  projects: string[];
  linkedProjects?: Array<{
    slug: string;
    title: string;
  }>;
};
