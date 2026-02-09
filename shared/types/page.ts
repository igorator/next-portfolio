import type { Locale } from "next-intl";

export type LocaleParams = { locale: Locale };

export type LocalePageProps = {
  params: Promise<LocaleParams>;
};

export type SlugParams = { slug: string; locale: Locale };

export type SlugPageProps = {
  params: Promise<SlugParams>;
};
