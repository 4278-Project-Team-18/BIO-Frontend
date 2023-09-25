import styles from "./ClassStudentList.module.css";
import StudentLineItem from "../StudentLineItem/StudentLineItem";
import AddStudent from "../AddStudent/AddStudent";
import { useState } from "react";
import type { ClassStudentListProps } from "./ClassStudentList.definitions";

const ClassStudentList = ({ classObject }: ClassStudentListProps) => {
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  const handleOpenAddStudentModal = () => {
    setIsAddingStudent(true);
  };

  const handleCloseAddStudentModal = () => {
    setIsAddingStudent(false);
  };

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
      {!isAddingStudent ? (
        <div
          className={styles["add-student-button"]}
          onClick={handleOpenAddStudentModal}
        >
          <div className={styles["add-student-button-label"]}>Add student</div>
        </div>
      ) : (
        <AddStudent closeModal={handleCloseAddStudentModal} />
      )}
    </>
  );
};

export default ClassStudentList;
