import styles from "./AccordionTab.module.css";
import type { ReactNode } from "react";

interface AccordionTabProps {
  name: string;
  children?: ReactNode;
}

const AccordionTab = ({ name, children }: AccordionTabProps) => (
  <div className={styles["container"]}>
    <div className={styles["name"]}>{name}</div>
    <div className={styles["children"]}>{children}</div>
  </div>
);

export default AccordionTab;
