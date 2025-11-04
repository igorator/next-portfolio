"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import Spinner from "@/shared/components/loading/Spinner/Spinner";
import styles from "./AppLoading.module.css";

export function AppLoading() {
  const t = useTranslations("loading");

  return (
    <div
      className={styles.screen}
      aria-busy="true"
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.spinnerWrap}>
          <Spinner size={14} />
        </div>
      </motion.div>
    </div>
  );
}

export default AppLoading;
