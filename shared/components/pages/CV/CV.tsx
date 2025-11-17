"use client";

import { cubicBezier, motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { BsDownload, BsEye, BsFileEarmarkPerson } from "react-icons/bs";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "../../ui/GlassSurface/GlassSurface";
import styles from "./CV.module.css";

type CVSectionProps = {
  cvFile: string;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export const CVSection = ({ cvFile }: CVSectionProps) => {
  const t = useTranslations();

  return (
    <Section className={styles.cv}>
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div
          className={styles.iconWrapper}
          variants={itemVariants}
          animate={{ y: [0, -6, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <BsFileEarmarkPerson className={styles.cvIcon} />
        </motion.div>

        <motion.div className={styles.buttons} variants={itemVariants}>
          <GlassSurface>
            <motion.a
              href={cvFile}
              download
              className={`${styles.button} ${styles.download}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <BsDownload size={18} />
              <span>{t("cv.download")}</span>
            </motion.a>
          </GlassSurface>

          <motion.a
            href={cvFile}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.view}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <BsEye size={18} />
            <span>{t("cv.view")}</span>
          </motion.a>
        </motion.div>
      </motion.div>
    </Section>
  );
};
