import type { Metadata } from "next";
import { CVSection } from "@/shared/components/pages/CV/CV";

export const metadata: Metadata = {
  title: "CV",
};

const cvFile = "/cv/CV_Kliushnyk_Frontend.pdf";

export default function CV() {
  return <CVSection cvFile={cvFile} />;
}
