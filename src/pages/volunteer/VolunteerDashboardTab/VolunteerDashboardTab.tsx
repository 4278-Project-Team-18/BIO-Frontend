import styles from "./VolunteerMatchesTab.module.css";
import { useUserContext } from "../../../context/User.context";
import StudentTile from "../../../components/StudentTile/StudentTile";
import UploadVolunteerLetterModal from "../../../modals/UploadVolunteerLetterModal/UploadVolunteerLetterModal";
import BookSelectionModal from "../../../modals/BookSelectionModal/BookSelectionModal";
import {
  type Volunteer,
  type Student,
  VolunteerTabs,
} from "../../../interfaces/User.interface";
import { useNavigationContext } from "../../../context/Navigation.context";
import ViewStudentLetterModal from "../../../modals/ViewStudentLetterModal/ViewStudentLetterModal";
import { useEffect, useState } from "react";

const VolunteerDashboardTab = () => {
  const { currentUser } = useUserContext();
  const { setCurrentTab } = useNavigationContext();

  console.log(currentUser);

  const [viewStudentLetterModalOpen, setViewStudentLetterModalOpen] =
    useState<boolean>(false);
  const [uploadLetterModalOpen, setUploadLetterModalOpen] =
    useState<boolean>(false);
  const [bookSelectionModalOpen, setBookSelectionModalOpen] =
    useState<boolean>(false);
  const [currentStudentViewLetter, setCurrentStudentViewLetter] =
    useState<Student | null>(null);
  const [currentStudentUploadLetter, setCurrentStudentLetterUpload] =
    useState<Student | null>(null);
  const [currentStudentBookSelection, setCurrentStudentBookSelection] =
    useState<Student | null>(null);

  const handleOpenViewStudentLetterModal = (student: Student) => {
    setViewStudentLetterModalOpen(true);
    setCurrentStudentViewLetter(student);
  };

  const handleCloseViewStudentLetterModal = () => {
    setViewStudentLetterModalOpen(false);
    setCurrentStudentViewLetter(null);
  };

  const handleOpenUploadLetterModal = (student: Student) => {
    setUploadLetterModalOpen(true);
    setCurrentStudentLetterUpload(student);
  };

  const handleCloseUploadLetterModal = () => {
    setUploadLetterModalOpen(false);
    setCurrentStudentLetterUpload(null);
  };

  const handleOpenBookSelectionModal = (student: Student) => {
    setBookSelectionModalOpen(true);
    setCurrentStudentBookSelection(student);
  };

  const handleCloseBookSelectionModal = () => {
    setBookSelectionModalOpen(false);
    setCurrentStudentBookSelection(null);
  };

  useEffect(() => {
    setCurrentTab(VolunteerTabs.DASHBOARD);
  }, []);

  return (
    <div>
      <div className={styles["volunteer-dashboard-header"]}>
        <div className={styles["volunteer-dashboard-title-container"]}>
          <div className={styles["volunteer-dashboard-title"]}>{`Welcome back${
            currentUser?.firstName ? `, ${currentUser?.firstName}!` : "!"
          }`}</div>
        </div>
      </div>
      <div className={styles["volunteer-dashboard-tiles"]}>
        {((currentUser as Volunteer)?.matchedStudents as Student[])?.map(
          (student: Student, index: number) => (
            <StudentTile
              student={student}
              openViewStudentLetterModal={handleOpenViewStudentLetterModal}
              openVolunteerLetterModal={handleOpenUploadLetterModal}
              openBookSelectionModal={handleOpenBookSelectionModal}
              key={index}
            />
          ),
        )}
      </div>
      <div>
        {viewStudentLetterModalOpen && currentStudentViewLetter && (
          <ViewStudentLetterModal
            closeModal={handleCloseViewStudentLetterModal}
            student={currentStudentViewLetter}
          />
        )}
        {uploadLetterModalOpen && currentStudentUploadLetter && (
          <UploadVolunteerLetterModal
            closeModal={handleCloseUploadLetterModal}
            student={currentStudentUploadLetter}
            volunteer={currentUser as Volunteer}
          />
        )}
        {bookSelectionModalOpen && currentStudentBookSelection && (
          <BookSelectionModal
            closeModal={handleCloseBookSelectionModal}
            student={currentStudentBookSelection}
          />
        )}
      </div>
    </div>
  );
};

export default VolunteerDashboardTab;
