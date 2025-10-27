import { socials } from "@/shared/data/socials";
import styles from "./Socials.module.css";
import { GlassSurface } from "../../ui/GlassSurface/GlassSurface";

export const Socials: React.FC = () => {
  return (
    <GlassSurface className={styles.socialBarWrapper}>
      <div className={styles.socialBar}>
        {Object.entries(socials).map(([key, { url, icon: Icon }]) => (
          <a
            key={key}
            href={url.startsWith("http") ? url : `mailto:${url}`}
            target={url.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={styles.iconLink}
            aria-label={key}
          >
            <Icon className={styles.icon} />
          </a>
        ))}
      </div>
    </GlassSurface>
  );
};
