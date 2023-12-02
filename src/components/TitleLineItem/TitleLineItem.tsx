import styles from "./TitleLineItem.module.css";
import {
  TitleLineItemVariant,
  type TitleLineItemProps,
} from "./TitleLineItem.definitions";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const TitleLineItem = ({
  title,
  variant = TitleLineItemVariant.TABLE_HEADER,
  actionOnClick,
  actionTitle,
}: TitleLineItemProps) => (
  <div className={styles[`title-line-item-${variant}`]}>
    <div className={styles[`title-line-item-title-${variant}`]}>{title}</div>
    {actionOnClick &&
      actionTitle &&
      variant === TitleLineItemVariant.TABLE_TITLE && (
        <LoadingButton
          onClick={actionOnClick}
          text={actionTitle || ""}
          isLoading={false}
          variant={LoadingButtonVariant.DARKGREY}
          icon={faTrash}
          styles={{ height: "30px", boxShadow: "none" }}
          iconOnly={true}
        />
      )}
  </div>
);

export default TitleLineItem;
