"use client";

import { useTranslations } from "next-intl";
import { BsDownload, BsEye, BsFileEarmarkPerson } from "react-icons/bs";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "../../ui/GlassSurface/GlassSurface";
import styles from "./CV.module.css";

type CVSectionProps = {
  cvFile: string;
};

export const CVSection = ({ cvFile }: CVSectionProps) => {
  const t = useTranslations();

  return (
    <Section className={styles.cv}>
      <div className={styles.content}>
        <div className={styles.iconWrapper}>
          <BsFileEarmarkPerson className={styles.cvIcon} />
        </div>

        <div className={styles.buttons}>
          <GlassSurface>
            <a
              href={cvFile}
              download
              className={`${styles.button} ${styles.download}`}
            >
              <BsDownload size={18} />
              <span>{t("cv.download")}</span>
            </a>
          </GlassSurface>

          <a
            href={cvFile}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.view}`}
          >
            <BsEye size={18} />
            <span>{t("cv.view")}</span>
          </a>
        </div>
      </div>
    </Section>
  );
};
