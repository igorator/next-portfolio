"use client";

import * as Switch from "@radix-ui/react-switch";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { BsMoon, BsSun } from "react-icons/bs";
import styles from "./ThemeSwitcher.module.css";

type Theme = "light" | "dark";
const THEME_COOKIE = "theme"; // значения: 'light' | 'dark' | 'system' (мы ставим только light/dark)

export const ThemeSwitch = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [theme, setTheme] = useState<Theme>("light"); // локальный стейт только для UI

  // Инициализация из SSR: <html data-theme="..."> или из system (prefers-color-scheme)
  useEffect(() => {
    const html = document.documentElement;
    const attr = html.getAttribute("data-theme");
    if (attr === "light" || attr === "dark") {
      setTheme(attr);
    } else {
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const applyTheme = (next: Theme) => {
    // 1) cookie, чтобы SSR layout выставил тот же data-theme
    document.cookie = `${THEME_COOKIE}=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}`;

    // 2) мгновенно обновим атрибут (визуальная отзывчивость до refresh)
    const html = document.documentElement;
    html.setAttribute("data-theme", next);

    // 3) (опционально) color-scheme для нативных контролов/скроллбаров
    let meta = document.querySelector('meta[name="color-scheme"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "color-scheme");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", next === "dark" ? "dark light" : "light dark");

    // 4) локальный стейт для Radix Switch
    setTheme(next);

    // 5) мягкий SSR refresh, чтобы сервер отдал ту же тему
    startTransition(() => router.refresh());
  };

  const handleThemeToggle = (checked: boolean) => {
    applyTheme(checked ? "light" : "dark"); // твоя логика: чек = light, снято = dark
  };

  return (
    <div className={styles.themeSwitch}>
      <BsMoon className={styles.themeIcon} />
      <Switch.Root
        className={styles.switchRoot}
        checked={theme === "light"}
        disabled={isPending}
        onCheckedChange={handleThemeToggle}
      >
        <Switch.Thumb className={styles.switchThumb} />
      </Switch.Root>
      <BsSun className={styles.themeIcon} />
    </div>
  );
};
