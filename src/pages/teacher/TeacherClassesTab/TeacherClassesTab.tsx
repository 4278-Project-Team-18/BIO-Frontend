import styles from "./TeacherClassesTab.module.css";
import ClassStudentList from "../../../components/ClassStudentList/ClassStudentList";
import {
  type Class,
  TeacherTabs,
  type Student,
} from "../../../interfaces/User.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import { useCustomFetch } from "../../../api/request.util";
import { useClassesContext } from "../../../context/Classes.context";
import AddClassModal from "../../../modals/AddClassModal/AddClassModal";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import UploadStudentLetterModal from "../../../modals/UploadStudentLetterModal/UploadStudentLetterModal";
import { useEffect, useState } from "react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TeacherClassesTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentClasses, setCurrentClasses } = useClassesContext();
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
    setCurrentTab(TeacherTabs.CLASSES);
  }, []);

  useEffect(() => {
    setCurrentClasses(classData || []);
  }, [classData]);

  if (classLoading) {
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

  return (
    <div>
      <div>
        <div className={styles["teacher-classes-header"]}>
          <div className={styles["teacher-classes-title"]}>{`Your Classes (${
            currentClasses?.length || 0
          })`}</div>
          <button
            id="add-class-button"
            className={styles["add-class-button"]}
            onClick={handleOpenClassModal}
          >
            <div className={styles["add-class-button-label"]}>
              {"Add Class"}
            </div>
            <FontAwesomeIcon
              icon={faPlusCircle}
              className={styles["add-class-submit-button-icon"]}
            />
          </button>
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
      {currentClasses?.map((classItem) => (
        <ClassStudentList
          key={classItem._id}
          classObject={classItem}
          openUploadLetterModal={handleOpenUploadLetterModal}
        />
      ))}
    </div>
  );
};

export default TeacherClassesTab;
