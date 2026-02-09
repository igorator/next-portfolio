import type { Locale } from "next-intl";

const VALID_LOCALES = new Set<string>(["en", "uk"]);

export function resolveLocale(raw: string | null | undefined): Locale {
  if (raw && VALID_LOCALES.has(raw)) return raw as Locale;
  return "en";
}
