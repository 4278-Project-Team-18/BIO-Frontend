import styles from "./ActionLineItem.module.css";
import type { ActionLineItemProps } from "./ActionLineItem.definitions";

const ActionLineItem = ({
  actionButtonTitle: actionTitle,
  actionButtonOnClick: actionOnClick,
  showMoreButtonOnClick: showMoreOnClick,
  isAccordionExpanded: isExpanded,
  hideShowMoreButton = false,
  hideActionButton = false,
}: ActionLineItemProps) => {
  if (hideShowMoreButton && hideActionButton) {
    return null;
  }

  return (
    <div className={styles["buttons-container"]}>
      <div className={styles["buttons"]}>
        {!hideActionButton && (
          <button
            className={styles["action-button"]}
            id={`action-button`}
            onClick={actionOnClick}
          >
            <div className={styles["action-button-label"]}>{actionTitle}</div>
          </button>
        )}
        {!hideShowMoreButton && (
          <button
            className={styles["show-button"]}
            onClick={showMoreOnClick}
            id={"show-button"}
          >
            <div className={styles["show-button-label"]}>
              {isExpanded ? "Show Less -" : "Show More +"}
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionLineItem;
