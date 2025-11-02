import Link from "next/link";
import { Section } from "@/shared/components/layout/Section/Section";
import { routes } from "@/shared/config/routes";
import { GlassSurface } from "../../ui/GlassSurface/GlassSurface";
import styles from "./NotFoundSection.module.css";

export const NotFoundSection = () => (
  <Section id="not-found" className={styles.notFound}>
    <div className={styles.content}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page not found</p>
      <GlassSurface>
        <Link href={routes.root.path} className={`${styles.btn}`}>
          Back to Home
        </Link>
      </GlassSurface>
    </div>
  </Section>
);
