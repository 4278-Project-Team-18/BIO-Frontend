import styles from "./Accordion.module.css";
import { useEffect, useState } from "react";
import type { AccordionProps } from "./Accordion.definitions";

const Accordion = ({
  title,
  children,
  hideButtons,
  actionButtonText,
  actionButtonCallback,
}: AccordionProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
    if (showMore) {
      setDisplayCount(5);
    } else {
      setDisplayCount(children?.length || 5);
    }
  };

  // update the display count when the children change
  useEffect(() => {
    if (children) {
      setDisplayCount(children?.length || 5);
    }
  }, [children]);

  return (
    <div className={styles["content"]}>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["accordion"]}>
        {children?.slice(0, displayCount)}
      </div>
      {!hideButtons && (
        <div className={styles["buttons-container"]}>
          <div className={styles["buttons"]}>
            {actionButtonText && actionButtonCallback && (
              <button
                className={styles["add-student-button"]}
                onClick={actionButtonCallback}
              >
                <div className={styles["add-student-button-label"]}>
                  {actionButtonText}
                </div>
              </button>
            )}
            {children && children?.length > 5 && (
              <button
                className={styles["show-button"]}
                onClick={handleShowMore}
              >
                <div className={styles["show-button-label"]}>
                  {showMore ? "Show Less" : "Show More"}
                </div>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
