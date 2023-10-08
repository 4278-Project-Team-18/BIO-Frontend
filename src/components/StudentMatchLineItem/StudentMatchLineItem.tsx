import styles from "./StudentMatchLineItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import type { StudentMatchLineItemProps } from "./StudentMatchLineItem.definitions";

const StudentMatchLineItem = ({
  student,
  selectStudent,
  isSelected,
}: StudentMatchLineItemProps) => (
  <div
    className={styles["match-line-item-container"]}
    onClick={() => selectStudent(student)}
  >
    <div className={styles["match-line-item-container-left"]}>
      <div className={styles["match-line-item-container-name"]}>
        {`${student.firstName} ${student.lastInitial}`}
        {isSelected && (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className={styles["selected-student-icon"]}
          />
        )}
      </div>
    </div>
    <div className={styles["match-line-item-container-right"]}>
      <span className={styles["match-line-item-reading-label"]}>
        {`Reading Level: ${student.readingLevel}`}
      </span>
    </div>
  </div>
);

export default StudentMatchLineItem;
