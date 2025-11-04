"use client";

import * as Switch from "@radix-ui/react-switch";
import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "./hooks/useTheme";
import styles from "./ThemeSwitcher.module.css";

type Theme = "light" | "dark";
const THEME_COOKIE = "theme"; // cookie used by RootLayout SSR

function setHtmlTheme(next: Theme) {
  // Persist for SSR and future visits
  document.cookie = `${THEME_COOKIE}=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}`;

  // Update <html data-theme>
  const html = document.documentElement;
  html.setAttribute("data-theme", next);

  // Keep UA theming consistent
  let meta = document.querySelector('meta[name="color-scheme"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "color-scheme");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", next === "dark" ? "dark light" : "light dark");
}

export const ThemeSwitch = () => {
  const { effective } = useTheme();

  const handleThemeToggle = (checked: boolean) => {
    // checked=true => light, false => dark
    setHtmlTheme(checked ? "light" : "dark");
  };

  return (
    <div className={styles.themeSwitch}>
      <BsMoon className={styles.themeIcon} aria-hidden="true" />
      <Switch.Root
        className={styles.switchRoot}
        checked={effective === "light"}
        onCheckedChange={handleThemeToggle}
        aria-label="Toggle color theme"
      >
        <Switch.Thumb className={styles.switchThumb} />
      </Switch.Root>
      <BsSun className={styles.themeIcon} aria-hidden="true" />
    </div>
  );
};
