import styles from "./ViewVolunteerResponsesModal.module.css";
import Accordion from "../../components/Accordion/Accordion";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
  faFileCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import type { Student } from "../../interfaces/User.interface";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import type { ViewVolunteerResponsesModalProps } from "./ViewVolunteerResponsesModal.definitions";

const ViewVolunteerResponsesModal = ({
  closeModal,
  volunteer,
}: ViewVolunteerResponsesModalProps) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleSetSelectedStudent = (student: Student) => {
    setSelectedStudent(student);
  };

  return (
    <div className={styles["view-responses-backdrop"]}>
      <div className={styles["view-responses-container"]}>
        <div className={styles["view-responses-header"]}>
          {`View ${volunteer.firstName}'s responses`}
          <button
            className={styles["view-responses-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["view-responses-cancel-button-icon"]}
            />
          </button>
        </div>
        <div className={styles["view-responses-content"]}>
          <div className={styles["view-responses-left"]}>
            <Accordion
              headerText={`Students (${volunteer.matchedStudents?.length})`}
              showAll
            >
              {(volunteer.matchedStudents as Student[]).map(
                (student, index) => (
                  <div
                    key={index}
                    className={styles["view-responses-student-line-item"]}
                    onClick={() => handleSetSelectedStudent(student)}
                  >
                    <div>
                      &nbsp;&nbsp;
                      {student.firstName + " " + student.lastInitial}
                      &nbsp;&nbsp;&nbsp;
                    </div>
                    {student.volunteerLetterLink ? (
                      <FontAwesomeIcon icon={faCircleCheck} color="#2bd447" />
                    ) : (
                      <FontAwesomeIcon icon={faCircleXmark} color="#BBBBBB" />
                    )}
                  </div>
                ),
              )}
            </Accordion>
          </div>
          <div className={styles["view-responses-right"]}>
            {selectedStudent ? (
              <div className={styles["view-responses-pdf-preview-container"]}>
                {selectedStudent.volunteerLetterLink ? (
                  <Document
                    file={selectedStudent.volunteerLetterLink}
                    className={styles["view-responses-pdf-preview"]}
                  >
                    <Page
                      pageNumber={1}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                      height={350}
                    />
                  </Document>
                ) : (
                  <div className={styles["view-responses-student-info"]}>
                    <FontAwesomeIcon
                      icon={faFileCircleXmark}
                      color="#DDDDDD"
                      className={styles["view-responses-student-info-icon"]}
                    />
                    <div>{`No response letter for ${selectedStudent.firstName} ${selectedStudent.lastInitial}`}</div>
                  </div>
                )}
              </div>
            ) : (
              <div className={styles["view-responses-student-no-selection"]}>
                {"Select a student to view the volunteer's response"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewVolunteerResponsesModal;
