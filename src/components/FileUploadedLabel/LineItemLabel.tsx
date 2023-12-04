import styles from "./LineItemLabel.module.css";
import {
  LineItemLabelVariant,
  type LineItemLabelProps,
} from "./LineItemLabel.definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LineItemLabel = ({
  label,
  variant,
  icon,
  onClick,
}: LineItemLabelProps) => (
  <div
    onClick={onClick}
    className={
      variant === LineItemLabelVariant.GREEN
        ? styles[`label-green${!onClick ? "-no-on-click" : ""}`]
        : variant === LineItemLabelVariant.RED
        ? styles[`label-red${!onClick ? "-no-on-click" : ""}`]
        : variant === LineItemLabelVariant.YELLOW
        ? styles[`label-yellow${!onClick ? "-no-on-click" : ""}`]
        : variant === LineItemLabelVariant.BLUE
        ? styles[`label-blue${!onClick ? "-no-on-click" : ""}`]
        : variant === LineItemLabelVariant.PURPLE
        ? styles[`label-purple${!onClick ? "-no-on-click" : ""}`]
        : variant === LineItemLabelVariant.ORANGE
        ? styles[`label-orange${!onClick ? "-no-on-click" : ""}`]
        : variant === LineItemLabelVariant.GREY
        ? styles[`label-grey${!onClick ? "-no-on-click" : ""}`]
        : styles[`label-blue${!onClick ? "-no-on-click" : ""}`]
    }
  >
    {icon && <FontAwesomeIcon icon={icon} />}
    <span className={styles["label"]}>{` ${label}`}</span>
  </div>
);

export default LineItemLabel;
