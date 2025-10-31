"use client";

import { LanguageSelect } from "@/shared/components/widgets/LanguageSelect/LanguageSelect";
import { NavbarLinks } from "@/shared/components/widgets/Navbar/NavbarLinks/NavbarLinks";
import { ThemeSwitch } from "@/shared/components/widgets/ThemeSwitcher/ThemeSwitcher";
import { Socials } from "../Socials/Socials";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Socials />

      <NavbarLinks />

      <ThemeSwitch />

      <LanguageSelect />
    </nav>
  );
};
