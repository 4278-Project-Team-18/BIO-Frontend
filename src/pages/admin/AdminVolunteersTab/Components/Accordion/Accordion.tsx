import styles from "./Accordion.module.css";
import AccordionTab from "../AccordionTab/AccordionTab";
import { useState } from "react";
import type { ReactNode } from "react";

interface AccordionProps {
  title: string;
  people: string[];
  children?: ReactNode;
}

const Accordion = ({ title, people, children }: AccordionProps) => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [displayCount, setDisplayCount] = useState<number>(5);

  const handleShowMore = () => {
    setShowMore(!showMore);
    if (showMore) {
      setDisplayCount(5);
    } else {
      setDisplayCount(people.length);
    }
  };

  return (
    <div className={styles["content"]}>
      <div className={styles["title"]}>{title}</div>
      <div className={styles["accordion"]}>
        {people.slice(0, displayCount).map((person, index) => (
          <AccordionTab key={index} name={person}>
            {children}
          </AccordionTab>
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
