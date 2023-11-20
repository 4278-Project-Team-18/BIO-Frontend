import * as yup from "yup";

export const volunteerLetterSchema = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  gradeLevel: yup.string().required("Grade level is required."),
  bookTitle: yup.string().required("Book title is required."),
  bookAuthor: yup.string().required("Book author is required."),
  message: yup.string(),
});
