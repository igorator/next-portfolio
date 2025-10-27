import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { cache } from "react";
import { getEmployment } from "@/shared/api/employment/getEmployment";
import { EmploymentSection } from "@/shared/components/pages/Employment/Employment";

export const metadata: Metadata = {
  title: "Employment history",
};

export const revalidate = 3600;

const getEmploymentCached = cache(getEmployment);

type Params = { locale: Locale };
type Props = { params: Params | Promise<Params> };

export default async function Employment({ params }: Props) {
  const { locale } = await Promise.resolve(params);

  const employmentHistory = await getEmploymentCached(locale);

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
