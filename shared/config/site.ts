export const siteConfig = {
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://igorator.site",
  name: "Ihor's Portfolio",
  author: "Ihor Kliushnyk",
  description:
    "Portfolio by Ihor Kliushnyk - design-driven, fast, and functional.",
  pages: {
    home: {
      title: "Ihor Kliushnyk - Developer",
      description:
        "Design-driven, fast, and functional web experiences portfolio.",
    },
    projects: {
      description: "Selected projects and case studies by Ihor Kliushnyk.",
    },
    project: {
      fallbackDescription:
        "Project details from Ihor Kliushnyk's portfolio.",
    },
    employment: {
      description: "Employment history and linked projects.",
    },
    cv: {
      description: "Download or view the CV of Ihor Kliushnyk.",
    },
  },
  og: {
    brand: "Ihor Kliushnyk",
    subtitle: "Design-driven, fast, functional.",
  },
} as const;
