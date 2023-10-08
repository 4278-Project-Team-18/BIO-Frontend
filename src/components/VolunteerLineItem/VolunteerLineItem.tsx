import styles from "./VolunteerLineItem.module.css";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { faHandshake } from "@fortawesome/free-regular-svg-icons";
import type { VolunteerLineItemProps } from "./VolunteerLineItem.definitions";

const VolunteerLineItem = ({
  volunteer,
  openModal,
}: VolunteerLineItemProps) => (
  <div className={styles["line-item-container"]}>
    <div className={styles["line-item-container-left"]}>
      <div className={styles["line-item-name-icon"]}>
        {!volunteer.matchedStudents?.length ? (
          <div className={styles["line-item-unmatched-status-icon"]} />
        ) : (
          <div className={styles["line-item-matched-status-icon"]} />
        )}
      </div>
      <div className={styles["line-item-name"]}>
        {`${volunteer.firstName} ${volunteer.lastName}`}
      </div>
    </div>
    <div className={styles["line-item-container-right"]}>
      <LoadingButton
        onClick={openModal}
        isLoading={false}
        text="Match"
        icon={faHandshake}
        variant={LoadingButtonVariant.BLUE}
      />
    </div>
  </div>
);

export default VolunteerLineItem;
