import styles from "./LineItemLabel.module.css";
import {
  LineItemLabelVariant,
  type LineItemLabelProps,
} from "./LineItemLabel.definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LineItemLabel = ({ label, variant, icon }: LineItemLabelProps) => (
  <div
    className={
      variant === LineItemLabelVariant.GREEN
        ? styles["label-green"]
        : variant === LineItemLabelVariant.RED
        ? styles["label-red"]
        : variant === LineItemLabelVariant.YELLOW
        ? styles["label-yellow"]
        : variant === LineItemLabelVariant.BLUE
        ? styles["label-blue"]
        : variant === LineItemLabelVariant.PURPLE
        ? styles["label-purple"]
        : variant === LineItemLabelVariant.ORANGE
        ? styles["label-orange"]
        : styles["label-blue"]
    }
  >
    {icon && <FontAwesomeIcon icon={icon} />}
    <span className={styles["label"]}>{` ${label}`}</span>
  </div>
);

export default LineItemLabel;
