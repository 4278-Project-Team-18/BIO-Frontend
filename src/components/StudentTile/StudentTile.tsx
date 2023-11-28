import styles from "./StudentTile.module.css";
import FullPageLoadingIndicator from "../FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../FullPageErrorDisplay/FullPageErrorDisplay";
import { useCustomFetch } from "../../api/request.util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import type { StudentTileProps } from "./StudentTile.definitions";
import type { Class } from "../../interfaces/User.interface";

const StudentTile = ({
  student,
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
        <button
          className={styles["student-tile-upload-button"]}
          onClick={() => openVolunteerLetterModal(student)}
        >
          <div className={styles["student-tile-upload-title"]}>
            {student.volunteerResponseLetterLink
              ? "Reupload Letter"
              : "Upload Letter"}
          </div>
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className={styles["student-tile-upload-icon"]}
          />
        </button>
        <button
          className={styles["student-tile-book-selection-button"]}
          onClick={() => openBookSelectionModal(student)}
        >
          <div className={styles["student-tile-book-selection-title"]}>
            {student.assignedBookLink ? "Change Book" : "Select Book"}
          </div>
          <FontAwesomeIcon
            icon={faCloudArrowUp}
            className={styles["student-tile-book-selection-icon"]}
          />
        </button>
      </div>
    </div>
  );
};

export default StudentTile;
