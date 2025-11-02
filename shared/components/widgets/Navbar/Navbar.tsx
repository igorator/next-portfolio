"use client";

import { LanguageSelect } from "@/shared/components/widgets/LanguageSelect/LanguageSelect";
import { NavbarLinks } from "@/shared/components/widgets/Navbar/NavbarLinks/NavbarLinks";
import { ThemeSwitch } from "@/shared/components/widgets/ThemeSwitcher/ThemeSwitcher";
import { GlassSurface } from "../../ui/GlassSurface/GlassSurface";
import { Socials } from "../Socials/Socials";
import styles from "./Navbar.module.css";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <GlassSurface className={styles.socialsWrapper}>
        <Socials />
      </GlassSurface>

      <GlassSurface className={styles.navbarLinksWrapper}>
        <NavbarLinks />
      </GlassSurface>

      <GlassSurface className={styles.themeSwitcherWrapper}>
        <ThemeSwitch />
      </GlassSurface>

      <GlassSurface className={styles.languageSelectWrapper}>
        <LanguageSelect />
      </GlassSurface>
    </nav>
  );
};
