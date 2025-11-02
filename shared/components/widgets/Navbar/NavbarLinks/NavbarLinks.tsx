// shared/components/layout/Navbar/NavbarLinks.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { routing } from "@/i18n/routing";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import styles from "./NavbarLinks.module.css";

type Route = (typeof routes)[keyof typeof routes];

export const NavbarLinks = () => {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const t = useTranslations();

  // Уберём возможный слэш в конце
  const normalized =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  // Стрип локали из начала пути: /ua/..., /en/..., /de-CH/...
  const stripLocale = (p: string) => {
    const locales = routing.locales;
    const re = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`, "i");
    const stripped = p.replace(re, "");
    return stripped === "" ? "/" : stripped;
  };

  const currentPath = stripLocale(normalized);
  const items: Route[] = useMemo(() => Object.values(routes), []);

  return (
    <nav className={styles.navbarLinks}>
      {items.map(({ path, icon: Icon }) => {
        const active =
          path === "/"
            ? currentPath === "/"
            : currentPath === path || currentPath.startsWith(`${path}/`);

        const href = `/${locale}${path === "/" ? "" : path}`;

        const label =
          path === routes.root.path
            ? t("navigation.root")
            : path === routes.cv.path
              ? t("navigation.cv")
              : path === routes.employment.path
                ? t("navigation.employment")
                : t("navigation.projects");

        return (
          <Link
            key={path}
            href={href}
            className={`${styles.navItem} ${active ? styles.isActive : ""}`}
            aria-current={active ? "page" : undefined}
            prefetch
          >
            <Icon className={styles.icon} aria-hidden="true" />
            <span className={styles.label}>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
