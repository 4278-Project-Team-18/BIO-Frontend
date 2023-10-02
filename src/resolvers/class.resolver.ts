import * as yup from "yup";

export const newClassSchema = yup.object().shape({
  name: yup.string().required("Class name is required."),
  teacherId: yup.string().required("Teacher is required."),
});
