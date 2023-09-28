import styles from "./TitleLineItem.module.css";
import type { TitleLineItemProps } from "./TitleLineItem.definitions";

const TitleLineItem = ({ title }: TitleLineItemProps) => (
  <div className={styles["title-line-item"]}>
    <div className={styles["title-line-item-title"]}>{title}</div>
  </div>
);

export default TitleLineItem;
