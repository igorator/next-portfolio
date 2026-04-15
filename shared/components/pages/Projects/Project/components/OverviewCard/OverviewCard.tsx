"use client";

import { motion, type Variants } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
import layout from "../../Project.module.css";
import styles from "./OverviewCard.module.css";

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
  title: string;
  type: string;
  category: string;
  date: string;
};

export function OverviewCard({ title, type, category, date }: Props) {
  const t = useTranslations("projects_ui");
  const format = useFormatter();

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-").map(Number);
    return format.dateTime(new Date(year, month - 1, 1), {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.article
      className={`${layout.card} ${layout.overviewCard}`}
      variants={cardItem}
    >
      <h1 className={styles.projectTitle}>{title}</h1>
      <ul className={styles.metaList}>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>{t("type")}</span>
          <span className={styles.metaValue}>{type}</span>
        </li>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>{t("category")}</span>
          <span className={styles.metaValue}>{category}</span>
        </li>
        <li className={styles.metaItem}>
          <span className={styles.metaLabel}>{t("date")}</span>
          <time className={styles.metaValue} dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      </ul>
    </motion.article>
  );
}

export default OverviewCard;
