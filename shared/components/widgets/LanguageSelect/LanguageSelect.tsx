"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { GlassSurface } from "../../ui/GlassSurface/GlassSurface";
import styles from "./LanguageSelect.module.css";

const localeLabels = { en: "English", uk: "Українська" } as const;

export function LanguageSelect() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <DropdownMenu.Root modal={false}>
      <GlassSurface>
        <DropdownMenu.Trigger
          className={styles.selectTrigger}
          aria-label="Language"
        >
          <div className={styles.selectLabel}>{locale.toUpperCase()}</div>
        </DropdownMenu.Trigger>
      </GlassSurface>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.selectContent}
          side="top"
          align="end"
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
