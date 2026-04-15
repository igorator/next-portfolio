"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import { routing } from "@/i18n/routing";
import { routes } from "@/shared/config/routes";
import { LinkTooltip } from "@/shared/components/ui/LinkTooltip/LinkTooltip";
import styles from "./NavbarLinks.module.css";

type Route = (typeof routes)[keyof typeof routes];

export const NavbarLinks = () => {
  const pathname = usePathname() ?? "/";
  const locale = useLocale();
  const t = useTranslations();

  const normalized =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

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
            : path === routes.employment.path
              ? t("navigation.employment")
              : t("navigation.projects");

        return (
          <LinkTooltip
            key={path}
            label={label}
            className={styles.navItemWrapper}
            trigger={
              <Link
                href={href}
                className={`${styles.navItem} ${active ? styles.isActive : ""}`}
                aria-current={active ? "page" : undefined}
                prefetch
              >
                <Icon className={styles.icon} aria-hidden="true" />
              </Link>
            }
          />
        );
      })}
    </nav>
  );
};
