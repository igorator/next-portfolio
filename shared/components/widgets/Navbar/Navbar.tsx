"use client";

import { LanguageSelect } from "@/shared/components/widgets/LanguageSelect/LanguageSelect";
import { ThemeSwitch } from "@/shared/components/widgets/ThemeSwitcher/ThemeSwitcher";

import { Socials } from "../Socials/Socials";
import { NavbarLinks } from "@/shared/components/widgets/Navbar/NavbarLinks/NavbarLinks";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar} data-fixed-gap>
      <Socials />

      <NavbarLinks />

      <ThemeSwitch />

      <LanguageSelect />
    </nav>
  );
};
