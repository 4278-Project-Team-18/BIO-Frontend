import styles from "./LineItemLabel.module.css";
import {
  LineItemLabelVariant,
  type LineItemLabelProps,
} from "./LineItemLabel.definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

const LineItemLabel = ({ label, variant }: LineItemLabelProps) => {
  console.log("FileUploadedLabel");

  return (
    <div
      className={
        variant === LineItemLabelVariant.SUCCESS
          ? styles["uploaded-container-success"]
          : styles["uploaded-container-error"]
      }
    >
      <FontAwesomeIcon
        icon={
          variant === LineItemLabelVariant.SUCCESS
            ? faCircleCheck
            : faCircleXmark
        }
      />
      <span className={styles["uploaded-label"]}>{` ${label}`}</span>
    </div>
  );
};

export default LineItemLabel;
