import styles from "./MatchVolunteerModal.module.css";
import { type MatchVolunteerModalProps } from "./MatchVolunteerModal.defintions";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import Accordion from "../../components/Accordion/Accordion";
import StudentMatchLineItem from "../../components/StudentMatchLineItem/StudentMatchLineItem";
import FullPageErrorDisplay from "../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
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
    // makeRequest: makeMatchRequest,
  } = useCustomFetch<Volunteer>(
    `/matchVolunteerToStudent`,
    RequestMethods.PATCH,
  );

  // send the request to match the volunteer
  // const onSubmitMatchVolunteer = async () => {
  //   const matchVolunteerRequestData = {
  //     volunteerId: volunteer._id,
  //     studentIds: [selectedStudent?._id],
  //   };
  //   await makeMatchRequest(matchVolunteerRequestData);
  // };

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
        <div
          className={styles["match-volunteer-header"]}
        >{`Match ${volunteer.firstName} with a student`}</div>
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
              <div>
                <div>{`${selectedStudent.firstName} ${selectedStudent.lastInitial}`}</div>
                <div>{`Reading Level: ${selectedStudent.readingLevel}`}</div>
                <div>Cannot preview document</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchVolunteerModal;
