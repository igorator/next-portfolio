"use client";

import * as Select from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";

import styles from "./SortSelect.module.css";

export type SortKey = "newest" | "oldest" | "az" | "za";

const makeSortOptions = (t: ReturnType<typeof useTranslations>) =>
  [
    { id: "newest", name: t("projects.filters.options.newest") },
    { id: "oldest", name: t("projects.filters.options.oldest") },
    { id: "az", name: t("projects.filters.options.az") },
    { id: "za", name: t("projects.filters.options.za") },
  ] as const satisfies ReadonlyArray<{ id: SortKey; name: string }>;

type Props = {
  value: SortKey;
  onChange: (val: SortKey) => void;
  disabled?: boolean;
};

export const SortSelect = ({ value, onChange, disabled = false }: Props) => {
  const t = useTranslations();
  const options = makeSortOptions(t);

  return (
    <Select.Root
      value={value}
      onValueChange={(v) => onChange(v as SortKey)}
      disabled={disabled}
    >
      <Select.Trigger
        className={`${styles.selectTrigger} ${disabled ? styles.disabled : ""}`}
        disabled={disabled}
        aria-label={t("projects.filters.sort")}
      >
        <Select.Value placeholder={t("projects.filters.sort")} />
        <Select.Icon className={styles.selectIcon}>
          <BsChevronDown className={styles.chevronIcon} aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={`${styles.selectContent} glass-wrapper`}
          position="popper"
          sideOffset={20}
          align="start"
        >
          <Select.Viewport className={styles.selectViewport}>
            {options.map((opt) => (
              <Select.Item
                key={opt.id}
                value={opt.id}
                className={styles.selectItem}
              >
                <Select.ItemText>{opt.name}</Select.ItemText>
                <Select.ItemIndicator className={styles.selectCheck}>
                  <BsCheckLg aria-hidden="true" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
