import styles from "./StudentTile.module.css";
import FullPageLoadingIndicator from "../FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../FullPageErrorDisplay/FullPageErrorDisplay";
import { useCustomFetch } from "../../api/request.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
  faEye,
  faSquare,
  faSquareCheck,
} from "@fortawesome/free-regular-svg-icons";
import type { StudentTileProps } from "./StudentTile.definitions";
import type { Class } from "../../interfaces/User.interface";

const StudentTile = ({
  student,
  openViewStudentLetterModal,
  openVolunteerLetterModal,
  openBookSelectionModal,
}: StudentTileProps) => {
  const {
    data: classData,
    loading: classLoading,
    error: classError,
    makeRequest: makeClassRequest,
  } = useCustomFetch<Class[]>(`/class/`);

  if (classLoading) {
    return <FullPageLoadingIndicator />;
  }

  if (classError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeClassRequest}
      />
    );
  }

  const studentClass = classData?.filter(
    (classItem) =>
      classItem?.students?.map((student) => student._id).includes(student._id),
  )[0];

  return (
    <div className={styles["student-tile-container"]}>
      <div className={styles["student-tile-student-info"]}>
        <div className={styles["student-tile-name"]}>
          {student.firstName} {student.lastInitial}
        </div>
        <div className={styles["student-tile-class"]}>
          Class: {studentClass?.name}
        </div>
        <div className={styles["student-tile-reading-level"]}>
          Reading level: {student.readingLevel}
        </div>
      </div>
      <div className={styles["student-tile-buttons"]}>
        <div className={styles["student-tile-action"]}>
          <div className={styles["student-tile-action-checkbox"]}>
            {student.studentLetterLink ? (
              <FontAwesomeIcon
                icon={faSquareCheck}
                className={styles["student-tile-action-checkbox-checked"]}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquare}
                className={styles["student-tile-action-checkbox-unchecked"]}
              />
            )}
          </div>
          <button
            className={styles["student-tile-upload-button"]}
            onClick={() => openViewStudentLetterModal(student)}
            disabled={!student.studentLetterLink}
          >
            <div className={styles["student-tile-upload-title"]}>
              {student.studentLetterLink
                ? "View Student Letter"
                : "Student Letter Unavailable"}
            </div>
            <FontAwesomeIcon
              icon={faEye}
              className={styles["student-tile-upload-icon"]}
            />
          </button>
        </div>
        <div className={styles["student-tile-action"]}>
          <div className={styles["student-tile-action-checkbox"]}>
            {student.volunteerLetterLink ? (
              <FontAwesomeIcon
                icon={faSquareCheck}
                className={styles["student-tile-action-checkbox-checked"]}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquare}
                className={styles["student-tile-action-checkbox-unchecked"]}
              />
            )}
          </div>
          <button
            className={styles["student-tile-upload-button"]}
            onClick={() => openVolunteerLetterModal(student)}
          >
            <div className={styles["student-tile-upload-title"]}>
              {student.volunteerLetterLink
                ? "Reupload Response Letter"
                : "Upload Response Letter"}
            </div>
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className={styles["student-tile-upload-icon"]}
            />
          </button>
        </div>
        <div className={styles["student-tile-action"]}>
          <div className={styles["student-tile-action-checkbox"]}>
            {student.assignedBookLink ? (
              <FontAwesomeIcon
                icon={faSquareCheck}
                className={styles["student-tile-action-checkbox-checked"]}
              />
            ) : (
              <FontAwesomeIcon
                icon={faSquare}
                className={styles["student-tile-action-checkbox-unchecked"]}
              />
            )}
          </div>
          <button
            className={styles["student-tile-upload-button"]}
            onClick={() => openBookSelectionModal(student)}
          >
            <div className={styles["student-tile-upload-title"]}>
              {student.assignedBookLink
                ? "Change Book Link"
                : "Select Book Link"}
            </div>
            <FontAwesomeIcon
              icon={faLink}
              className={styles["student-tile-upload-icon"]}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentTile;
