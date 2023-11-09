import styles from "./StudentLineItem.module.css";
import LineItemLabel from "../FileUploadedLabel/LineItemLabel";
import { LineItemLabelVariant } from "../FileUploadedLabel/LineItemLabel.definitions";
import UploadStudentLetterModal from "../../modals/UploadStudentLetter/UploadStudentLetterModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquare,
  faSquareCheck,
  faCircleCheck,
} from "@fortawesome/free-regular-svg-icons";
import { MoonLoader } from "react-spinners";
import { useState } from "react";
import type { StudentLineItemProps } from "./StudentLineItem.definitions";

const StudentLineItem = ({
  student,
  openEditModal,
  removeStudentFromClass,
  removeStudentLoading = false,
}: StudentLineItemProps) => {

  const [uploadLetterModalOpen, setUploadLetterModalOpen] = useState<boolean>(false);

  const handleCloseUploadLetterModal = () => {
    setUploadLetterModalOpen(false);
  };

  const handleOpenUploadLetterModal = () => {
    setUploadLetterModalOpen(true);
  };

   return (<div className={styles["line-item-container"]}>
   <div className={styles["line-item-container-left"]}>
     <div className={styles["line-item-checkbox"]}>
       {student.studentLetterLink ? (
         <FontAwesomeIcon
           icon={faSquareCheck}
           className={styles["line-item-checkbox-checked"]}
         />
       ) : (
         <FontAwesomeIcon
           icon={faSquare}
           className={styles["line-item-checkbox-unchecked"]}
         />
       )}
     </div>
     <div className={styles["line-item-student-info"]}>
       <div
         className={styles["line-item-name"]}
       >{`${student.firstName} ${student.lastInitial}`}</div>
       <div
         className={styles["line-item-reading-level"]}
       >{`Reading level: ${student.readingLevel}`}</div>
     </div>
   </div>
   <div className={styles["line-item-container-right"]}>
     {student.studentLetterLink && (
       <LineItemLabel
         variant={LineItemLabelVariant.GREEN}
         label={" Student Letter"}
         icon={faCircleCheck}
       />
     )}
     <button className={styles["line-item-upload-button"]}
     onClick={handleOpenUploadLetterModal}>
       <div className={styles["line-item-upload-title"]}>
         {student.studentLetterLink ? "Reupload" : "Upload"}
       </div>
       <FontAwesomeIcon
         icon={faCloudArrowUp}
         className={styles["line-item-upload-icon"]}
       />
       {uploadLetterModalOpen && <UploadStudentLetterModal closeModal={handleCloseUploadLetterModal} student={student}/>}
     </button>
     <div className={styles["line-item-actions"]}>
       <button
         className={styles["line-item-edit-button"]}
         onClick={() => openEditModal(student._id)}
       >
         <FontAwesomeIcon icon={faPencil} />
       </button>
       {removeStudentLoading ? (
         <div className={styles["line-item-remove-button-spinner"]}>
           <MoonLoader color="#434343" size={16} />
         </div>
       ) : (
         <button
           className={styles["line-item-remove-button"]}
           onClick={() => removeStudentFromClass(student._id)}
         >
           <FontAwesomeIcon icon={faTrash} />
         </button>
       )}
     </div>
   </div>
 </div>
);


}

export default StudentLineItem;
