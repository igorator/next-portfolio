export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://igorator.site",
  name: "Ihor Kliushnyk",
  author: "Ihor Kliushnyk",
  description: "Frontend Developer portfolio",
  pages: {
    home: {
      title: "Home",
      description:
        "Frontend Developer specializing in React, Next.js, and TypeScript.",
    },
    projects: {
      title: "Projects",
      description: "Selected projects and case studies.",
    },
    project: {
      fallbackDescription: "Project details.",
    },
    employment: {
      description: "Employment history and work experience.",
    },
    cv: {
      description: "CV view or download.",
    },
  },
  og: {
    brand: "Ihor Kliushnyk",
    subtitle: "Frontend Developer",
  },
} as const;
