"use client";

import * as Switch from "@radix-ui/react-switch";
import { useTranslations } from "next-intl";
import styles from "./CommercialSwitch.module.css";

type CommercialSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
};

export const CommercialSwitch = ({
  value,
  onChange,
  disabled = false,
}: CommercialSwitchProps) => {
  const t = useTranslations();

  return (
    <div
      className={`${styles.commercialSwitch} ${disabled ? styles.disabled : ""}`}
    >
      <span className={styles.text}>
        {t("projects_ui.onlyCommercialProjects")}
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
    </div>
  );
};
