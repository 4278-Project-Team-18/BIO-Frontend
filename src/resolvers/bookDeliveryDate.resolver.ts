import * as yup from "yup";

export const bookDeliveryDateSchema = yup.object().shape({
  newDeliveryDate: yup.string().required("New book delivery date required"),
});
