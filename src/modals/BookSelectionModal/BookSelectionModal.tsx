import { BookSelectionInputName } from "./BookSelectionModal.definitions";
import styles from "./BookSelectionModal.module.css";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import FullPageErrorDisplay from "../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import FormInput from "../../components/FormInput/FormInput";
import { FormInputSizeVariant } from "../../components/FormInput/FormInput.definitions";
import { bookSelectionSchema } from "../../resolvers/bookSelection.resolver";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useClassesContext } from "../../context/Classes.context";
import { MoonLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { Student } from "../../interfaces/User.interface";
import type {
  BookSelectionInput,
  BookSelectionModalProps,
} from "./BookSelectionModal.definitions";
import type { Resolver } from "react-hook-form";

const BookSelectionModal = ({
  closeModal,
  student,
}: BookSelectionModalProps) => {
  const { updateAssignedBookLink } = useClassesContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookSelectionSchema) as Resolver<BookSelectionInput>,
    mode: "onSubmit",
    defaultValues: {
      [BookSelectionInputName.BOOK_LINK]: "",
    },
  });

  const {
    data: studentData,
    error: studentError,
    loading: studentLoading,
    makeRequest: makeStudentRequest,
  } = useCustomFetch<Student>(`/student/`);

  const {
    data: bookData,
    error: bookError,
    loading: bookLoading,
    makeRequest: makeBookRequest,
  } = useCustomFetch<string>(
    `/student/${student._id}/addBookLink`,
    RequestMethods.PATCH,
  );

  useEffect(() => {
    if (bookData && !bookError) {
      updateAssignedBookLink(student._id, bookData);
      closeModal();
    }
  }, [bookData]);

  const onSubmitBookSelection = async (data: BookSelectionInput) => {
    await makeBookRequest(data);
    closeModal();
  };

  if (studentLoading || !studentData) {
    return (
      <div className={styles["select-book-backdrop"]}>
        <div className={styles["select-book-loading-container"]}>
          <MoonLoader color="#209bb6" />
        </div>
      </div>
    );
  }

  if (studentError) {
    return (
      <div className={styles["select-book-backdrop"]}>
        <div className={styles["select-book-loading-container"]}>
          <FullPageErrorDisplay refetch={makeStudentRequest} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles["select-book-backdrop"]}>
      <div className={styles["select-book-container"]}>
        <div className={styles["select-book-header"]}>
          {`Select a book for ${student.firstName} ${student.lastInitial}`}
          <button
            className={styles["select-book-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["select-book-cancel-button-icon"]}
            />
          </button>
        </div>
        <form
          className={styles["select-book-form"]}
          onSubmit={handleSubmit(onSubmitBookSelection)}
        >
          <FormInput
            name={BookSelectionInputName.BOOK_LINK}
            type="text"
            control={control}
            placeholder="Paste book link here"
            error={errors[BookSelectionInputName.BOOK_LINK]?.message}
            defaultValue={""}
            sizeVariant={FormInputSizeVariant.standard}
            extraStyles={{ marginTop: "10px" }}
          />
        </form>
        <div className={styles["select-book-button-container"]}>
          <LoadingButton
            text={"Submit Book Selection"}
            type="submit"
            icon={faCloudArrowUp}
            isLoading={bookLoading}
            isLoadingText="Submitting Book Selection..."
            isResponsive={false}
          />
        </div>
      </div>
    </div>
  );
};

export default BookSelectionModal;
