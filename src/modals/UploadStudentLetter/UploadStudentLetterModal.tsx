import { type UploadStudentLetterModalProps } from "./UploadStudentLetterModal.definition";
import styles from "./UploadStudentLetterModal.module.css";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";
import { useCustomFetch, RequestMethods } from "../../api/request.util";
import FullPageErrorDisplay from "../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import Dropzone from "react-dropzone";

const UploadStudentLetterModal = ({
  closeModal,
  student,
}: UploadStudentLetterModalProps) => {
  const [selectedLetter, setSelectedLetter] = useState<File | null>(null);

  const {
    data: letterData,
    error: letterError,
    loading: letterLoading,
    makeRequest: makeLetterRequest,
  } = useCustomFetch<File>(`/volunteer/match`, RequestMethods.PATCH);

  const onSubmitUploadLetter = async () => {
    await makeLetterRequest({
      studentId: student._id,
      letter: selectedLetter,
    });
  };

  // if the requet is loading, show a message
  if (letterLoading) {
    return (
      <div className={styles["upload-letter-backdrop"]}>
        <div className={styles["upload-letter-loading-container"]}>
          <MoonLoader color="#209bb6" />
        </div>
      </div>
    );
  }

  // if the request failed, show an error message
  if (letterError || !letterData) {
    return (
      <div className={styles["upload-letter-backdrop"]}>
        <div className={styles["upload-letter-loading-container"]}>
          <FullPageErrorDisplay refetch={makeLetterRequest} />
        </div>
      </div>
    );
  }

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
          <Dropzone
            onDrop={(acceptedFiles) => setSelectedLetter(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>{`Upload student letter here`}</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>

        <div className={styles["upload-letter-submit-container"]}>
          <LoadingButton
            text={selectedLetter ? "Sumbit Letter" : "Upload Letter"}
            icon={faHandshake}
            isLoading={letterLoading}
            isLoadingText="Uploading Letter..."
            onClick={onSubmitUploadLetter}
            disabled={!selectedLetter}
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
