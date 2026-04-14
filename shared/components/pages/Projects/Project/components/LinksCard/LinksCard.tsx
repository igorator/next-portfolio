"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import layout from "../../Project.module.css";
import styles from "./LinksCard.module.css";

const cardItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = {
  demoUrl?: string | null;
  githubUrl?: string | null;
};

export function LinksCard({ demoUrl, githubUrl }: Props) {
  const t = useTranslations("projects_ui");

  return (
    <motion.article
      className={`${layout.card} ${layout.linksCard}`}
      variants={cardItem}
    >
      <h2 className={layout.cardTitle}>{t("linksTitle")}</h2>
      <div className={styles.links}>
        {demoUrl ? (
          <a
            className={`${styles.link} ${styles.linkGhost}`}
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("links.liveDemo")}
          </a>
        ) : null}

        {githubUrl ? (
          <a
            className={`${styles.link} ${styles.linkGhost}`}
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("links.github")}
          </a>
        ) : null}

        {!demoUrl && !githubUrl && (
          <span className={styles.emptyState}>{t("noLinks")}</span>
        )}
      </div>
    </motion.article>
  );
}

export default LinksCard;
