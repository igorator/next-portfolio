"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import type { Technology } from "@/shared/types/technology";
import layout from "../../Project.module.css";
import styles from "./StackCard.module.css";

const cardItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

type TechWithColor = Technology & { color?: string };

function colorFromString(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `hsl(${hue} 70% 55%)`;
}

type Props = { technologies: Technology[] };

export function StackCard({ technologies }: Props) {
  const t = useTranslations("projects_ui");

  return (
    <motion.article
      className={`${layout.card} ${layout.stackCard}`}
      variants={cardItem}
    >
      <h2 className={layout.cardTitle}>{t("technologiesTitle")}</h2>
      {technologies?.length ? (
        <ul
          className={styles.technologyList}
          aria-label={t("technologyStackAria")}
        >
          {technologies.map((t) => {
            const tw = t as TechWithColor;
            const c = tw.color ?? colorFromString(t.name);
            return (
              <li
                key={t.id}
                className={styles.technologyChip}
                style={
                  {
                    "--chip-fg": c,
                    "--chip-bg": `color-mix(in srgb, ${c} 12%, transparent)`,
                    "--chip-brd": `color-mix(in srgb, ${c} 42%, transparent)`,
                  } as CSSProperties
                }
                title={t.name}
              >
                <span>{t.name}</span>
              </li>
            );
          })}
        </ul>
      ) : (
        <span className={styles.emptyState}>{t("noTechnologies")}</span>
      )}
    </motion.article>
  );
}

export default StackCard;
