import styles from "./TeacherApprovalLineItem.module.css";
import TeacherUpdateApprovalStatus from "../TeacherUpdateApprovalStatus/TeacherUpdateApprovalStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import type { TeacherApprovalLineItemProps } from "./TeacherApprovalLineItem.definitions";

const TeacherApprovalLineItem = ({ teacher }: TeacherApprovalLineItemProps) => (
  <div className={styles["line-item-container"]}>
    <div className={styles["line-item-container-left"]}>
      <FontAwesomeIcon
        icon={faClock}
        className={styles["line-item-name-icon"]}
      />
      <div className={styles["line-item-name"]}>
        {`${teacher.firstName} ${teacher.lastName}`}
      </div>
    </div>
    <div className={styles["line-item-container-right"]}>
      <TeacherUpdateApprovalStatus teacher={teacher} />
    </div>
  </div>
);

export default TeacherApprovalLineItem;
