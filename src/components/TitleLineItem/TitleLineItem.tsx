import styles from "./TitleLineItem.module.css";
import {
  TitleLineItemVariant,
  type TitleLineItemProps,
} from "./TitleLineItem.definitions";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";

const TitleLineItem = ({
  title,
  variant = TitleLineItemVariant.TABLE_HEADER,
  actionOneIcon,
  actionOneOnClick,
  actionOneTitle,
  actionTwoIcon,
  actionTwoOnClick,
  actionTwoTitle,
}: TitleLineItemProps) => (
  <div className={styles[`title-line-item-${variant}`]}>
    <div className={styles[`title-line-item-title-${variant}`]}>{title}</div>
    <div className={styles["title-line-item-action-buttons"]}>
      {actionTwoOnClick &&
        actionTwoTitle &&
        variant === TitleLineItemVariant.TABLE_TITLE && (
          <LoadingButton
            onClick={actionTwoOnClick}
            text={actionTwoTitle || ""}
            isLoading={false}
            variant={LoadingButtonVariant.PURPLE}
            icon={actionTwoIcon}
            styles={{ height: "30px", boxShadow: "none", marginRight: "10px" }}
            iconOnly={true}
          />
        )}
      {actionOneOnClick &&
        actionOneTitle &&
        variant === TitleLineItemVariant.TABLE_TITLE && (
          <LoadingButton
            onClick={actionOneOnClick}
            text={actionOneTitle || ""}
            isLoading={false}
            variant={LoadingButtonVariant.RED}
            icon={actionOneIcon}
            styles={{ height: "30px", boxShadow: "none" }}
            iconOnly={true}
          />
        )}
    </div>
  </div>
);

export default TitleLineItem;
