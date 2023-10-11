import styles from "./StudentMatchLineItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faHandshake } from "@fortawesome/free-solid-svg-icons";
import type { StudentMatchLineItemProps } from "./StudentMatchLineItem.definitions";

const StudentMatchLineItem = ({
  student,
  selectStudent,
  isSelected,
  alreadyMatched = false,
}: StudentMatchLineItemProps) => (
  <div
    className={
      !alreadyMatched
        ? styles["match-line-item-container"]
        : styles["match-line-item-container-not-clickable"]
    }
    onClick={!alreadyMatched ? () => selectStudent(student) : undefined}
  >
    <div className={styles["match-line-item-container-left"]}>
      <div
        className={
          alreadyMatched
            ? styles["match-line-item-container-name-matched"]
            : styles["match-line-item-container-name"]
        }
      >
        {`${student.firstName} ${student.lastInitial}`}
        {isSelected && (
          <FontAwesomeIcon
            icon={faCirclePlus}
            className={styles["selected-student-icon"]}
          />
        )}
        {alreadyMatched && (
          <FontAwesomeIcon
            icon={faHandshake}
            className={styles["already-matched-student-icon"]}
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
