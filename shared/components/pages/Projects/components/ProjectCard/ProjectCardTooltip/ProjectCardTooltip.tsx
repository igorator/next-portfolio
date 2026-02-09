"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { useTranslations } from "next-intl";
import { FiDollarSign } from "react-icons/fi";
import styles from "./ProjectCardTooltip.module.css";

type ProjectCardTooltipProps = {
  isCommercial?: boolean;
};

export const ProjectCardTooltip = ({
  isCommercial,
}: ProjectCardTooltipProps) => {
  const t = useTranslations();

  if (!isCommercial) return null;

  return (
    <Tooltip.Provider delayDuration={150}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className={styles.commercialBadge}>
            <FiDollarSign size={16} aria-label="Commercial project" />
          </div>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            className={styles.tooltipContent}
            side="top"
            sideOffset={6}
          >
            {t("projects_ui.commercial", { default: "Commercial project" })}
            <Tooltip.Arrow className={styles.tooltipArrow} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
