import styles from "./ClassStudentList.module.css";
import StudentLineItem from "../StudentLineItem/StudentLineItem";
import AddEditStudent from "../AddEditStudent/AddEditStudent";
import Accordion from "../Accordion/Accordion";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import ConfirmationModal from "../../modals/ConfirmationModal/ConfirmationModal";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import ViewStudentLetterModal from "../../modals/ViewStudentLetterModal/ViewStudentLetterModal";
import { useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import type { RemoveStudentResponse } from "../../interfaces/Api.interface";
import type { ClassStudentListProps } from "./ClassStudentList.definitions";
import type { Class, Student } from "../../interfaces/User.interface";

const ClassStudentList = ({
  classObject,
  openUploadLetterModal,
}: ClassStudentListProps) => {
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [currentEditStudentId, setCurrentEditStudentId] = useState<
    string | null
  >(null);
  const [currentRemoveStudentId, setCurrentRemoveStudentId] = useState<
    string | null
  >(null);
  const [openDeleteClassModal, setOpenDeleteClassModal] =
    useState<boolean>(false);
  const [openViewLetterModal, setOpenViewLetterModal] =
    useState<boolean>(false);
  const [
    currentSelectedViewLetterStudent,
    setCurrentSelectedViewLetterStudent,
  ] = useState<Student | null>(null);

  const { removeStudentFromClass, removeClass } = useClassesContext();

  const {
    data: deleteStudentFromClassData,
    error: deleteStudentFromClassError,
    loading: deleteStudentFromClassLoading,
    makeRequest: deleteStudentFromClass,
  } = useCustomFetch<RemoveStudentResponse>(
    `/class/${classObject._id}/removeStudent`,
    RequestMethods.DELETE,
  );

  const {
    data: deleteClassData,
    loading: deleteClassLoading,
    error: deleteClassError,
    makeRequest: makeDeleteClassRequest,
  } = useCustomFetch<Class>(`/class/`, RequestMethods.DELETE);

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

  useEffect(() => {
    if (deleteClassData) {
      removeClass(classObject._id);
      setOpenDeleteClassModal(false);
    }

    if (deleteClassError) {
      setOpenDeleteClassModal(false);
    }
  }, [deleteClassData]);

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

  const handleOpenDeleteClassModal = () => {
    setOpenDeleteClassModal(true);
  };

  const handleCloseDeleteClassModal = () => {
    setOpenDeleteClassModal(false);
  };

  const handleDeleteClass = () => {
    makeDeleteClassRequest(undefined, classObject._id);
  };

  const handleOpenViewLetterModal = (student: Student) => {
    setOpenViewLetterModal(true);
    setCurrentSelectedViewLetterStudent(student);
  };

  const handleCloseViewLetterModal = () => {
    setOpenViewLetterModal(false);
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
          headerActionOnClick={handleOpenDeleteClassModal}
          headerActionTitle="Delete class"
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
                openUploadLetterModal={openUploadLetterModal}
                removeStudentFromClass={handleRemoveStudentFromClass}
                removeStudentLoading={
                  currentRemoveStudentId === student._id &&
                  deleteStudentFromClassLoading
                }
                openViewLetterModal={handleOpenViewLetterModal}
              />
            ),
          )}
        </Accordion>
        {openDeleteClassModal && (
          <ConfirmationModal
            title="Are you sure?"
            subtitle={`Deleting "${classObject.name}" will also delete all of it's students and their data.`}
            confirmText="Delete class"
            confirmIcon={faTrash}
            confirmColor={LoadingButtonVariant.RED}
            action={handleDeleteClass}
            closeModal={handleCloseDeleteClassModal}
            isLoading={deleteClassLoading}
          />
        )}
        {openViewLetterModal && currentSelectedViewLetterStudent && (
          <ViewStudentLetterModal
            student={currentSelectedViewLetterStudent}
            closeModal={handleCloseViewLetterModal}
          />
        )}
      </div>
    </>
  );
};

export default ClassStudentList;
