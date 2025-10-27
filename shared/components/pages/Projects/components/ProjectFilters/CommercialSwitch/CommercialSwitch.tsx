"use client";

import * as Switch from "@radix-ui/react-switch";
import { useTranslations } from "next-intl";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import styles from "./CommercialSwitch.module.css";

type CommercialSwitchProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export const CommercialSwitch = ({
  value,
  onChange,
}: CommercialSwitchProps) => {
  const t = useTranslations();

  return (
    <GlassSurface className={styles.wrapper}>
      <div className={styles.commercialSwitch}>
        <span className={styles.text}>
          {t("projects_ui.onlyCommercialProjects")}
        </span>
        <Switch.Root
          id="commercial-switch"
          checked={value}
          onCheckedChange={onChange}
          className={styles.switchRoot}
        >
          <Switch.Thumb className={styles.switchThumb} />
        </Switch.Root>
      </div>
    </GlassSurface>
  );
};
