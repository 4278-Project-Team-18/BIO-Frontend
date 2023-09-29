import styles from "./VolunteerApprovalLineItem.module.css";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import type { VolunteerApprovalLineItemProps } from "./VolunteerApprovalLineItem.definitions";

const VolunteerApprovalLineItem = ({
  volunteer,
  onStatusChange,
}: VolunteerApprovalLineItemProps) => {
  const handleApprove = () => {
    volunteer.approvalStatus = "approved";
    onStatusChange(volunteer);
  };

  const handleDeny = () => {
    volunteer.approvalStatus = "denied";
    onStatusChange(volunteer);
  };

  return (
    <div className={styles["line-item-container"]}>
      <div className={styles["line-item-container-left"]}>
        <FontAwesomeIcon
          icon={faClock}
          className={styles["line-item-name-icon"]}
        />
        <div className={styles["line-item-name"]}>
          {`${volunteer.firstName} ${volunteer.lastName}`}
        </div>
      </div>
      <div className={styles["line-item-container-right"]}>
        <button
          className={styles["line-item-approve-button"]}
          onClick={handleApprove}
        >
          <div className={styles["line-item-button-title"]}>Approve</div>
          <FontAwesomeIcon
            icon={faCheck}
            className={styles["line-item-button-icon"]}
          />
        </button>
        <button
          className={styles["line-item-deny-button"]}
          onClick={handleDeny}
        >
          <div className={styles["line-item-button-title"]}>Deny</div>
          <FontAwesomeIcon
            icon={faClose}
            className={styles["line-item-button-icon"]}
          />
        </button>
      </div>
    </div>
  );
};

export default VolunteerApprovalLineItem;
