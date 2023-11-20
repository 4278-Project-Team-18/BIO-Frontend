import styles from "./UploadVolunteerLetterModal.module.css";
import {
  VolunteerLetterInputName,
  type UploadVolunteerLetterModalProps,
  type VolunteerLetterInput,
} from "./UploadVolunteerLetterModal.definitions";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import FullPageErrorDisplay from "../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useClassesContext } from "../../context/Classes.context";
import { FormInputSizeVariant } from "../../components/FormInput/FormInput.definitions";
import FormInput from "../../components/FormInput/FormInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { MoonLoader } from "react-spinners";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { Student } from "../../interfaces/User.interface";

const UploadVolunteerLetterModal = ({
  closeModal,
  student,
}: UploadVolunteerLetterModalProps) => {
  const { updateVolunteerLetterLink } = useClassesContext();

  // form controller
  const {
    control,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<VolunteerLetterInput>({
    mode: "onSubmit",
  });

  const {
    data: studentData,
    loading: studentLoading,
    error: studentError,
    makeRequest: makeStudentRequest,
  } = useCustomFetch<Student[]>(`/student/`);

  const {
    data: letterData,
    loading: letterLoading,
    error: letterError,
    makeRequest: makeLetterRequest,
  } = useCustomFetch<Student>(
    `/student/${student._id}/uploadVolunteerLetter`,
    RequestMethods.POST,
    {},
    true,
  );

  useEffect(() => {
    if (letterData && !letterError) {
      updateVolunteerLetterLink(
        student._id,
        letterData.volunteerResponseLetterLink || "",
      );
      closeModal();
    }
  }, [letterData]);

  const onSubmitUploadLetter = async () => {
    const formData = new FormData();
    //   formData.append("file",  as File);
    await makeLetterRequest(formData);
  };

  // if the requet is loading, show a message
  if (studentLoading || !studentData) {
    return (
      <div className={styles["upload-letter-backdrop"]}>
        <div className={styles["upload-letter-loading-container"]}>
          <MoonLoader color="#209bb6" />
        </div>
      </div>
    );
  }

  if (studentError) {
    return (
      <div className={styles["upload-letter-backdrop"]}>
        <div className={styles["upload-letter-loading-container"]}>
          <FullPageErrorDisplay refetch={makeStudentRequest} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles["upload-letter-backdrop"]}>
      <form
        className={styles["upload-letter-container"]}
        onSubmit={handleSubmit(onSubmitUploadLetter)}
      >
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

        <div className={styles["upload-letter-form-container"]}>
          <FormInput
            name={VolunteerLetterInputName.FIRST_NAME}
            type="text"
            control={control}
            placeholder="First Name"
            error={errors[VolunteerLetterInputName.FIRST_NAME]?.message}
            defaultValue={""}
            sizeVariant={FormInputSizeVariant.compact}
            extraStyles={{ marginTop: "10px" }}
          />
          <FormInput
            name={VolunteerLetterInputName.GRADE_LEVEL}
            type="text"
            control={control}
            placeholder="Grade Level"
            error={errors[VolunteerLetterInputName.GRADE_LEVEL]?.message}
            defaultValue={""}
            sizeVariant={FormInputSizeVariant.compact}
            extraStyles={{ marginTop: "10px" }}
          />
          <FormInput
            name={VolunteerLetterInputName.BOOK_TITLE}
            type="text"
            control={control}
            placeholder="Book Title"
            error={errors[VolunteerLetterInputName.BOOK_TITLE]?.message}
            defaultValue={""}
            sizeVariant={FormInputSizeVariant.compact}
            extraStyles={{ marginTop: "10px" }}
          />
          <FormInput
            name={VolunteerLetterInputName.BOOK_AUTHOR}
            type="text"
            control={control}
            placeholder="Book Author"
            error={errors[VolunteerLetterInputName.BOOK_AUTHOR]?.message}
            defaultValue={""}
            sizeVariant={FormInputSizeVariant.compact}
            extraStyles={{ marginTop: "10px" }}
          />
          <FormInput
            name={VolunteerLetterInputName.MESSAGE}
            type="text"
            control={control}
            placeholder="Message"
            error={errors[VolunteerLetterInputName.MESSAGE]?.message}
            defaultValue={""}
            sizeVariant={FormInputSizeVariant.compact}
            extraStyles={{ marginTop: "10px" }}
          />
        </div>

        <div className={styles["upload-letter-submit-container"]}>
          <LoadingButton
            text={"Submit Letter"}
            icon={faCloudArrowUp}
            type="submit"
            isLoading={letterLoading}
            isLoadingText="Uploading Letter..."
            disabled={false}
            isResponsive={false}
          />
        </div>
      </form>
    </div>
  );
};

export default UploadVolunteerLetterModal;
