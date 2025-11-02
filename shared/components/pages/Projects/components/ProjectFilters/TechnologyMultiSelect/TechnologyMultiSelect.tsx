"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";
import type { Technology } from "@/shared/types/technology";
import styles from "./TechnologyMultiSelect.module.css";

type Props = {
  technologies: Technology[];
  selectedTechnologies: string[];
  onToggle: (id: string) => void;
};

export const TechnologyMultiSelect = ({
  technologies,
  selectedTechnologies,
  onToggle,
}: Props) => {
  const { useTranslations } = require("next-intl");
  const t = useTranslations();

  const triggerLabel =
    selectedTechnologies.length === 0
      ? t("projects.filters.selected", { count: 0 })
      : selectedTechnologies.length === 1
        ? (technologies.find((tec) => tec.id === selectedTechnologies[0])
            ?.name ?? t("projects.filters.selected", { count: 1 }))
        : t("projects.filters.selected", {
            count: selectedTechnologies.length,
          });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className={`${styles.triggerButton}`}>
        <span className={styles.triggerLabel}>{triggerLabel}</span>
        <BsChevronDown className={styles.chevronIcon} aria-hidden />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${styles.menuContent}`}
          sideOffset={20}
          align="start"
        >
          {technologies.map((t) => {
            const checked = selectedTechnologies.includes(t.id);
            return (
              <DropdownMenu.CheckboxItem
                key={t.id}
                checked={checked}
                onCheckedChange={() => onToggle(t.id)}
                onSelect={(e) => e.preventDefault()}
                className={styles.menuItem}
              >
                <span className={styles.menuItemLabel}>{t.name}</span>
                <span className={styles.menuItemHint}>{t.category}</span>
                <span className={styles.rightSlot}>
                  <DropdownMenu.ItemIndicator>
                    <BsCheckLg className={styles.checkIcon} aria-hidden />
                  </DropdownMenu.ItemIndicator>
                </span>
              </DropdownMenu.CheckboxItem>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
