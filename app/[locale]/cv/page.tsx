import type { Metadata } from "next";
import { CVSection } from "@/shared/components/pages/CV/CV";

export const metadata: Metadata = {
  title: "CV",
};

const cvFilePath = "/cv/cv_kliushnyk_frontend.pdf";

export default function CV() {
  return <CVSection cvFile={cvFilePath} />;
}
