"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./LanguageSelect.module.css";

const localeLabels = { en: "English", uk: "Українська" } as const;

type Props = {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
};

export function LanguageSelect({ side = "top", align = "end" }: Props) {
  const locale = useLocale();
  const t = useTranslations("a11y");
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        className={styles.selectTrigger}
        aria-label={t("language")}
      >
        <div className={styles.selectLabel}>{locale.toUpperCase()}</div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.selectContent}
          side={side}
          align={align}
          sideOffset={12}
        >
          {routing.locales.map((loc) => (
            <DropdownMenu.Item
              key={loc}
              className={styles.selectItem}
              onSelect={() => onChange(loc)}
              data-state={locale === loc ? "checked" : "unchecked"}
            >
              {localeLabels[loc]}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
