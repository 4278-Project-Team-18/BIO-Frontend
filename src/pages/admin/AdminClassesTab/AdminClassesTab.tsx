import styles from "./AdminClassesTab.module.css";
import ClassStudentList from "../../../components/ClassStudentList/ClassStudentList";
import {
  AdminTabs,
  type Class,
  ApprovalStatus,
  type Teacher,
  type Student,
} from "../../../interfaces/User.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import { useCustomFetch } from "../../../api/request.util";
import { useClassesContext } from "../../../context/Classes.context";
import AddClassModal from "../../../modals/AddClassModal/AddClassModal";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import Accordion from "../../../components/Accordion/Accordion";
import TeacherLineItem from "../../../components/TeacherLineItem/TeacherLineItem";
import { useTeachersContext } from "../../../context/Teachers.context";
import UploadStudentLetterModal from "../../../modals/UploadStudentLetterModal/UploadStudentLetterModal";
import LoadingButton from "../../../components/LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../../../components/LoadingButton/LoadingButton.definitions";
import { useEffect, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

const AdminClassesTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentClasses, setCurrentClasses } = useClassesContext();
  const { currentTeachers, setCurrentTeachers } = useTeachersContext();
  const [classModalOpen, setClassModalOpen] = useState<boolean>(false);
  const [uploadLetterModalOpen, setUploadLetterModalOpen] =
    useState<boolean>(false);
  const [currentStudentUploadLetter, setCurrentStudentLetterUpload] =
    useState<Student | null>(null);

  const {
    data: classData,
    loading: classLoading,
    error: classError,
    makeRequest: makeClassRequest,
  } = useCustomFetch<Class[]>(`/class/`);

  const {
    data: teacherData,
    loading: teacherLoading,
    error: teacherError,
    makeRequest: makeTeacherRequest,
  } = useCustomFetch<Teacher[]>(`/teacher/`);

  const handleCloseClassModal = () => {
    setClassModalOpen(false);
  };

  const handleOpenClassModal = () => {
    setClassModalOpen(true);
  };

  const handleOpenUploadLetterModal = (student: Student) => {
    setUploadLetterModalOpen(true);
    setCurrentStudentLetterUpload(student);
  };

  const handleCloseUploadLetterModal = () => {
    setUploadLetterModalOpen(false);
    setCurrentStudentLetterUpload(null);
  };

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.CLASSES);
  }, []);

  useEffect(() => {
    setCurrentTeachers(teacherData || []);
  }, [teacherData]);

  useEffect(() => {
    setCurrentClasses(classData || []);
  }, [classData]);

  if (classLoading || teacherLoading) {
    return <FullPageLoadingIndicator />;
  }

  if (classError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeClassRequest}
      />
    );
  }

  if (teacherError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeTeacherRequest}
      />
    );
  }

  const teachers = currentTeachers?.filter(
    (teacher) => teacher.approvalStatus === ApprovalStatus.APPROVED,
  );

  return (
    <div>
      <div>
        <div className={styles["admin-classes-header"]}>
          <div className={styles["admin-classes-title"]}>{`All Classes (${
            currentClasses?.length || 0
          })`}</div>
          <LoadingButton
            onClick={handleOpenClassModal}
            isLoading={false}
            text={"Add Class"}
            icon={faPlusCircle}
            variant={LoadingButtonVariant.GREEN}
          />
        </div>
        <div>
          {uploadLetterModalOpen && currentStudentUploadLetter && (
            <UploadStudentLetterModal
              closeModal={handleCloseUploadLetterModal}
              student={currentStudentUploadLetter}
            />
          )}
          {classModalOpen && (
            <AddClassModal closeModal={handleCloseClassModal} />
          )}
        </div>
      </div>
      <div className={"divider"} />
      {currentClasses?.map((classItem) => (
        <ClassStudentList
          classObject={classItem}
          key={classItem._id}
          openUploadLetterModal={handleOpenUploadLetterModal}
        />
      ))}
      <Accordion title="All Teachers" noDataTitle="No current teachers!">
        {teachers?.map((teacher, index) => (
          <TeacherLineItem key={index} teacher={teacher} />
        ))}
      </Accordion>
    </div>
  );
};

export default AdminClassesTab;
