import styles from "./Accordion.module.css";
import TitleLineItem from "../TitleLineItem/TitleLineItem";
import LineItemDivider from "../LineItemDivider/LineItemDivider";
import ActionLineItem from "../ActionLineItem/ActionLineItem";
import NoDataLineItem from "../NoDataLineItem/NoDataLineItem";
import { TitleLineItemVariant } from "../TitleLineItem/TitleLineItem.definitions";
import { Fragment, useEffect, useState } from "react";
import type { AccordionProps } from "./Accordion.definitions";

/**
 * Accordion component
 *
 * @param {string} title - the title of the accordion
 * @param {React.ReactNode} children - the optional children of the accordion
 * @param {string} actionButtonText - the optional text of the action button
 * @param {() => void} actionButtonCallback - the optional callback of the action button
 * @param {boolean} hideActionButton - whether or not to hide the action button (default: true)
 */
const Accordion = ({
  title,
  headerText,
  children,
  actionButtonText,
  actionButtonCallback,
  hideActionButton = true,
  noDataTitle = "No data",
  actionLineItem,
  showActionLineItem,
  showAll = false,
  minimumItems = 5,
  headerActionOneIcon,
  headerActionTwoIcon,
  headerActionOneOnClick,
  headerActionTwoOnClick,
  headerActionOneTitle,
  headerActionTwoTitle,
}: AccordionProps) => {
  // show more button is visible if there are more than minimumItems children
  const [showMoreButtonVisible, setShowMoreButtonVisible] = useState<boolean>();

  // accordion is open if the show more button has been clicked
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  // toggle the accordion open or closed
  const handleShowMoreOrLess = () => {
    setAccordionOpen(!accordionOpen);
  };

  // update the show more button visibility when the children change
  useEffect(() => {
    if (children && children?.length > minimumItems) {
      setShowMoreButtonVisible(true);
    } else {
      setShowMoreButtonVisible(false);
    }
  }, [children, accordionOpen]);

  return (
    <div className={styles["content"]}>
      {title && (
        <TitleLineItem
          title={title}
          variant={TitleLineItemVariant.TABLE_TITLE}
          actionOneOnClick={headerActionOneOnClick}
          actionOneTitle={headerActionOneTitle}
          actionOneIcon={headerActionOneIcon}
          actionTwoOnClick={headerActionTwoOnClick}
          actionTwoTitle={headerActionTwoTitle}
          actionTwoIcon={headerActionTwoIcon}
        />
      )}
      <div className={styles["accordion"]}>
        {headerText && (
          <TitleLineItem
            title={headerText}
            variant={TitleLineItemVariant.TABLE_HEADER}
          />
        )}
        {!children || children?.length == 0 ? (
          showActionLineItem ? (
            <>{actionLineItem}</>
          ) : (
            <NoDataLineItem
              title={noDataTitle}
              hideBottomLine={hideActionButton && !showMoreButtonVisible}
            />
          )
        ) : (
          <>
            {children
              ?.slice(
                0,
                accordionOpen || showAll ? children.length : minimumItems,
              )
              .map((child, index) => (
                <Fragment key={`${title}_${headerText}_${index}`}>
                  {child}
                  {!hideActionButton ? (
                    <LineItemDivider />
                  ) : index < children.length - 1 ? (
                    <LineItemDivider />
                  ) : null}
                </Fragment>
              ))}
            {showActionLineItem && actionLineItem !== undefined && (
              <>
                {actionLineItem}
                <LineItemDivider />
              </>
            )}
          </>
        )}
        <ActionLineItem
          actionButtonTitle={actionButtonText}
          actionButtonOnClick={actionButtonCallback}
          showMoreButtonOnClick={handleShowMoreOrLess}
          hideActionButton={hideActionButton}
          hideShowMoreButton={!showMoreButtonVisible || showAll}
          isAccordionExpanded={accordionOpen}
        />
      </div>
    </div>
  );
};

export default Accordion;
