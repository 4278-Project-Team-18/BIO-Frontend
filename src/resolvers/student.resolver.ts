import * as yup from "yup";

export const newStudentSchema = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastInitial: yup
    .string()
    .test("len", "Must be 1 character", (val) => val?.toString().length === 1)
    .required("Last initial is required."),
});
