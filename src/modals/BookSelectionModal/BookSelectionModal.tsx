import { BookSelectionInputName } from "./BookSelectionModal.definitions";
import styles from "./BookSelectionModal.module.css";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import FormInput from "../../components/FormInput/FormInput";
import { FormInputSizeVariant } from "../../components/FormInput/FormInput.definitions";
import { bookSelectionSchema } from "../../resolvers/bookSelection.resolver";
import LoadingButton from "../../components/LoadingButton/LoadingButton";
import { useClassesContext } from "../../context/Classes.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
    data: bookData,
    error: bookError,
    loading: bookLoading,
    makeRequest: makeBookRequest,
  } = useCustomFetch<string>(
    `/student/${student._id}/addBookLink`,
    RequestMethods.PATCH,
  );

  const onSubmitBookSelection = async (data: BookSelectionInput) => {
    await makeBookRequest(data);
    closeModal();
  };

  useEffect(() => {
    if (bookData && !bookError) {
      console.log(bookData);
      updateAssignedBookLink(student._id, bookData);
      closeModal();
    }
  }, [bookData]);

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
          className={styles["select-book-form-container"]}
          onSubmit={handleSubmit(onSubmitBookSelection)}
        >
          {student.assignedBookLink && (
            <div className={styles["select-book-current-link"]}>
              {`Current Book Link: ${student.assignedBookLink}`}
            </div>
          )}
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
          <div className={styles["select-book-submit-container"]}>
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
        </form>
      </div>
    </div>
  );
};

export default BookSelectionModal;
