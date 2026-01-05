"use client";

import { cubicBezier, motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import { Section } from "@/shared/components/layout/Section/Section";
import { GlassSurface } from "@/shared/components/ui/GlassSurface/GlassSurface";
import { routes } from "@/shared/config/routes";
import styles from "./Home.module.css";

const getHeroLinks = (t: ReturnType<typeof useTranslations>) => ({
  projects: { label: t("navigation.projects"), href: routes.projects.path },
  employment: {
    label: t("navigation.employment"),
    href: routes.employment.path,
  },
  cv: { label: t("navigation.cv"), href: routes.cv.path },
});

const titleContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const titleLine: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

const buttonsWrap: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.1,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  },
};

export const HomeSection = () => {
  const t = useTranslations();
  const heroLinks = getHeroLinks(t);

  return (
    <Section className={styles.home}>
      <div className={styles.content}>
        <motion.h1
          className={styles.title}
          variants={titleContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <motion.span className={styles.fade} variants={titleLine}>
            {t("home.greeting")}
          </motion.span>
          <motion.span className={styles.name} variants={titleLine}>
            {t("home.introduction")}
          </motion.span>
          <motion.span className={styles.role} variants={titleLine}>
            {t("home.role")}
          </motion.span>
        </motion.h1>

        <motion.div
          variants={buttonsWrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          className={styles.homeLinksWrapper}
        >
          <GlassSurface>
            <div className={styles.buttons}>
              {Object.values(heroLinks).map(({ href, label }) => (
                <Link key={href} href={href} className={styles.btn}>
                  <span>{label}</span> <BsArrowRight />
                </Link>
              ))}
            </div>
          </GlassSurface>
        </motion.div>
      </div>
    </Section>
  );
};
