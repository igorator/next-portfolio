"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import { Section } from "@/shared/components/layout/Section/Section";
import type { Technology } from "@/shared/types/technology";
import styles from "./Project.module.css";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import React from "react";

type ProjectSectionProps = {
  title: string;
  description: string;
  type: string;
  category: string;
  date: string;
  cover: string;
  technologies: Technology[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  screens: string[] | [];
};

const ease = [0.22, 1, 0.36, 1] as const;

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.28, ease },
  },
};

function colorFromString(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue = h % 360;
  return `hsl(${hue} 70% 55%)`;
}

export function ProjectSection({
  title,
  description,
  type,
  category,
  date,
  cover,
  technologies,
  githubUrl,
  demoUrl,
  screens,
}: ProjectSectionProps) {
  return (
    <Section className={styles.wrap}>
      {/* Topbar: GlassSurface з посиланням назад */}
      <div className={styles.topbar}>
        <GlassSurface>
          <Link
            href="/projects"
            className={styles.back}
            aria-label="Back to projects"
          >
            <BsArrowLeft aria-hidden size={16} />
            <span>Back</span>
          </Link>
        </GlassSurface>
      </div>

      {/* ТІЛЬКИ картки в гріді */}
      <motion.section
        className={styles.cardsGrid}
        variants={cardsContainer}
        initial="hidden"
        animate="show"
        transition={{ ease }}
      >
        {/* 1) Image */}
        <motion.article
          className={`${styles.card} ${styles.imageCard}`}
          variants={cardItem}
        >
          <div className={styles.imageWrap}>
            <Image
              className={styles.image}
              src={cover}
              alt={title}
              fill
              sizes="(min-width: 980px) 66vw, 100vw" // 2/3 ширины на десктопе, 100% на мобиле
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgZmlsbD0iI2NjYyIgLz4=" // лёгкий плейсхолдер
            />
            <div className={styles.imageShade} aria-hidden />
          </div>
        </motion.article>

        {/* 2) Overview */}
        <motion.article
          className={`${styles.card} ${styles.overviewCard}`}
          variants={cardItem}
        >
          <h1 className={styles.projectTitle}>{title}</h1>

          <ul className={styles.kvList}>
            <li className={styles.kv}>
              <span className={styles.kvKey}>Type</span>
              <span className={styles.kvVal}>{type}</span>
            </li>
            <li className={styles.kv}>
              <span className={styles.kvKey}>Category</span>
              <span className={styles.kvVal}>{category}</span>
            </li>
            <li className={styles.kv}>
              <span className={styles.kvKey}>Date</span>
              <time className={styles.kvVal} dateTime={date}>
                {date}
              </time>
            </li>
          </ul>
        </motion.article>

        {/* 3) Technologies */}
        <motion.article
          className={`${styles.card} ${styles.stackCard}`}
          variants={cardItem}
        >
          <h2 className={styles.cardTitle}>Technologies</h2>

          {technologies?.length ? (
            <ul className={styles.techList} aria-label="Technology stack">
              {technologies.map((t) => {
                const c = (t as any).color || colorFromString(t.name);
                return (
                  <li
                    key={t.id}
                    className={styles.techChip}
                    style={
                      {
                        "--chip-fg": c,
                        "--chip-bg": `color-mix(in srgb, ${c} 12%, transparent)`,
                        "--chip-brd": `color-mix(in srgb, ${c} 42%, transparent)`,
                      } as React.CSSProperties
                    }
                  >
                    {t.name}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.muted}>No technologies listed.</p>
          )}
        </motion.article>

        {/* 4) Links — свой заголовок и та же колонка справа, под Technologies */}
        {(demoUrl || githubUrl) && (
          <motion.article
            className={`${styles.card} ${styles.linksCard}`}
            variants={cardItem}
          >
            <h2 className={styles.cardTitle}>Links</h2>

            <div className={styles.links}>
              {demoUrl && (
                <a
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
              )}
              {githubUrl && (
                <a
                  className={`${styles.btn} ${styles.btnGhost}`}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.article>
        )}

        <motion.article
          className={`${styles.card} ${styles.descFull}`}
          variants={cardItem}
        >
          <h2 className={styles.cardTitle}>Description</h2>
          <p className={styles.description}>{description}</p>
        </motion.article>
      </motion.section>
    </Section>
  );
}
