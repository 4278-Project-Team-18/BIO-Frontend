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
import { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";
import { volunteerLetterSchema } from "../../resolvers/volunteerLetter.resolver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { MoonLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import { yupResolver } from "@hookform/resolvers/yup";
import type { Student } from "../../interfaces/User.interface";
import type { Resolver } from "react-hook-form";

const UploadVolunteerLetterModal = ({
  closeModal,
  student,
  volunteer,
}: UploadVolunteerLetterModalProps) => {
  const { updateVolunteerLetterLink } = useClassesContext();
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [viewedPreview, setViewedPreview] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<VolunteerLetterInput>({
    resolver: yupResolver(
      volunteerLetterSchema,
    ) as Resolver<VolunteerLetterInput>,
    mode: "onSubmit",
    defaultValues: {
      [VolunteerLetterInputName.FIRST_NAME]: volunteer.firstName || "",
      [VolunteerLetterInputName.GRADE_LEVEL]: "",
      [VolunteerLetterInputName.BOOK_TITLE]: "",
      [VolunteerLetterInputName.BOOK_AUTHOR]: "",
      [VolunteerLetterInputName.MESSAGE]: "",
    },
  });

  const handleGeneratePreview = async () => {
    setViewedPreview(true);
    const { firstName, gradeLevel, bookTitle, bookAuthor } = getValues();
    const letterContent = `Dear ${student.firstName},
        \n\n
        My name is ${firstName}, and I am a ${gradeLevel} student at Case Western Reserve University. 
        I appreciated receiving your letter! For you, I picked out the book "${bookTitle}" by ${bookAuthor}.
        I really enjoyed reading it and I hope you do too. 
        I hope you continue to share your love of reading.
        \n\n
        Sincerely,\n${firstName} and the Book I Own Club`;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(letterContent, 10, 10);

    setPdfFile(
      new File([doc.output("blob")], "letter.pdf", { type: "application/pdf" }),
    );
  };

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
    if (!pdfFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("volunteerId", volunteer._id);
    await makeLetterRequest(formData);
  };

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
        <div className={styles["upload-letter-content"]}>
          <div className={styles["upload-letter-left"]}>
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
          </div>
          <div className={styles["upload-letter-right"]}>
            <div className={styles["upload-letter-pdf-preview-container"]}>
              {"Cannot Load Document"}
            </div>
          </div>
        </div>
        <div className={styles["upload-letter-submit-container"]}>
          <button
            className={styles["upload-letter-generate-preview-button"]}
            onClick={() => handleGeneratePreview()}
            type="button"
          >
            <div className={styles["upload-letter-generate-preview-title"]}>
              {"Generate Preview"}
            </div>
            <FontAwesomeIcon
              icon={faCloudArrowUp}
              className={styles["upload-letter-generate-preview-icon"]}
            />
          </button>
          <LoadingButton
            text={"Submit Letter"}
            icon={faCloudArrowUp}
            isLoading={letterLoading}
            isLoadingText="Uploading Letter..."
            onClick={handleSubmit(onSubmitUploadLetter)}
            disabled={!viewedPreview}
            isResponsive={false}
            variant={
              pdfFile ? LoadingButtonVariant.GREEN : LoadingButtonVariant.GREY
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UploadVolunteerLetterModal;
