import styles from "./UploadVolunteerLetterModal.module.css";
import {
  VolunteerLetterInputName,
  type UploadVolunteerLetterModalProps,
  type VolunteerLetterInput,
} from "./UploadVolunteerLetterModal.definitions";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useClassesContext } from "../../context/Classes.context";
import { FormInputSizeVariant } from "../../components/FormInput/FormInput.definitions";
import FormInput from "../../components/FormInput/FormInput";
import { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";
import { volunteerLetterSchema } from "../../resolvers/volunteerLetter.resolver";
import Logo from "../../assets/BIOLogo.png";
import { useUserContext } from "../../context/User.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { jsPDF } from "jspdf";
import { yupResolver } from "@hookform/resolvers/yup";
import { Document, Page, pdfjs } from "react-pdf";
import type { Student } from "../../interfaces/User.interface";
import type { Resolver } from "react-hook-form";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

const UploadVolunteerLetterModal = ({
  closeModal,
  student,
  volunteer,
}: UploadVolunteerLetterModalProps) => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const { updateVolunteerLetterLink } = useClassesContext();
  const { updateVolunteerResponseLink } = useUserContext();

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [viewedPreview, setViewedPreview] = useState<boolean>(false);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [previewMessage, setPreviewMessage] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<VolunteerLetterInput>({
    resolver: yupResolver(
      volunteerLetterSchema,
    ) as Resolver<VolunteerLetterInput>,
    mode: "onSubmit",
    defaultValues: {
      [VolunteerLetterInputName.MESSAGE]: "",
    },
  });

  const watchMessage = watch(VolunteerLetterInputName.MESSAGE);

  useEffect(() => {
    if (watchMessage !== previewMessage) {
      console.log(watchMessage);
      console.log(getValues(VolunteerLetterInputName.MESSAGE));
      setHasChanged(true);
    }
  }, [watchMessage]);

  const handleGeneratePreview = async () => {
    setLoadingPreview(true);
    setViewedPreview(true);
    setPreviewMessage(getValues(VolunteerLetterInputName.MESSAGE));
    const { message } = getValues();

    const doc = new jsPDF();
    doc.setFontSize(20);
    const margin = 10;
    const lineHeight = 10;
    const maxWidth = doc.internal.pageSize.width - 2 * margin;

    doc.text(`Dear ${student.firstName},`, margin, lineHeight);
    const lines = doc.splitTextToSize(message, maxWidth);
    lines.forEach((line: string | string[], index: number) => {
      const yPos = 30 + index * lineHeight;
      doc.text(line, margin, yPos);
    });
    doc.text(`Sincerely,`, margin, lines.length * lineHeight + 40);
    doc.text(
      `${volunteer.firstName} from the Book I Own Club`,
      margin,
      lines.length * lineHeight + 50,
    );
    doc.addImage(Logo, "PNG", margin, lines.length * lineHeight + 60, 50, 50);

    setPdfFile(
      new File([doc.output("blob")], "letter.pdf", { type: "application/pdf" }),
    );

    setLoadingPreview(false);
    setHasChanged(false);
  };

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

  const onSubmitUploadLetter = async () => {
    if (!pdfFile) {
      return;
    }
    const formData = new FormData();
    formData.append("file", pdfFile);
    formData.append("volunteerId", volunteer._id);
    await makeLetterRequest(formData);
  };

  useEffect(() => {
    if (letterData && !letterError) {
      updateVolunteerLetterLink(
        student._id,
        letterData.volunteerLetterLink || "",
      );
      updateVolunteerResponseLink(
        student._id,
        letterData.volunteerLetterLink || "",
      );
      setPdfFile(null);
      closeModal();
    }
  }, [letterData]);

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
              <div className={styles["upload-letter-form-header"]}>
                {`Dear ${student.firstName},`}
              </div>
              <FormInput
                name={VolunteerLetterInputName.MESSAGE}
                type="text"
                control={control}
                placeholder="Message"
                error={errors[VolunteerLetterInputName.MESSAGE]?.message}
                defaultValue={""}
                sizeVariant={FormInputSizeVariant.standard}
                paragraph={true}
              />
              <div className={styles["upload-letter-form-signature"]}>
                {`Sincerely,`}
              </div>
              <div className={styles["upload-letter-form-signature"]}>
                {`${volunteer.firstName} from the Book I Own Club`}
              </div>
            </div>
          </div>
          <div className={styles["upload-letter-right"]}>
            <div className={styles["upload-letter-pdf-preview-container"]}>
              {pdfFile ? (
                <Document
                  file={pdfFile}
                  className={styles["upload-letter-pdf-preview"]}
                >
                  <Page
                    pageNumber={1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    height={400}
                  />
                </Document>
              ) : (
                <div className={styles["upload-letter-pdf-preview"]}>
                  {"No Preview Available"}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={styles["upload-letter-submit-container"]}>
          <LoadingButton
            text={"Generate Preview"}
            icon={faCloudArrowUp}
            onClick={() => handleGeneratePreview()}
            isResponsive={false}
            variant={
              pdfFile && !hasChanged
                ? LoadingButtonVariant.GREY
                : LoadingButtonVariant.GREEN
            }
            isLoading={loadingPreview}
          />
          &nbsp;&nbsp;
          <LoadingButton
            text={"Submit Letter"}
            icon={faCloudArrowUp}
            isLoading={letterLoading}
            isLoadingText="Uploading Letter..."
            onClick={handleSubmit(onSubmitUploadLetter)}
            disabled={!viewedPreview || hasChanged || !pdfFile}
            isResponsive={false}
            variant={
              pdfFile && !hasChanged
                ? LoadingButtonVariant.GREEN
                : LoadingButtonVariant.GREY
            }
          />
        </div>
      </div>
    </div>
  );
};

export default UploadVolunteerLetterModal;
