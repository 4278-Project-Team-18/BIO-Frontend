import styles from "./StudentLineItem.module.css";
import LineItemLabel from "../FileUploadedLabel/LineItemLabel";
import { LineItemLabelVariant } from "../FileUploadedLabel/LineItemLabel.definitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faLink,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquare,
  faSquareCheck,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { MoonLoader } from "react-spinners";
import { toast } from "react-toastify";
import type { StudentLineItemProps } from "./StudentLineItem.definitions";

const StudentLineItem = ({
  student,
  openEditModal,
  openUploadLetterModal,
  removeStudentFromClass,
  removeStudentLoading = false,
  openViewLetterModal,
  openResponseLetterModal,
}: StudentLineItemProps) => (
  <div className={styles["line-item-container"]}>
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
      <div className={styles["line-item-student-info"]}>
        <div
          className={styles["line-item-name"]}
        >{`${student.firstName} ${student.lastInitial}`}</div>
        <div
          className={styles["line-item-reading-level"]}
        >{`Reading level: ${student.readingLevel}`}</div>
      </div>
    </div>
    <div className={styles["line-item-container-right"]}>
      {student?.assignedBookLink && (
        <LineItemLabel
          variant={LineItemLabelVariant.GREY}
          label={""}
          icon={faLink}
          onClick={() => {
            navigator.clipboard.writeText(student.assignedBookLink || "");
            toast.success("Copied link to clipboard!", {
              position: "bottom-center",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }}
        />
      )}
      {student.studentLetterLink && (
        <LineItemLabel
          variant={LineItemLabelVariant.GREEN}
          label={" Student Letter"}
          icon={faCircleCheck}
          onClick={() => openViewLetterModal(student)}
        />
      )}
      {student.volunteerLetterLink && (
        <LineItemLabel
          variant={LineItemLabelVariant.PURPLE}
          label={" Volunteer Letter"}
          icon={faCircleCheck}
          onClick={() => openResponseLetterModal(student)}
        />
      )}
      <button
        className={styles["line-item-upload-button"]}
        onClick={() => openUploadLetterModal(student)}
      >
        <div className={styles["line-item-upload-title"]}>
          {student.studentLetterLink ? "Reupload" : "Upload"}
        </div>
        <FontAwesomeIcon
          icon={faCloudArrowUp}
          className={styles["line-item-upload-icon"]}
        />
      </button>
      <div className={styles["line-item-actions"]}>
        <button
          className={styles["line-item-edit-button"]}
          onClick={() => openEditModal(student._id)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </button>
        {removeStudentLoading ? (
          <div className={styles["line-item-remove-button-spinner"]}>
            <MoonLoader color="#434343" size={16} />
          </div>
        ) : (
          <button
            className={styles["line-item-remove-button"]}
            onClick={() => removeStudentFromClass(student._id)}
            id={`line-item-remove-button-${student.firstName}-${student.lastInitial}`}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default StudentLineItem;
