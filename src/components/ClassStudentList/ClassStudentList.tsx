import styles from "./ClassStudentList.module.css";
import StudentLineItem from "../StudentLineItem/StudentLineItem";
import type { ClassStudentListProps } from "./ClassStudentList.definitions";

const ClassStudentList = ({ classObject }: ClassStudentListProps) => {
  console.log("ClassStudentList");

  return (
    <>
      <h1>{classObject.name}</h1>
      <div className={styles["class-list-container"]}>
        {classObject.students?.map((student, index) => (
          <StudentLineItem
            key={index}
            index={index}
            maxIndex={classObject.students?.length || 1}
            student={student}
          />
        ))}
      </div>
    </>
  );
};

export default ClassStudentList;
