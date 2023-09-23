import styles from "./StudentLineItem.module.css";
import LineItemLabel from "../FileUploadedLabel/LineItemLabel";
import { LineItemLabelVariant } from "../FileUploadedLabel/LineItemLabel.definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import type { StudentLineItemProps } from "./StudentLineItem.definitions";

const StudentLineItem = ({
  student,
  index,
  maxIndex,
}: StudentLineItemProps) => {
  console.log("StudentLineItem");
  return (
    <div
      className={`${styles["line-item-container"]} ${
        index === 0
          ? styles["line-item-container-first"]
          : index === maxIndex - 1
          ? styles["line-item-container-last"]
          : ""
      }`}
    >
      <div className={styles["line-item-container-left"]}>
        <div className={styles["line-item-checkbox"]}>
          {student.studentLetterLink ? (
            <FontAwesomeIcon
              icon={faSquareCheck}
              className={styles["line-item-checkbox-checked"]}
            />
          ) : (
            <FontAwesomeIcon
              icon={faSquare}
              className={styles["line-item-checkbox-unchecked"]}
            />
          )}
        </div>
        <div
          className={styles["line-item-name"]}
        >{`${student.firstName} ${student.lastInitial}`}</div>
      </div>
      <div className={styles["line-item-container-right"]}>
        {student.studentLetterLink && (
          <LineItemLabel
            variant={LineItemLabelVariant.SUCCESS}
            label={" Student Letter"}
          />
        )}
        <button className={styles["line-item-upload-button"]}>
          <div className={styles["line-item-upload-title"]}>
            {student.studentLetterLink ? "Reupload" : "Upload Letter"}
          </div>
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className={styles["line-item-upload-icon"]}
          />
        </button>
      </div>
    </div>
  );
};

export default StudentLineItem;
