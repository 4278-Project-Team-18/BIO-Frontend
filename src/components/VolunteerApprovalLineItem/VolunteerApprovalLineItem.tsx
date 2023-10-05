import styles from "./VolunteerApprovalLineItem.module.css";
import VolunteerUpdateApprovalStatus from "../VolunteerUpdateApprovalStatus/VolunteerUpdateApprovalStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import type { VolunteerApprovalLineItemProps } from "./VolunteerApprovalLineItem.definitions";

const VolunteerApprovalLineItem = ({
  volunteer,
}: VolunteerApprovalLineItemProps) => (
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
      <VolunteerUpdateApprovalStatus volunteer={volunteer} />
    </div>
  </div>
);

export default VolunteerApprovalLineItem;
