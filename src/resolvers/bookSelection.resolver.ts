import * as yup from "yup";
export const bookSelectionSchema = yup.object().shape({
  bookLink: yup.string().required("Required"),
});
