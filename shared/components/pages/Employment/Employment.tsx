"use client";

import {
  cubicBezier,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/components/layout/Section/Section";
import { Link } from "@/i18n/navigation";
import { BsFolder2 } from "react-icons/bs";
import type { Employment } from "@/shared/types";
import styles from "./Employment.module.css";

type EmploymentSectionProps = {
  employmentHistory: Employment[];
};

export const EmploymentSection = ({
  employmentHistory,
}: EmploymentSectionProps) => {
  const t = useTranslations();
  const prefersReduced = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: prefersReduced ? 0 : 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: prefersReduced ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.5,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  return (
    <Section className={styles.employment}>
      <h2 className={styles.title}>{t("employment.title")}</h2>

      <motion.ul
        className={styles.timeline}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {employmentHistory.map((itemData) => (
          <motion.li key={itemData.id} className={styles.item} variants={item}>
            <article className={styles.card}>
              <header className={styles.header}>
                <h3 className={styles.company}>{itemData.company}</h3>
                <span className={styles.period}>{itemData.period}</span>
              </header>

              <div className={styles.type}>{itemData.type}</div>

              <ul className={styles.roles}>
                {itemData.roles.map((role: string) => (
                  <li
                    key={`${role}-${itemData.company}`}
                    className={styles.role}
                  >
                    {role}
                  </li>
                ))}
              </ul>

              {itemData.linkedProjects && itemData.linkedProjects.length > 0 && (
                <div className={styles.projectsBlock}>
                  <div className={styles.projectsLabel}>
                    {t("employment.linkedProjects", { default: "Linked projects" })}
                  </div>
                  <ul className={styles.projects}>
                    {itemData.linkedProjects.map((p) => (
                      <li key={p.slug}>
                        <Link className={styles.projectBadge} href={`/projects/${p.slug}`}>
                          <BsFolder2 className={styles.projectBadgeIcon} aria-hidden="true" />
                          <span>{p.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
};
