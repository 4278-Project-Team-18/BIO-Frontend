import styles from "./ViewStudentLetterModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useState } from "react";
import type { ViewStudentLetterModalProps } from "./ViewStudentLetterModal.definitions";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const ViewStudentLetterModal = ({
  closeModal,
  student,
}: ViewStudentLetterModalProps) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [height, setHeight] = useState<number>(800);
  const [currentWidth, setCurrentWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    if (currentWidth < 800 && height !== 300) {
      setHeight(500);
    }

    if (currentWidth > 800 && height !== 800) {
      setHeight(800);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, [currentWidth, window.innerWidth]);

  return (
    <div className={styles["view-student-letter-backdrop"]}>
      <div className={styles["view-student-letter-container"]}>
        <div className={styles["view-student-letter-header"]}>
          {`View ${student.firstName} ${student.lastInitial}'s letter`}
          <button
            className={styles["view-student-letter-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["view-student-letter-cancel-button-icon"]}
            />
          </button>
        </div>
        <div className={styles["view-student-letter-content"]}>
          <div className={styles["view-student-letter-file-preview-container"]}>
            <Document
              file={student.studentLetterLink}
              className={styles["upload-letter-pdf-preview"]}
            >
              <Page
                pageNumber={1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
                height={height}
              />
            </Document>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentLetterModal;
