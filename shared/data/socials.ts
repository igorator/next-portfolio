import { FaGithub, FaLinkedin, FaUpwork } from "react-icons/fa6";
import { BsFileEarmarkPerson } from "react-icons/bs";
import { MdEmail } from "react-icons/md";

export const socials = {
  email: {
    url: "ihor.kliushnyk@gmail.com",
    icon: MdEmail,
    label: "Email",
  },

  github: {
    url: "https://github.com/igorator",
    icon: FaGithub,
    label: "GitHub",
  },

  linkedIn: {
    url: "https://www.linkedin.com/in/ihor-kliushnyk/",
    icon: FaLinkedin,
    label: "LinkedIn",
  },

  upwork: {
    url: "https://upwork.com/freelancers/ihorkliushnyk",
    icon: FaUpwork,
    label: "Upwork",
  },

  cv: {
    url: "https://cdn.jsdelivr.net/gh/igorator/portfolio-assets@main/cv/CV_KLIUSHNYK_FRONTEND.pdf",
    icon: BsFileEarmarkPerson,
    label: "CV",
  },
} as const;
