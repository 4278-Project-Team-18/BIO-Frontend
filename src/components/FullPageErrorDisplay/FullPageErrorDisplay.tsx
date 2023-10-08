import styles from "./FullPageErrorDisplay.module.css";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import type { FullPageErrorDisplayProps } from "./FullPageErrorDisplay.definitions";

const FullPageErrorDisplay = ({
  errorText = "Uh oh! Something went wrong.",
  refetch,
  refetchText = "Try again",
}: FullPageErrorDisplayProps) => (
  <div className={styles["full-page-error"]}>
    <p className={styles["full-page-error-text"]}>{errorText}</p>
    {refetch && (
      <LoadingButton
        text={refetchText}
        icon={faRotateLeft}
        isLoading={false}
        variant={LoadingButtonVariant.YELLOW}
        onClick={refetch}
      />
    )}
  </div>
);

export default FullPageErrorDisplay;
