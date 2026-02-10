"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MdMenu } from "react-icons/md";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { MobileHiddenMenu } from "../MobileHiddenMenu";
import styles from "./MobileHiddenMenuButton.module.css";

export const MobileHiddenMenuButton = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("a11y");

  return (
    <>
      <GlassSurface className={styles.hiddenMenuButtonWrapper}>
        <button
          type="button"
          className={styles.hiddenMenuButton}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={t("openMenu")}
          onClick={() => setOpen(true)}
        >
          <MdMenu size={20} />
        </button>
      </GlassSurface>

      <MobileHiddenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};
