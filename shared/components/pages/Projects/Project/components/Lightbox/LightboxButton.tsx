import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import styles from "./Lightbox.module.css";

type LightboxButtonProps = {
  variant: "previous" | "next" | "close";
  ariaLabel: string;
  onClick: (e: React.MouseEvent) => void;
  onPointerDown: (e: React.PointerEvent) => void;
};

const icons = {
  previous: BsArrowLeft,
  next: BsArrowRight,
  close: MdClose,
};

const variantClass = {
  previous: styles.previousButton,
  next: styles.nextButton,
  close: styles.closeButton,
};

export const LightboxButton = ({
  variant,
  ariaLabel,
  onClick,
  onPointerDown,
}: LightboxButtonProps) => {
  const Icon = icons[variant];

  return (
    <button
      type="button"
      className={`${styles.controlButton} ${variantClass[variant]}`}
      aria-label={ariaLabel}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      <Icon />
    </button>
  );
};
