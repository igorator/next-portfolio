"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { type CSSProperties, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { Link } from "@/i18n/navigation";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import type { Technology } from "@/shared/types/technology";
import styles from "./Project.module.css";

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
  screens?: string[];
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

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 40 : -40,
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { ease, duration: 0.28 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    filter: "blur(6px)",
    transition: { ease, duration: 0.24 },
  }),
};

type TechWithColor = Technology & { color?: string };

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
  screens = [],
}: ProjectSectionProps) {
  const t = useTranslations("projects_ui");

  const images = useMemo(
    () => [cover, ...screens].filter(Boolean),
    [cover, screens],
  );

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasMany = images.length > 1;

  const goTo = (next: number) => {
    if (!hasMany) return;
    const n = (next + images.length) % images.length;
    setDir(next > idx || (idx === images.length - 1 && next === 0) ? 1 : -1);
    setIdx(n);
  };
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  const openLightbox = (startAt = idx) => {
    setIdx(startAt);
    setLightboxOpen(true);
  };

  return (
    <Section className={styles.wrap}>
      <div className={styles.topbar}>
        <GlassSurface>
          <Link
            href={routes.projects.path}
            className={styles.back}
            aria-label="Back to projects"
          >
            <BsArrowLeft aria-hidden size={16} />
            <span>Back</span>
          </Link>
        </GlassSurface>
      </div>

      <motion.section
        className={styles.cardsGrid}
        variants={cardsContainer}
        initial="hidden"
        animate="show"
        transition={{ ease }}
      >
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

        <motion.article
          className={`${styles.card} ${styles.stackCard}`}
          variants={cardItem}
        >
          <h2 className={styles.cardTitle}>Technologies</h2>
          {technologies?.length ? (
            <ul className={styles.techList} aria-label="Technology stack">
              {technologies.map((t) => {
                const tw = t as TechWithColor;
                const c = tw.color ?? colorFromString(t.name);
                return (
                  <li
                    key={t.id}
                    className={styles.techChip}
                    style={
                      {
                        "--chip-fg": c,
                        "--chip-bg": `color-mix(in srgb, ${c} 12%, transparent)`,
                        "--chip-brd": `color-mix(in srgb, ${c} 42%, transparent)`,
                      } as CSSProperties
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
          className={`${styles.card} ${styles.imageCard}`}
          variants={cardItem}
        >
          {images.length === 0 ? (
            <div
              className={styles.noImages}
              role="img"
              aria-label={t("noImages")}
            >
              <span>{t("noImages")}</span>
            </div>
          ) : (
            <div className={styles.imageWrap}>
              <motion.button
                type="button"
                key={images[idx]}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={styles.imageAnimLayer}
                onClick={() => openLightbox(idx)}
                aria-label="Open image in lightbox"
              >
                <Image
                  className={styles.image}
                  src={images[idx]}
                  alt={`${title} — cover`}
                  fill
                  sizes="(min-width: 980px) 66vw, 100vw"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgZmlsbD0iI2NjYyIgLz4="
                />
                <div className={styles.imageShade} aria-hidden />
              </motion.button>

              {hasMany && (
                <>
                  <button
                    type="button"
                    className={`${styles.navBtn} ${styles.navPrev}`}
                    aria-label="Previous image"
                    onClick={prev}
                  >
                    <BsArrowLeft />
                  </button>
                  <button
                    type="button"
                    className={`${styles.navBtn} ${styles.navNext}`}
                    aria-label="Next image"
                    onClick={next}
                  >
                    <BsArrowRight />
                  </button>

                  <div className={styles.dots}>
                    {images.map((src, i) => (
                      <button
                        key={`${src}-dot`}
                        type="button"
                        className={`${styles.dot} ${i === idx ? styles.dotActive : ""}`}
                        aria-label={`Go to image ${i + 1}`}
                        onClick={() => goTo(i)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </motion.article>

        <motion.article
          className={`${styles.card} ${styles.descFull}`}
          variants={cardItem}
        >
          <h2 className={styles.cardTitle}>Description</h2>
          <p className={styles.description}>{description}</p>
        </motion.article>
      </motion.section>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          index={idx}
          setIndex={(n) => goTo(n)}
          onClose={() => setLightboxOpen(false)}
          title={title}
        />
      )}
    </Section>
  );
}

function Lightbox({
  images,
  index,
  setIndex,
  onClose,
  title,
}: {
  images: string[];
  index: number;
  setIndex: (n: number) => void;
  onClose: () => void;
  title: string;
}) {
  const total = images.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex(index + 1);
      if (e.key === "ArrowLeft") setIndex(index - 1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose, setIndex]);

  const go = (n: number) => setIndex((n + total) % total);

  return createPortal(
    <div
      className={styles.lbRoot}
      role="dialog"
      aria-modal
      onPointerDown={onClose}
    >
      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbClose}`}
        aria-label="Close"
        onClick={onClose}
      >
        <MdClose />
      </button>
      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbPrev}`}
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          go(index - 1);
        }}
      >
        <BsArrowLeft />
      </button>
      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbNext}`}
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          go(index + 1);
        }}
      >
        <BsArrowRight />
      </button>

      <div
        className={styles.lbStage}
        onPointerDown={(e) => e.stopPropagation()}
        aria-live="polite"
      >
        <div className={styles.lbFigure}>
          <Image
            key={images[index]}
            src={images[index]}
            alt={`${title} — image ${index + 1} of ${total}`}
            fill
            sizes="100vw"
            className={styles.lbImg}
            priority
          />
        </div>
      </div>

      <div className={styles.lbMeta} onPointerDown={(e) => e.stopPropagation()}>
        <span className={styles.lbCaption}>{title}</span>
        <span className={styles.lbCount}>
          {index + 1} / {total}
        </span>
        <a
          className={styles.lbOpen}
          href={images[index]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open original
        </a>
      </div>
    </div>,
    document.body,
  );
}
