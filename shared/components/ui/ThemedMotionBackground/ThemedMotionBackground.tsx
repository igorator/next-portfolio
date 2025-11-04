"use client";

import { useTheme } from "../../widgets/ThemeSwitcher/hooks/useTheme";
import styles from "./ThemedMotionBackground.module.css";

export function ThemedMotionBackground() {
  const { effective, isDark } = useTheme(); // effective = 'light' | 'dark'

  return (
    <div className={styles.oceanWrapper} data-theme-effective={effective}>
      <div className={styles.ocean}>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>

        {isDark && <div className={styles.sun} />}
        {isDark && <div className={styles.stars} />}
      </div>
    </div>
  );
}
