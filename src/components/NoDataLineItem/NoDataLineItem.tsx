import styles from "./NoDataLineItem.module.css";
import LineItemDivider from "../LineItemDivider/LineItemDivider";
import type { NoDataLineItemProps } from "./NoDataLineItem.definitions";

const NoDataLineItem = ({ title }: NoDataLineItemProps) => (
  <div className={styles["no-data-line-item-container"]}>
    <LineItemDivider />
    <div className={styles["no-data-line-item"]}>{title}</div>
    <LineItemDivider />
  </div>
);

export default NoDataLineItem;
