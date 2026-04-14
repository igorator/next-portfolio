"use client";

import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Spinner } from "@/shared/components/loading/Spinner/Spinner";
import layout from "../../Project.module.css";
import styles from "./ImageCard.module.css";

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
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.28 },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -40 : 40,
    opacity: 0,
    filter: "blur(6px)",
    transition: { ease: [0.22, 1, 0.36, 1], duration: 0.24 },
  }),
};

type Props = {
  images: string[];
  idx: number;
  dir: number;
  hasMany: boolean;
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
  onOpenLightbox: (startAt?: number) => void;
};

export function ImageCard({
  images,
  idx,
  dir,
  hasMany,
  title,
  onPrev,
  onNext,
  onGoTo,
  onOpenLightbox,
}: Props) {
  const t = useTranslations("projects_ui");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, [idx]);

  return (
    <motion.article className={`${layout.card} ${layout.imageCard}`}>
      {images.length === 0 ? (
        <div
          className={styles.emptyState}
          role="img"
          aria-label={t("noImages")}
        >
          <span>{t("noImages")}</span>
        </div>
      ) : (
        <div className={styles.imageWrapper}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <Spinner size={16} />
            </div>
          )}
          <motion.button
            type="button"
            key={images[idx]}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.imageButton}
            onClick={() => onOpenLightbox(idx)}
            aria-label={t("openImageAria")}
          >
            <Image
              className={styles.image}
              src={images[idx]}
              alt={t("imageAltCover", { title })}
              fill
              sizes="(min-width: 980px) 66vw, 100vw"
              priority
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNSIgZmlsbD0iI2NjYyIgLz4="
              onLoad={() => setLoading(false)}
            />
            <div className={styles.imageGradient} aria-hidden />
          </motion.button>

          {hasMany && (
            <>
              <button
                type="button"
                className={`${styles.navigationButton} ${styles.previousButton}`}
                aria-label={t("previousImageAria")}
                onClick={onPrev}
              >
                <BsArrowLeft />
              </button>
              <button
                type="button"
                className={`${styles.navigationButton} ${styles.nextButton}`}
                aria-label={t("nextImageAria")}
                onClick={onNext}
              >
                <BsArrowRight />
              </button>

              <div className={styles.indicators}>
                {images.map((src, i) => (
                  <button
                    key={`${src}-dot`}
                    type="button"
                    className={`${styles.indicator} ${
                      i === idx ? styles.indicatorActive : ""
                    }`}
                    aria-label={t("goToImageAria", { index: i + 1 })}
                    onClick={() => onGoTo(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </motion.article>
  );
}

export default ImageCard;
