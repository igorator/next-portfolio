import { BsBriefcase, BsFolder2, BsHouse } from "react-icons/bs";

export const routes = {
  root: {
    path: "/",
    label: "Home",
    icon: BsHouse,
  },
  projects: {
    path: "/projects",
    label: "Projects",
    icon: BsFolder2,
  },
  employment: {
    path: "/employment",
    label: "Employment",
    icon: BsBriefcase,
  },
} as const;
