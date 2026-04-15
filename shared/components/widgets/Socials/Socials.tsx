import { LinkTooltip } from "@/shared/components/ui/LinkTooltip/LinkTooltip";
import { socials } from "@/shared/data/socials";
import styles from "./Socials.module.css";

type SocialsProps = {
  vertical?: boolean;
};

export const Socials: React.FC<SocialsProps> = ({ vertical }) => {
  return (
    <div className={`${styles.socialBar} ${vertical ? styles.vertical : ""}`}>
      {Object.entries(socials).map(([key, { url, icon: Icon, label }]) => {
        const href = url.startsWith("http") ? url : `mailto:${url}`;
        const target = url.startsWith("http") ? "_blank" : undefined;

        if (vertical) {
          return (
            <a
              key={key}
              href={href}
              target={target}
              rel="noopener noreferrer"
              className={styles.iconLink}
              aria-label={label}
            >
              <Icon className={styles.icon} />
              <span className={styles.label}>{label}</span>
            </a>
          );
        }

        return (
          <LinkTooltip
            key={key}
            label={label}
            trigger={
              <a
                href={href}
                target={target}
                rel="noopener noreferrer"
                className={styles.iconLink}
                aria-label={label}
              >
                <Icon className={styles.icon} />
              </a>
            }
          />
        );
      })}
    </div>
  );
};
