import styles from "./VolunteerApprovalLineItem.module.css";

interface VolunteerApprovalLineItemProps {
  volunteer: string;
}

const VolunteerApprovalLineItem = ({
  volunteer,
}: VolunteerApprovalLineItemProps) => (
  <div className={styles["container"]}>
    <div className={styles["volunteer"]}>{volunteer}</div>
    <div className={styles["buttons"]}>
      <button>Approve</button>
      <button>Deny</button>
    </div>
  </div>
);

export default VolunteerApprovalLineItem;
