"use client";

import * as Switch from "@radix-ui/react-switch";
import { BsMoon, BsSun } from "react-icons/bs";
import { useThemeStore } from "@/shared/state/store/useThemeStore";
import styles from "./ThemeSwitcher.module.css";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeStore();

  const handleThemeToggle = (checked: boolean) => {
    setTheme(checked ? "light" : "dark");
  };

  return (
    <div className={`${styles.themeSwitch}`}>
      <BsMoon className={styles.themeIcon} />
      <Switch.Root
        className={styles.switchRoot}
        checked={theme === "light"}
        onCheckedChange={handleThemeToggle}
      >
        <Switch.Thumb className={styles.switchThumb} />
      </Switch.Root>
      <BsSun className={styles.themeIcon} />
    </div>
  );
};
