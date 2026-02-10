import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import styles from "./Lightbox.module.css";

export const Lightbox = ({
  images,
  index,
  setIndex,
  onClose,
  title,
}: {
  images: string[];
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  onClose: () => void;
  title: string;
}) => {
  const t = useTranslations("projects_ui.lightbox");
  const total = images.length;

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = (i + delta) % total;
        return next < 0 ? next + total : next;
      });
    },
    [setIndex, total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  const stop = (e: React.PointerEvent | React.MouseEvent) =>
    e.stopPropagation();

  return createPortal(
    <div
      className={styles.lbRoot}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbClose}`}
        aria-label={t("closeAria")}
        onClick={onClose}
        onPointerDown={stop}
      >
        <MdClose />
      </button>

      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbPrev}`}
        aria-label={t("previousAria")}
        onClick={(e) => {
          e.stopPropagation();
          go(-1);
        }}
        onPointerDown={stop}
      >
        <BsArrowLeft />
      </button>

      <button
        type="button"
        className={`${styles.lbBtn} ${styles.lbNext}`}
        aria-label={t("nextAria")}
        onClick={(e) => {
          e.stopPropagation();
          go(1);
        }}
        onPointerDown={stop}
      >
        <BsArrowRight />
      </button>

      <div className={styles.lbStage} aria-live="polite">
        <div className={styles.lbFigure}>
          <Image
            key={images[index]}
            src={images[index]}
            alt={t("imageAlt", { title, current: index + 1, total })}
            fill
            sizes="100vw"
            className={styles.lbImg}
            priority
            onClick={onClose}
          />
        </div>
      </div>

      <div
        className={styles.lbMeta}
        role="toolbar"
        onClick={stop}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <span className={styles.lbCaption}>{title}</span>
        <span className={styles.lbCount}>
          {index + 1} / {total}
        </span>
        <a
          className={styles.lbOpen}
          href={images[index]}
          target="_blank"
          rel="noopener noreferrer"
          onClick={stop}
        >
          {t("openOriginal")}
        </a>
      </div>
    </div>,
    document.body,
  );
};
