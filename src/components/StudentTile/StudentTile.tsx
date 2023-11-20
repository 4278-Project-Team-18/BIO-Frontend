import styles from "./StudentTile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import type { StudentTileProps } from "./StudentTile.definitions";

const StudentTile = ({
  student,
  openVolunteerLetterModal,
}: StudentTileProps) => (
  <div className={styles["student-tile-container"]}>
    <div className={styles["student-tile-name"]}>
      {student.firstName} {student.lastInitial}
    </div>
    <div className={styles["student-tile-reading-level"]}>
      Reading level: {student.readingLevel}
    </div>
    <button
      className={styles["student-tile-upload-button"]}
      onClick={() => openVolunteerLetterModal(student)}
    >
      <div className={styles["student-tile-upload-title"]}>
        {student.volunteerResponseLetterLink ? "Reupload" : "Upload"}
      </div>
      <FontAwesomeIcon
        icon={faCloudArrowUp}
        className={styles["student-tile-upload-icon"]}
      />
    </button>
  </div>
);

export default StudentTile;
