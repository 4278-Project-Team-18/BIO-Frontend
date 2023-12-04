import * as yup from "yup";

export const bookSelectionSchema = yup.object().shape({
  newBookLink: yup.string().required("New book link required"),
});
