import styles from "./VolunteerLineItem.module.css";
import type { VolunteerLineItemProps } from "./VolunteerLineItem.definitions";

const VolunteerLineItem = ({ volunteer }: VolunteerLineItemProps) => (
  <div className={styles["line-item-container"]}>
    <div className={styles["line-item-container-left"]}>
      <div className={styles["line-item-name-icon"]}>
        {volunteer.matchedStudents ? (
          <div className={styles["line-item-matched-status-icon"]} />
        ) : (
          <div className={styles["line-item-unmatched-status-icon"]} />
        )}
      </div>
      <div className={styles["line-item-name"]}>
        {`${volunteer.firstName} ${volunteer.lastName}`}
      </div>
    </div>
    <div className={styles["line-item-container-right"]}>
      {volunteer.matchedStudents ? (
        <button className={styles["line-item-match-button"]}>
          <div className={styles["line-item-button-title"]}>Unmatch</div>
        </button>
      ) : (
        <button className={styles["line-item-match-button"]}>
          <div className={styles["line-item-button-title"]}>Match</div>
        </button>
      )}
    </div>
  </div>
);

export default VolunteerLineItem;
