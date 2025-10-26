import type { Metadata } from "next";
import { HomeSection } from "@/shared/components/pages/Home/Home";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return <HomeSection />;
}
