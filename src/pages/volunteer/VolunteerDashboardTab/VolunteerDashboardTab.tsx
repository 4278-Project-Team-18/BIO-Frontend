import styles from "./VolunteerMatchesTab.module.css";
import { useUserContext } from "../../../context/User.context";
import { RequestMethods, useCustomFetch } from "../../../api/request.util";
import StudentTile from "../../../components/StudentTile/StudentTile";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import UploadVolunteerLetterModal from "../../../modals/UploadVolunteerLetterModal/UploadVolunteerLetterModal";
import BookSelectionModal from "../../../modals/BookSelectionModal/BookSelectionModal";
import {
  type Volunteer,
  type Student,
  VolunteerTabs,
} from "../../../interfaces/User.interface";
import { useClassesContext } from "../../../context/Classes.context";
import { useNavigationContext } from "../../../context/Navigation.context";
import ViewStudentLetterModal from "../../../modals/ViewStudentLetterModal/ViewStudentLetterModal";
import { useEffect, useState } from "react";

const VolunteerDashboardTab = () => {
  const { currentUser } = useUserContext();
  const { currentStudents, setCurrentStudents } = useClassesContext();
  const { setCurrentTab } = useNavigationContext();

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

  const {
    data: volunteerData,
    loading: volunteerLoading,
    error: volunteerError,
    makeRequest: makeVolunteerRequest,
  } = useCustomFetch<Volunteer>(
    `/volunteer/${currentUser?._id}`,
    RequestMethods.GET,
  );

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
    makeRequest: makeStudentRequest,
  } = useCustomFetch<Student[]>(`/student/`);

  useEffect(() => {
    setCurrentTab(VolunteerTabs.DASHBOARD);
  }, []);

  useEffect(() => {
    if (studentData && !studentError) {
      setCurrentStudents(studentData);
    }
  }, [studentData]);

  if (volunteerLoading || studentLoading) {
    return <FullPageLoadingIndicator />;
  }

  if (volunteerError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeVolunteerRequest}
      />
    );
  }

  if (studentError) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeStudentRequest}
      />
    );
  }

  const studentsMatchedToVolunteer = currentStudents?.filter(
    (student) => student.matchedVolunteer === volunteerData?._id,
  );

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
        {studentsMatchedToVolunteer?.map((student, index) => (
          <StudentTile
            student={student}
            openViewStudentLetterModal={handleOpenViewStudentLetterModal}
            openVolunteerLetterModal={handleOpenUploadLetterModal}
            openBookSelectionModal={handleOpenBookSelectionModal}
            key={index}
          />
        ))}
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
