import styles from "./ConfirmationModal.module.css";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import type { ConfirmationModalProps } from "./ConfirmationModal.definitions";

const ConfirmationModal = ({
  closeModal,
  title,
  subtitle,
  confirmText,
  confirmIcon,
  action,
  isLoading = false,
  confirmColor,
}: ConfirmationModalProps) => {
  console.log("ConfirmationModal");
  return (
    <div className={styles["confirmation-backdrop"]}>
      <div className={styles["confirmation-container"]}>
        <div className={styles["confirmation-header"]}>
          <button
            className={styles["confirmation-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        </div>
        <div className={styles.confirmationTitle}>{title}</div>
        <div className={styles.confirmationSubtitle}>{subtitle}</div>
        <LoadingButton
          onClick={action}
          isLoading={isLoading}
          text={confirmText}
          icon={confirmIcon}
          variant={confirmColor}
          isResponsive={false}
        />
      </div>
    </div>
  );
};

export default ConfirmationModal;
