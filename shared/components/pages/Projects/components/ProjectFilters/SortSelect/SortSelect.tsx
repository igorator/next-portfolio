"use client";

import * as Select from "@radix-ui/react-select";
import { useTranslations } from "next-intl";
import { BsCheckLg, BsChevronDown } from "react-icons/bs";

import styles from "./SortSelect.module.css";

export type SortKey = "newest" | "oldest" | "az" | "za";

const makeSortOptions = (t: ReturnType<typeof useTranslations>) =>
  [
    {
      id: "newest",
      name: t("projects.filters.options.newest", { default: "Newest First" }),
    },
    {
      id: "oldest",
      name: t("projects.filters.options.oldest", { default: "Oldest First" }),
    },
    { id: "az", name: t("projects.filters.options.az", { default: "A-Z" }) },
    { id: "za", name: t("projects.filters.options.za", { default: "Z-A" }) },
  ] as const satisfies ReadonlyArray<{ id: SortKey; name: string }>;

type Props = {
  value: SortKey;
  onChange: (val: SortKey) => void;
  disabled?: boolean;
  loading?: boolean;
};

export const SortSelect = ({
  value,
  onChange,
  disabled = false,
  loading = false,
}: Props) => {
  const t = useTranslations();
  const options = makeSortOptions(t);

  return (
    <Select.Root
      value={value}
      onValueChange={(v) => onChange(v as SortKey)}
      disabled={disabled || loading}
    >
      <Select.Trigger
        className={`${styles.selectTrigger} ${loading ? styles.loading : disabled ? styles.disabled : ""}`}
        disabled={disabled || loading}
        aria-label={t("projects.filters.sort", { default: "Sort by" })}
      >
        {loading ? (
          <span className={styles.skeletonText} aria-hidden />
        ) : (
          <Select.Value
            placeholder={t("projects.filters.sort", { default: "Sort by" })}
          >
            {options.find((o) => o.id === value)?.name}
          </Select.Value>
        )}
        <Select.Icon className={styles.selectIcon}>
          <BsChevronDown className={styles.chevronIcon} aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className={`${styles.selectContent} glass-card`}
          position="popper"
          sideOffset={8}
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
