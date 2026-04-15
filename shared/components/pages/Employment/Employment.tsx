"use client";

import {
  cubicBezier,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useFormatter, useTranslations } from "next-intl";
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
  const format = useFormatter();
  const prefersReduced = useReducedMotion();

  const formatPeriod = (emp: Employment): string | null => {
    if (emp.period) return emp.period;
    if (!emp.startDate) return null;

    const toDate = (str: string) => {
      const [year, month] = str.split("-").map(Number);
      return new Date(year, month - 1, 1);
    };

    const startStr = format.dateTime(toDate(emp.startDate), {
      month: "short",
      year: "numeric",
    });

    if (!emp.endDate) return startStr;
    if (emp.endDate === "present")
      return `${startStr} — ${t("employment.present")}`;

    const endStr = format.dateTime(toDate(emp.endDate), {
      month: "short",
      year: "numeric",
    });
    return `${startStr} — ${endStr}`;
  };

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
                <span className={styles.typeBadge}>{itemData.type}</span>
                {itemData.position && (
                  <span className={styles.position}>{itemData.position}</span>
                )}
              </header>

              {formatPeriod(itemData) && (
                <div className={styles.period}>{formatPeriod(itemData)}</div>
              )}

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

              {itemData.linkedProjects &&
                itemData.linkedProjects.length > 0 && (
                  <div className={styles.projectsBlock}>
                    <div className={styles.projectsLabel}>
                      {t("employment.linkedProjects", {
                        default: "Linked projects",
                      })}
                    </div>
                    <ul className={styles.projects}>
                      {itemData.linkedProjects.map((p) => (
                        <li key={p.slug}>
                          <Link
                            className={styles.projectBadge}
                            href={`/projects/${p.slug}`}
                          >
                            <BsFolder2
                              className={styles.projectBadgeIcon}
                              aria-hidden="true"
                            />
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
