import { useTranslations } from "next-intl";
import styles from "./Lightbox.module.css";

type LightboxToolbarProps = {
  title: string;
  index: number;
  total: number;
  imageUrl: string;
  onInteraction: (e: React.MouseEvent) => void;
};

export const LightboxToolbar = ({
  title,
  index,
  total,
  imageUrl,
  onInteraction,
}: LightboxToolbarProps) => {
  const t = useTranslations("projects_ui.lightbox");

  return (
    <div
      className={styles.toolbar}
      role="toolbar"
      onClick={onInteraction}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <span className={styles.caption}>{title}</span>
      <span className={styles.counter}>
        {index + 1} / {total}
      </span>
      <a
        className={styles.openOriginal}
        href={imageUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onInteraction}
      >
        {t("openOriginal")}
      </a>
    </div>
  );
};
