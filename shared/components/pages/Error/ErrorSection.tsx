"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import styles from "./ErrorSection.module.css";

interface ErrorSectionProps {
  reset: () => void;
}

export const ErrorSection = ({ reset }: ErrorSectionProps) => {
  const t = useTranslations("error");

  return (
    <Section id="error" className={styles.error}>
      <div className={styles.content}>
        <h1 className={styles.code}>500</h1>
        <p className={styles.message}>{t("title")}</p>
        <div className={styles.actions}>
          <GlassSurface>
            <button onClick={reset} className={styles.btn}>
              {t("tryAgain")}
            </button>
          </GlassSurface>
          <GlassSurface>
            <Link href={routes.root.path} className={styles.btn}>
              {t("backHome")}
            </Link>
          </GlassSurface>
        </div>
      </div>
    </Section>
  );
};
