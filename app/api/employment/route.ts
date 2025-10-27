import { NextResponse } from "next/server";
import type { Locale } from "next-intl";

import employmentBase from "@/server/data/employment/employment_base.json";
import employmentEn from "@/server/data/employment/employment_en.json";
import employmentUk from "@/server/data/employment/employment_uk.json";

import type { Employment } from "@/shared/types";

type LocalizedMap = Record<string, { type: string; roles: string[] }>;

const EMPLOYMENT_BY_LANG: Record<Locale, LocalizedMap> = {
  en: employmentEn as LocalizedMap,
  uk: employmentUk as LocalizedMap,
} as const;

function mergeEmployment(locale: Locale): Employment[] {
  const map = EMPLOYMENT_BY_LANG[locale] ?? EMPLOYMENT_BY_LANG.en;
  const enMap = EMPLOYMENT_BY_LANG.en;

  // сохраняем порядок из базы
  return employmentBase.map((baseItem) => {
    const loc = map[baseItem.id] ?? enMap[baseItem.id];

    return {
      ...baseItem,
      type: loc?.type ?? "unknown",
      roles: loc?.roles ?? [],
    } as Employment;
  });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") as Locale) || "en";

  const employment = mergeEmployment(locale);
  return NextResponse.json(employment);
}
