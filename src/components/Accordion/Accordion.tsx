import styles from "./Accordion.module.css";
import TitleLineItem from "../TitleLineItem/TitleLineItem";
import LineItemDivider from "../LineItemDivider/LineItemDivider";
import ActionLineItem from "../ActionLineItem/ActionLineItem";
import { useEffect, useState } from "react";
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
  children,
  actionButtonText,
  actionButtonCallback,
  hideActionButton = true,
}: AccordionProps) => {
  // show more button is visible if there are more than 5 children
  const [showMoreButtonVisible, setShowMoreButtonVisible] = useState<boolean>();

  // accordion is open if the show more button has been clicked
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  // toggle the accordion open or closed
  const handleShowMoreOrLess = () => {
    setAccordionOpen(!accordionOpen);
  };

  // update the show more button visibility when the children change
  useEffect(() => {
    if (children && children?.length > 5) {
      setShowMoreButtonVisible(true);
    } else {
      setShowMoreButtonVisible(false);
    }
  }, [children, accordionOpen]);

  return (
    <div className={styles["content"]}>
      <div className={styles["accordion"]}>
        {title && <TitleLineItem title={title} />}
        {children
          ?.slice(0, accordionOpen ? children.length : 5)
          .map((child, index) => (
            <div key={index}>
              {child}
              <LineItemDivider />
            </div>
          ))}
        <ActionLineItem
          actionButtonTitle={actionButtonText}
          actionButtonOnClick={actionButtonCallback}
          showMoreButtonOnClick={handleShowMoreOrLess}
          hideActionButton={hideActionButton}
          hideShowMoreButton={!showMoreButtonVisible}
          isAccordionExpanded={accordionOpen}
        />
      </div>
    </div>
  );
};

export default Accordion;
