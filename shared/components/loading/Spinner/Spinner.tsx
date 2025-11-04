"use client";

import type { CSSProperties } from "react";
import styles from "./Spinner.module.css";

type SpinnerProps = {
  size?: number | string; // e.g. 14, '16px', '1rem'
  className?: string;
};

export function Spinner({ size = 12, className }: SpinnerProps) {
  const fontSize: CSSProperties["fontSize"] =
    typeof size === "number" ? `${size}px` : size;

  return (
    // biome-ignore lint/a11y/useSemanticElements: <explanation>
    <span
      className={`${styles.wrap} ${className ?? ""}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.spinner} style={{ fontSize }} aria-busy="true" />
    </span>
  );
}

export default Spinner;
