"use client";

import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useRouter } from "@/i18n/navigation";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import type { Technology } from "@/shared/types/technology";
import { Lightbox } from "./components/Lightbox/Lightbox";
import { OverviewCard } from "./components/OverviewCard/OverviewCard";
import { StackCard } from "./components/StackCard/StackCard";
import { LinksCard } from "./components/LinksCard/LinksCard";
import { ImageCard } from "./components/ImageCard/ImageCard";
import { DescriptionCard } from "./components/DescriptionCard/DescriptionCard";
import styles from "./Project.module.css";

type ProjectSectionProps = {
  title: string;
  description: string;
  type: string;
  category: string;
  date: string;
  cover: string;
  technologies: Technology[];
  githubUrl?: string | null;
  demoUrl?: string | null;
  screens?: string[];
};

const ease = [0.22, 1, 0.36, 1] as const;

const cardsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

// Sub-cards define their own animation variants; keep only container here

export function ProjectSection({
  title,
  description,
  type,
  category,
  date,
  cover,
  technologies,
  githubUrl,
  demoUrl,
  screens = [],
}: ProjectSectionProps) {
  const t = useTranslations("projects_ui");
  const router = useRouter();

  const images = useMemo(
    () => [cover, ...screens].filter(Boolean),
    [cover, screens],
  );

  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasMany = images.length > 1;

  const goTo = (next: number) => {
    if (!hasMany) return;
    const n = (next + images.length) % images.length;
    setDir(next > idx || (idx === images.length - 1 && next === 0) ? 1 : -1);
    setIdx(n);
  };
  const next = () => goTo(idx + 1);
  const prev = () => goTo(idx - 1);

  const openLightbox = (startAt = idx) => {
    setIdx(startAt);
    setLightboxOpen(true);
  };

  return (
    <Section className={styles.wrap}>
      <div className={styles.topbar}>
        <GlassSurface>
          <Link
            href={routes.projects.path}
            className={styles.back}
            aria-label={t("backToProjectsAria")}
            onClick={(e) => {
              e.preventDefault();
              if (typeof window !== "undefined") {
                const ref = document.referrer;
                if (ref) {
                  try {
                    const prev = new URL(ref);
                    if (prev.origin === window.location.origin) {
                      router.back();
                      return;
                    }
                  } catch {}
                }
              }
              router.push(routes.projects.path);
            }}
          >
            <BsArrowLeft aria-hidden size={16} />
            <span>{t("back")}</span>
          </Link>
        </GlassSurface>
      </div>

      <motion.section
        className={styles.cardsGrid}
        variants={cardsContainer}
        initial="hidden"
        animate="show"
        transition={{ ease }}
      >
        <OverviewCard title={title} type={type} category={category} date={date} />

        <StackCard technologies={technologies} />

        <LinksCard demoUrl={demoUrl} githubUrl={githubUrl} />

        <ImageCard
          images={images}
          idx={idx}
          dir={dir}
          hasMany={hasMany}
          title={title}
          onPrev={prev}
          onNext={next}
          onGoTo={goTo}
          onOpenLightbox={openLightbox}
        />

        <DescriptionCard description={description} />
      </motion.section>

      {lightboxOpen && images.length > 0 && (
        <Lightbox
          images={images}
          index={idx}
          setIndex={setIdx}
          onClose={() => setLightboxOpen(false)}
          title={title}
        />
      )}
    </Section>
  );
}
