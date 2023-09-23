import styles from "./Accordion.module.css";
import { useState } from "react";
import type { AccordionProps } from "./Accordion.definitions";

const Accordion = ({ title, children }: AccordionProps) => {
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

  return (
    <div className={styles["content"]}>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["accordion"]}>
        {children?.slice(0, displayCount)}
      </div>
      <div className={styles["buttons"]}>
        <button onClick={handleShowMore}>
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default Accordion;
