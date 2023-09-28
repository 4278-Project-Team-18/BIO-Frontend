import * as yup from "yup";

export const newStudentSchema = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastInitial: yup
    .string()
    .required("Last initial is required.")
    .test("len", "Must be 1 character", (val) => val?.toString().length === 1),
  readingLevel: yup.string().required("Reading level is required."),
});
