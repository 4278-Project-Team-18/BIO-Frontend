import styles from "./AdminApprovalLineItem.module.css";
import AdminUpdateApprovalStatus from "../AdminUpdateApprovalStatus/AdminUpdateApprovalStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import type { AdminApprovalLineItemProps } from "./AdminApproval.definitions";

const AdminApprovalLineItem = ({ admin }: AdminApprovalLineItemProps) => (
  <div className={styles["line-item-container"]}>
    <div className={styles["line-item-container-left"]}>
      <FontAwesomeIcon
        icon={faClock}
        className={styles["line-item-name-icon"]}
      />
      <div className={styles["line-item-name"]}>
        {`${admin.firstName} ${admin.lastName}`}
      </div>
    </div>
    <div className={styles["line-item-container-right"]}>
      <AdminUpdateApprovalStatus admin={admin} />
    </div>
  </div>
);

export default AdminApprovalLineItem;
