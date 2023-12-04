import * as yup from "yup";

export const bookDeliveryDateSchema = yup.object().shape({
  newEstimatedDelivery: yup
    .string()
    .required("New book delivery date required")
    .matches(
      /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{2}$/,
      "Please enter the date in the format MM/DD/YY",
    ),
});
