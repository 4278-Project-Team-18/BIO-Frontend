import styles from "./TeacherLineItem.module.css";
import type { TeacherLineItemProps } from "./TeacherLineItem.definitions";

const TeacherLineItem = ({ teacher }: TeacherLineItemProps) => (
  <div className={styles["line-item-container"]}>
    <div className={styles["line-item-container-left"]}>
      <div className={styles["line-item-name-icon"]} />
      <div className={styles["line-item-name"]}>
        {`${teacher.firstName} ${teacher.lastName}`}
      </div>
    </div>
    <div className={styles["line-item-container-right"]} />
  </div>
);

export default TeacherLineItem;
