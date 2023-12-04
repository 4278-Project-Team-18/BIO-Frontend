import styles from "./BookDeliveryDateModal.module.css";
import {
  BookDeliveryDateInputName,
  type BookDeliveryDateInput,
  type BookDeliveryDateModalProps,
} from "./BookDeliveryDateModal.definitions";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import FormInput from "../../components/FormInput/FormInput";
import { FormInputSizeVariant } from "../../components/FormInput/FormInput.definitions";
import { bookDeliveryDateSchema } from "../../resolvers/bookDeliveryDate.resolver";
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
import type { Resolver } from "react-hook-form";
import type { Class } from "../../interfaces/User.interface";

const BookDeliveryDateModal = ({
  closeModal,
  class: classObj,
}: BookDeliveryDateModalProps) => {
  const { updateBookDeliveryDate } = useClassesContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      bookDeliveryDateSchema,
    ) as Resolver<BookDeliveryDateInput>,
    mode: "onSubmit",
    defaultValues: {
      [BookDeliveryDateInputName.BOOK_DELIVERY_DATE]: "",
    },
  });

  const {
    data: bookDeliveryDateResponseData,
    error: bookDeliveryDateResponseError,
    loading: bookDeliveryDateLoading,
    makeRequest: makeBookRequest,
  } = useCustomFetch<Class>(
    `/class/${classObj._id}/updateEstimatedDelivery`,
    RequestMethods.PATCH,
  );

  useEffect(() => {
    if (bookDeliveryDateResponseData) {
      updateBookDeliveryDate(
        classObj._id,
        bookDeliveryDateResponseData.estimatedDelivery || "",
      );
      closeModal();
    }

    if (bookDeliveryDateResponseError) {
      closeModal();
    }
  }, [bookDeliveryDateResponseData]);

  const onSubmitBookSelection = async (data: BookDeliveryDateInput) => {
    await makeBookRequest(data);
  };

  return (
    <div className={styles["select-delivery-date-backdrop"]}>
      <div className={styles["select-delivery-date-container"]}>
        <div className={styles["select-delivery-date-header"]}>
          {`Enter an estimated delivery date for ${classObj.name}`}
          <button
            className={styles["select-delivery-date-cancel-button"]}
            onClick={closeModal}
            type="button"
            aria-label="close-button"
          >
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["select-delivery-date-cancel-button-icon"]}
            />
          </button>
        </div>
        <form
          className={styles["select-delivery-date-form-container"]}
          onSubmit={handleSubmit(onSubmitBookSelection)}
        >
          <FormInput
            name={BookDeliveryDateInputName.BOOK_DELIVERY_DATE}
            type="text"
            control={control}
            placeholder="Enter book delivery date here"
            error={
              errors[BookDeliveryDateInputName.BOOK_DELIVERY_DATE]?.message
            }
            defaultValue={""}
            sizeVariant={FormInputSizeVariant.standard}
            label={`Current Delivery Date: ${classObj?.estimatedDelivery}`}
          />
          <div className={styles["select-delivery-date-submit-container"]}>
            <div className={styles["select-delivery-date-button-container"]}>
              <LoadingButton
                text={"Submit Book Delivery Date"}
                type="submit"
                icon={faCloudArrowUp}
                isLoading={bookDeliveryDateLoading}
                isLoadingText="Submitting Book Delivery Date..."
                isResponsive={false}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookDeliveryDateModal;
