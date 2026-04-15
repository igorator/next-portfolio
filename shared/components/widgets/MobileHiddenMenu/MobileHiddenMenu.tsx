"use client";

import { useEffect, useId } from "react";
import { useTranslations } from "next-intl";
import { BsX } from "react-icons/bs";
import { AppPortal } from "@/shared/components/layout/AppPortal/AppPortal";
import { LanguageSelect } from "../LanguageSelect/LanguageSelect";
import { Socials } from "../Socials/Socials";
import { ThemeSwitch } from "../ThemeSwitcher/ThemeSwitcher";
import styles from "./MobileHiddenMenu.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const MobileHiddenMenu: React.FC<Props> = ({ open, onClose }) => {
  const titleId = useId();
  const t = useTranslations("a11y");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    const body = document.body;
    if (open) body.setAttribute("data-scroll-locked", "true");
    else body.removeAttribute("data-scroll-locked");
    return () => body.removeAttribute("data-scroll-locked");
  }, [open]);

  if (!open) return null;

  return (
    <AppPortal>
      <button
        type="button"
        className={styles.layer}
        aria-label={t("closeMenu")}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.menu}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <LanguageSelect side="bottom" align="start" />
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label={t("closeMenu")}
          >
            <BsX className={styles.closeIcon} size={30} />
          </button>
        </div>

        <div className={styles.content}>
          <Socials vertical />
          <ThemeSwitch />
        </div>
      </div>
    </AppPortal>
  );
};
