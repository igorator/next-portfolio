"use client";

import { MdOutlineClear } from "react-icons/md";
import styles from "./FilterClearButton.module.css";

type FilterClearButtonProps = {
  onClear: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const FilterClearButton = ({
  onClear,
  disabled,
  loading = false,
}: FilterClearButtonProps) => {
  const { useTranslations } = require("next-intl");
  const t = useTranslations();

  return (
    <button
      type="button"
      className={`${styles.clearButton} ${loading ? styles.loading : ""}`}
      onClick={onClear}
      disabled={disabled || loading}
      title={t("projects.filters.clear", { default: "Clear filters" })}
    >
      <MdOutlineClear className={styles.clearIcon} aria-hidden="true" />
    </button>
  );
};
