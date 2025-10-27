"use client";

import { MdOutlineClear } from "react-icons/md";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import styles from "./FilterClearButton.module.css";

type FilterClearButtonProps = {
  onClear: () => void;
  disabled?: boolean;
};

export const FilterClearButton = ({
  onClear,
  disabled,
}: FilterClearButtonProps) => {
  const { useTranslations } = require("next-intl");
  const t = useTranslations();

  return (
    <GlassSurface className={styles.clearButtonWrapper}>
      <button
        type="button"
        className={`${styles.clearButton}`}
        onClick={onClear}
        disabled={disabled}
        title={t("projects.filters.clear")}
      >
        <MdOutlineClear className={styles.clearIcon} aria-hidden="true" />
      </button>
    </GlassSurface>
  );
};
