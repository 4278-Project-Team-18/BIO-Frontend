import styles from "./MatchVolunteerModal.module.css";
import { type MatchVolunteerModalProps } from "./MatchVolunteerModal.defintions";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import Accordion from "../../components/Accordion/Accordion";
import StudentMatchLineItem from "../../components/StudentMatchLineItem/StudentMatchLineItem";
import FullPageErrorDisplay from "../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";
import { useVolunteersContext } from "../../context/Volunteers.context";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faFileCircleXmark,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import type { Student, Volunteer } from "../../interfaces/User.interface";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const MatchVolunteerModal = ({
  closeModal,
  volunteer,
}: MatchVolunteerModalProps) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { matchVolunteer, currentVolunteers } = useVolunteersContext();

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
    makeRequest: makeStudentRequest,
  } = useCustomFetch<Student[]>(`/student/`);

  // request to patch student to volunteer
  const {
    data: matchData,
    error: matchError,
    loading: matchLoading,
    makeRequest: makeMatchRequest,
  } = useCustomFetch<Volunteer>(`/volunteer/match`, RequestMethods.PATCH);

  // send the request to match the volunteer
  const onSubmitMatchVolunteer = async () => {
    await makeMatchRequest({
      volunteerId: volunteer._id,
      studentIdArray: [selectedStudent?._id],
    });
  };

  const handleSetSelectedStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  useEffect(() => {
    if (matchData && !matchError) {
      matchVolunteer(volunteer._id, [selectedStudent as Student]);
      setSelectedStudent(null);
      closeModal();
    }
  }, [matchData]);

  const isAlreadyMatchedToThisVolunteer = (student: Student) =>
    currentVolunteers?.some(
      (currentVolunteer) =>
        (currentVolunteer.matchedStudents as Student[])?.some(
          (matchedStudent) =>
            matchedStudent._id === student._id &&
            currentVolunteer._id === volunteer._id,
        ),
    );

  const isAlreadyMatchedToAnotherVolunteer = (student: Student) =>
    currentVolunteers?.some(
      (currentVolunteer) =>
        (currentVolunteer.matchedStudents as Student[])?.some(
          (matchedStudent) =>
            matchedStudent._id === student._id &&
            currentVolunteer._id !== volunteer._id,
        ),
    );

  const getNamesOfOtherMatchedVolunteers = (student: Student) => {
    const otherMatchedVolunteers = currentVolunteers?.filter(
      (currentVolunteer) =>
        (currentVolunteer.matchedStudents as Student[])?.some(
          (matchedStudent) =>
            matchedStudent._id === student._id &&
            currentVolunteer._id !== volunteer._id,
        ),
    );
    return otherMatchedVolunteers?.map((volunteer) => volunteer.firstName);
  };

  // if the requet is loading, show a message
  if (studentLoading) {
    return (
      <div className={styles["match-volunteer-backdrop"]}>
        <div className={styles["match-volunteer-loading-container"]}>
          <MoonLoader color="#209bb6" />
        </div>
      </div>
    );
  }

  // if the request failed, show an error message
  if (studentError || !studentData || matchError) {
    return (
      <div className={styles["match-volunteer-backdrop"]}>
        <div className={styles["match-volunteer-loading-container"]}>
          <FullPageErrorDisplay refetch={makeStudentRequest} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles["match-volunteer-backdrop"]}>
      <div className={styles["match-volunteer-container"]}>
        <div className={styles["match-volunteer-header"]}>
          {`Match ${volunteer.firstName} with a student`}
          <button
            className={styles["match-volunteer-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["match-volunteer-cancel-button-icon"]}
            />
          </button>
        </div>
        <div className={styles["match-volunteer-content"]}>
          <div className={styles["match-volunteer-left"]}>
            <Accordion headerText={`Students (${studentData.length})`} showAll>
              {studentData.map((student) => (
                <StudentMatchLineItem
                  key={student._id}
                  student={student}
                  selectStudent={handleSetSelectedStudent}
                  isSelected={selectedStudent?._id === student._id}
                  alreadyMatched={
                    isAlreadyMatchedToThisVolunteer(student) ||
                    isAlreadyMatchedToAnotherVolunteer(student)
                  }
                  otherVolunteerMatchesLabel={
                    isAlreadyMatchedToAnotherVolunteer(student)
                      ? `(${getNamesOfOtherMatchedVolunteers(student)?.join(
                          ", ",
                        )})`
                      : ""
                  }
                />
              ))}
            </Accordion>
          </div>
          <div className={styles["match-volunteer-right"]}>
            {selectedStudent ? (
              <div className={styles["match-volunteer-pdf-preview-container"]}>
                {selectedStudent.studentLetterLink ? (
                  <Document
                    file={selectedStudent.studentLetterLink}
                    className={styles["match-volunteer-pdf-preview"]}
                  >
                    <Page
                      pageNumber={1}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      height={350}
                    />
                  </Document>
                ) : (
                  <div className={styles["match-volunteer-student-info"]}>
                    <FontAwesomeIcon
                      icon={faFileCircleXmark}
                      color="#DDDDDD"
                      className={styles["match-volunteer-student-info-icon"]}
                    />
                    <div>{`No student letter for ${selectedStudent.firstName} ${selectedStudent.lastInitial}`}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles["match-volunteer-student-no-selection"]}>
                Select a student to match...
              </div>
            )}
          </div>
        </div>
        <div className={styles["match-volunteer-submit-container"]}>
          <LoadingButton
            text={selectedStudent ? "Match Volunteer" : "Select a Student"}
            icon={faHandshake}
            isLoading={matchLoading}
            isLoadingText="Matching Volunteer..."
            onClick={onSubmitMatchVolunteer}
            disabled={!selectedStudent}
            variant={
              selectedStudent
                ? LoadingButtonVariant.GREEN
                : LoadingButtonVariant.GREY
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MatchVolunteerModal;
