import styles from "./VolunteerMatchesTab.module.css";
import { useUserContext } from "../../../context/User.context";
import { RequestMethods, useCustomFetch } from "../../../api/request.util";
import StudentTile from "../../../components/StudentTile/StudentTile";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import UploadVolunteerLetterModal from "../../../modals/UploadVolunteerLetterModal/UploadVolunteerLetterModal";
import BookSelectionModal from "../../../modals/BookSelectionModal/BookSelectionModal";
import { useState } from "react";
import type { Volunteer, Student } from "../../../interfaces/User.interface";

const VolunteerMatchesTab = () => {
  const { currentUser } = useUserContext();

  const [uploadLetterModalOpen, setUploadLetterModalOpen] =
    useState<boolean>(false);
  const [bookSelectionModalOpen, setBookSelectionModalOpen] =
    useState<boolean>(false);
  const [currentStudentUploadLetter, setCurrentStudentLetterUpload] =
    useState<Student | null>(null);
  const [currentStudentBookSelection, setCurrentStudentBookSelection] =
    useState<Student | null>(null);

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

  const studentsMatchedToVolunteer = studentData?.filter(
    (student) => student.matchedVolunteer === volunteerData?._id,
  );

  return (
    <div>
      <div className={styles["volunteer-matches-header"]}>
        <div className={styles["volunteer-matches-title-container"]}>
          <div className={styles["volunteer-matches-title"]}>{`Welcome back${
            currentUser?.firstName ? `, ${currentUser?.firstName}!` : "!"
          }`}</div>
        </div>
      </div>
      <div className={styles["volunteer-matches-tiles"]}>
        {studentsMatchedToVolunteer?.map((student, index) => (
          <StudentTile
            student={student}
            openVolunteerLetterModal={handleOpenUploadLetterModal}
            openBookSelectionModal={handleOpenBookSelectionModal}
            key={index}
          />
        ))}
      </div>
      <div>
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

export default VolunteerMatchesTab;
