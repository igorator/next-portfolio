"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import layout from "../../Project.module.css";
import styles from "./DescriptionCard.module.css";

const cardItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

type Props = { description: string };

export function DescriptionCard({ description }: Props) {
  const t = useTranslations("projects_ui");
  return (
    <motion.article
      className={`${layout.card} ${layout.descFull}`}
      variants={cardItem}
    >
      <h2 className={layout.cardTitle}>{t("descriptionTitle")}</h2>
      <p className={styles.description}>{description}</p>
    </motion.article>
  );
}

export default DescriptionCard;
