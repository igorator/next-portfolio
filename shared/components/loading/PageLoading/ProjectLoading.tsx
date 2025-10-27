import styles from "./ProjectLoading.module.css";

export default function ProjectLoading() {
  return (
    <div className={styles.wrap} aria-busy="true">
      <span className={styles.loader} />
    </div>
  );
}
