"use client";

import Link from "next/link";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import styles from "./ErrorSection.module.css";

interface ErrorSectionProps {
  reset: () => void;
}

export const ErrorSection = ({ reset }: ErrorSectionProps) => (
  <Section id="error" className={styles.error}>
    <div className={styles.content}>
      <h1 className={styles.code}>500</h1>
      <p className={styles.message}>Something went wrong</p>
      <div className={styles.actions}>
        <GlassSurface>
          <button onClick={reset} className={styles.btn}>
            Try again
          </button>
        </GlassSurface>
        <GlassSurface>
          <Link href={routes.root.path} className={styles.btn}>
            Back to Home
          </Link>
        </GlassSurface>
      </div>
    </div>
  </Section>
);
