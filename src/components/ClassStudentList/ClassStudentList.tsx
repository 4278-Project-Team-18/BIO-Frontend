import styles from "./ClassStudentList.module.css";
import StudentLineItem from "../StudentLineItem/StudentLineItem";
import AddStudent from "../AddStudent/AddStudent";
import Accordion from "../Accordion/Accordion";
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
      <div className={styles["class-list-container"]}>
        <Accordion
          title={classObject.name}
          headerText="Students"
          actionButtonText={"Add student"}
          actionButtonCallback={handleOpenAddStudentModal}
          hideActionButton={isAddingStudent}
          noDataTitle="No students in this class!"
        >
          {classObject.students?.map((student) => (
            <StudentLineItem key={student._id} student={student} />
          ))}
        </Accordion>
      </div>
      {isAddingStudent && (
        <AddStudent
          closeModal={handleCloseAddStudentModal}
          classId={classObject._id}
        />
      )}
    </>
  );
};

export default ClassStudentList;
