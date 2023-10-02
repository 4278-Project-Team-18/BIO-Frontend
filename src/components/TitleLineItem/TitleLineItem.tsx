import styles from "./TitleLineItem.module.css";
import {
  TitleLineItemVariant,
  type TitleLineItemProps,
} from "./TitleLineItem.definitions";

const TitleLineItem = ({
  title,
  variant = TitleLineItemVariant.TABLE_HEADER,
}: TitleLineItemProps) => (
  <div className={styles[`title-line-item-${variant}`]}>
    <div className={styles[`title-line-item-title-${variant}`]}>{title}</div>
  </div>
);

export default TitleLineItem;
