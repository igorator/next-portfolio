"use client";

import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { MobileHiddenMenu } from "../MobileHiddenMenu";
import styles from "./MobileHiddenMenuButton.module.css";

export const MobileHiddenMenuButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <GlassSurface className={styles.hiddenMenuButtonWrapper}>
        <button
          type='button'
          className={styles.hiddenMenuButton}
          aria-haspopup='dialog'
          aria-expanded={open}
          aria-label='Open menu'
          onClick={() => setOpen(true)} // открываем меню
        >
          <MdMenu size={20} />
        </button>
      </GlassSurface>

      <MobileHiddenMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};
