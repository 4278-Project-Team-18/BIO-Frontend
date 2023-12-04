import { type UploadStudentLetterModalProps } from "./UploadStudentLetterModal.definition";
import styles from "./UploadStudentLetterModal.module.css";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import { useEffect, useState } from "react";
import type { Student } from "../../interfaces/User.interface";

const UploadStudentLetterModal = ({
  closeModal,
  student,
}: UploadStudentLetterModalProps) => {
  const { updateStudentLetterLink } = useClassesContext();

  const [selectedLetter, setSelectedLetter] = useState<File | null>(null);
  registerPlugin(FilePondPluginFileValidateType);

  const {
    data: letterData,
    loading: letterLoading,
    error: letterError,
    makeRequest: makeLetterRequest,
  } = useCustomFetch<Student>(
    `/student/${student._id}/uploadStudentLetter`,
    RequestMethods.POST,
    {},
    true,
  );

  useEffect(() => {
    if (letterData && !letterError) {
      updateStudentLetterLink(student._id, letterData.studentLetterLink || "");
      setSelectedLetter(null);
      closeModal();
    }
  }, [letterData]);

  const onSubmitUploadLetter = async () => {
    const formData = new FormData();
    formData.append("file", selectedLetter as File);
    await makeLetterRequest(formData);
  };

  return (
    <div className={styles["upload-letter-backdrop"]}>
      <div className={styles["upload-letter-container"]}>
        <div className={styles["upload-letter-header"]}>
          {`Upload a letter for ${student.firstName} ${student.lastInitial}`}
          <button
            className={styles["upload-letter-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["upload-letter-cancel-button-icon"]}
            />
          </button>
        </div>
        <div className={styles["upload-letter-dropzone-container"]}>
          <FilePond
            files={selectedLetter ? [selectedLetter] : []}
            onupdatefiles={(fileItems) => {
              const file = fileItems.length > 0 ? fileItems[0].file : null;
              setSelectedLetter(file instanceof File ? file : null);
            }}
            allowMultiple={false}
            acceptedFileTypes={["application/pdf"]}
            maxFiles={1}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>
        <div className={styles["upload-letter-submit-container"]}>
          <LoadingButton
            text={"Upload Letter"}
            icon={faCloudArrowUp}
            isLoading={letterLoading}
            isLoadingText="Uploading Letter..."
            onClick={onSubmitUploadLetter}
            disabled={!selectedLetter}
            isResponsive={false}
            variant={
              selectedLetter
                ? LoadingButtonVariant.GREEN
                : LoadingButtonVariant.GREY
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UploadStudentLetterModal;
