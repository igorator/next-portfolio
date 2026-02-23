"use client";

import * as Switch from "@radix-ui/react-switch";
import { useTranslations } from "next-intl";
import styles from "./CommercialSwitch.module.css";

type CommercialSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
};

export const CommercialSwitch = ({
  value,
  onChange,
  disabled = false,
  loading = false,
}: CommercialSwitchProps) => {
  const t = useTranslations();

  return (
    <div
      className={`${styles.commercialSwitch} ${loading ? styles.loading : disabled ? styles.disabled : ""}`}
    >
      {loading ? (
        <>
          <span className={styles.skeletonText} aria-hidden />
          <span className={styles.skeletonSwitch} aria-hidden />
        </>
      ) : (
        <>
          <span className={styles.text}>
            {t("projects_ui.onlyCommercialProjects", {
              default: "Commercial only",
            })}
          </span>
          <Switch.Root
            id="commercial-switch"
            checked={value}
            onCheckedChange={onChange}
            className={styles.switchRoot}
            disabled={disabled}
          >
            <Switch.Thumb className={styles.switchThumb} />
          </Switch.Root>
        </>
      )}
    </div>
  );
};
