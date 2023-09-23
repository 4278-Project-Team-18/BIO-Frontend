import styles from "./AccordionTab.module.css";

interface AccordionTabProps {
  name: string;
}

const AccordionTab = ({ name }: AccordionTabProps) => (
  <div className={styles["container"]}>
    <div className={styles["name"]}>{name} </div>
    <div className={styles["buttons"]}>
      <button>Approve</button>
      <button>Reject</button>
    </div>
  </div>
);

export default AccordionTab;
