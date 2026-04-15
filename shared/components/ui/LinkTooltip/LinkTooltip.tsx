import type { ReactNode } from "react";
import styles from "./LinkTooltip.module.css";

type LinkTooltipProps = {
  label: string;
  trigger: ReactNode;
  className?: string;
};

export const LinkTooltip = ({
  label,
  trigger,
  className,
}: LinkTooltipProps) => (
  <div className={`${styles.wrapper} ${className ?? ""}`}>
    {trigger}
    <span className={styles.tooltip}>{label}</span>
  </div>
);
