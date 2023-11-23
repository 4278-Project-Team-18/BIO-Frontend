import styles from "./NotApprovedDispay.module.css";
import { ApprovalStatus } from "../../interfaces/User.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import type { NotApprovedDisplayProps } from "./NotApprovedDisplay.definitions";

const NotApprovedDisplay = ({ status }: NotApprovedDisplayProps) => {
  console.log(status);
  return (
    <div className={styles["not-approved-container"]}>
      {status === ApprovalStatus.PENDING ? (
        <div>
          <FontAwesomeIcon icon={faHourglass} className={styles.icon} />
          <div className={styles["not-approved-title"]}>
            {"Hey there! Your account is pending approval."}
          </div>
          <div className={styles["not-approved-subtitle"]}>
            {"We'll let you know when you're approved."}
          </div>
        </div>
      ) : (
        <div>
          <FontAwesomeIcon icon={faCircleXmark} className={styles.icon} />
          <div className={styles["not-approved-title"]}>
            {"Uh oh! Your application was rejected."}
          </div>
          <div className={styles["not-approved-subtitle"]}>
            {"Please contact the BIO club if you think this was a mistake."}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotApprovedDisplay;
