import styles from "./MatchVolunteerModal.module.css";
import { type MatchVolunteerModalProps } from "./MatchVolunteerModal.defintions";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import Accordion from "../../components/Accordion/Accordion";
import StudentMatchLineItem from "../../components/StudentMatchLineItem/StudentMatchLineItem";
import FullPageErrorDisplay from "../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import type { Student, Volunteer } from "../../interfaces/User.interface";

const MatchVolunteerModal = ({
  closeModal,
  volunteer,
}: MatchVolunteerModalProps) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
    makeRequest: makeStudentRequest,
  } = useCustomFetch<Student[]>(`student/allStudents`);

  // request to patch student to volunteer
  const {
    data: matchData,
    error: matchError,
    loading: matchLoading,
    makeRequest: makeMatchRequest,
  } = useCustomFetch<Volunteer>(
    `volunteer/matchVolunteerToStudent`,
    RequestMethods.PATCH,
  );

  // send the request to match the volunteer
  const onSubmitMatchVolunteer = async () => {
    console.log("selected student", selectedStudent);
    console.log("volunteer", volunteer);
    await makeMatchRequest({
      volunteerId: volunteer._id,
      studentIdArray: [selectedStudent?._id],
    });
    console.log(matchData);
  };

  const handleSetSelectedStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  useEffect(() => {
    if (matchData) {
      //matchVolunteer();
      setSelectedStudent(null);
      closeModal();
    }
  }, [matchData]);

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
            <Accordion headerText="Students" showAll>
              {studentData.map((student) => (
                <StudentMatchLineItem
                  key={student._id}
                  student={student}
                  selectStudent={handleSetSelectedStudent}
                  isSelected={selectedStudent?._id === student._id}
                />
              ))}
            </Accordion>
          </div>
          <div className={styles["match-volunteer-right"]}>
            {selectedStudent && (
              <div className={styles["match-volunteer-student-info"]}>
                <div>{`${selectedStudent.firstName} ${selectedStudent.lastInitial}`}</div>
                <div>{`Reading Level: ${selectedStudent.readingLevel}`}</div>
                <div>Cannot preview document</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles["match-volunteer-submit-container"]}>
          <div className={styles["match-volunteer-submit-inner-container"]}>
            <LoadingButton
              text="Match Volunteer"
              icon={faPlusCircle}
              isLoading={matchLoading}
              isLoadingText="Matching Volunteer..."
              onClick={() => {
                onSubmitMatchVolunteer();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchVolunteerModal;
