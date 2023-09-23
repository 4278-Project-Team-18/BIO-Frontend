import styles from "./Accordion.module.css";
import AccordionTab from "../AccordionTab/AccordionTab";
import { useState, type PropsWithChildren } from "react";

interface AccordionProps extends PropsWithChildren {
  title: string;
  volunteers: string[];
}

const Accordion = ({ title, volunteers }: AccordionProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
    if (showMore) {
      setDisplayCount(5);
    } else {
      setDisplayCount(volunteers.length);
    }
  };

  return (
    <div className={styles["content"]}>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["accordion"]}>
        {volunteers.slice(0, displayCount).map((volunteer, index) => (
          <AccordionTab key={index} name={volunteer} />
        ))}
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
