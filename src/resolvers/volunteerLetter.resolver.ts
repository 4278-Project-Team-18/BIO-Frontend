import * as yup from "yup";

export const volunteerLetterSchema = yup.object().shape({
  message: yup.string().required("Message is required."),
});
