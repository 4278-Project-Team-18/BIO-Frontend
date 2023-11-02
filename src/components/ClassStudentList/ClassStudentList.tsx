import styles from "./ClassStudentList.module.css";
import StudentLineItem from "../StudentLineItem/StudentLineItem";
import AddEditStudent from "../AddEditStudent/AddEditStudent";
import Accordion from "../Accordion/Accordion";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import { useEffect, useState } from "react";
import type { RemoveStudentResponse } from "../../interfaces/Api.interface";
import type { ClassStudentListProps } from "./ClassStudentList.definitions";
import type { Student } from "../../interfaces/User.interface";

const ClassStudentList = ({ classObject }: ClassStudentListProps) => {
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [currentEditStudentId, setCurrentEditStudentId] = useState<
    string | null
  >(null);
  const [currentRemoveStudentId, setCurrentRemoveStudentId] = useState<
    string | null
  >(null);

  const { removeStudentFromClass } = useClassesContext();

  const {
    data: deleteStudentFromClassData,
    error: deleteStudentFromClassError,
    loading: deleteStudentFromClassLoading,
    makeRequest: deleteStudentFromClass,
  } = useCustomFetch<RemoveStudentResponse>(
    `class/${classObject._id}/removeStudent`,
    RequestMethods.DELETE,
  );

  const createUniqueStudentKey = (student: Student, index: number) =>
    `${student._id}_${student.firstName}_${student.lastInitial}_${index}`;

  useEffect(() => {
    if (deleteStudentFromClassData && !deleteStudentFromClassError) {
      removeStudentFromClass(
        deleteStudentFromClassData.studentId,
        classObject._id,
      );
    }
    setCurrentRemoveStudentId(null);
  }, [deleteStudentFromClassData]);

  const handleOpenAddStudentModal = () => {
    setIsAddingStudent(true);
  };

  const handleCloseAddStudentModal = () => {
    setIsAddingStudent(false);
  };

  const handleOpenEditStudentModal = (studentId: string) => {
    setCurrentEditStudentId(studentId);
  };

  const handleCloseEditStudentModal = () => {
    setCurrentEditStudentId(null);
  };

  const handleRemoveStudentFromClass = async (studentId: string) => {
    setCurrentRemoveStudentId(studentId);
    await deleteStudentFromClass({ studentId });
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
          actionLineItem={
            <AddEditStudent
              classId={classObject._id}
              closeModal={handleCloseAddStudentModal}
            />
          }
          showActionLineItem={isAddingStudent}
        >
          {classObject.students?.map((student, index) =>
            currentEditStudentId === student._id ? (
              <AddEditStudent
                key={createUniqueStudentKey(student, index)}
                classId={classObject._id}
                closeModal={handleCloseEditStudentModal}
                student={student}
              />
            ) : (
              <StudentLineItem
                key={createUniqueStudentKey(student, index)}
                student={student}
                openEditModal={handleOpenEditStudentModal}
                removeStudentFromClass={handleRemoveStudentFromClass}
                removeStudentLoading={
                  currentRemoveStudentId === student._id &&
                  deleteStudentFromClassLoading
                }
              />
            ),
          )}
        </Accordion>
      </div>
    </>
  );
};

export default ClassStudentList;
