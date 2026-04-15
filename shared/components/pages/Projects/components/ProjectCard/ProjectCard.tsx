"use client";

import { useFormatter, useTranslations } from "next-intl";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "@/i18n/navigation";
import { ProjectCardTooltip } from "./ProjectCardTooltip/ProjectCardTooltip";
import styles from "./ProjectCard.module.css";

export type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  date?: string;
  technologies?: Array<{ id: string; name: string; color?: string }>;
  githubUrl?: string | null;
  demoUrl?: string | null;
  isCommercial?: boolean;
  isHighlighted?: boolean;
  onTechnologyClick?: (techId: string) => void;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  slug,
  title,
  description,
  type,
  category,
  date,
  technologies,
  githubUrl,
  demoUrl,
  isCommercial,
  isHighlighted,
  onTechnologyClick,
}) => {
  const t = useTranslations();
  const format = useFormatter();

  const formatDate = (dateStr: string) => {
    const [year, month] = dateStr.split("-").map(Number);
    return format.dateTime(new Date(year, month - 1, 1), {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className={`${styles.projectCard}${isHighlighted ? ` ${styles.highlighted}` : ""}`}
    >
      {(date || isCommercial) && (
        <div className={styles.meta}>
          {date ? (
            <time className={styles.date} dateTime={date}>
              {formatDate(date)}
            </time>
          ) : (
            <span />
          )}
          <ProjectCardTooltip isCommercial={isCommercial} />
        </div>
      )}

      <h3 className={styles.title}>{title}</h3>

      <div className={styles.typesBadges}>
        <span className={`${styles.badge} ${styles.badgeType}`} title={type}>
          {type}
        </span>
        <span
          className={`${styles.badge} ${styles.badgeType}`}
          title={category}
        >
          {category}
        </span>
      </div>

      <p className={styles.description} title={description}>
        {description}
      </p>

      {!!technologies?.length && (
        <div className={styles.technologies}>
          {technologies.map((tech) => (
            <button
              key={tech.id}
              className={styles.tech}
              style={{
                color: tech.color,
                background: `color-mix(in srgb, ${tech.color} 12%, transparent)`,
                borderColor: `color-mix(in srgb, ${tech.color} 42%, transparent)`,
              }}
              onClick={() => onTechnologyClick?.(tech.id)}
              type="button"
              title={tech.name}
            >
              {tech.name}
            </button>
          ))}
        </div>
      )}

      <div className={styles.cardFooter}>
        <div className={styles.links}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              {t("projects_ui.links.github", { default: "GitHub" })}
            </a>
          )}
          {demoUrl && (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              {t("projects_ui.links.liveDemo", { default: "Live demo" })}
            </a>
          )}
        </div>

        <Link href={`/projects/${slug}`} rel="noopener noreferrer">
          <BsArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};
