import type { Metadata } from "next";
import { getEmployment } from "@/shared/api/employment/getEmployment";
import { EmploymentSection } from "@/shared/components/pages/Employment/Employment";

export const metadata: Metadata = {
  title: "Employment history",
};

export default async function Employment({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const employmentHistory = await getEmployment(locale);

  return <EmploymentSection employmentHistory={employmentHistory} />;
}
