import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required("First name is required."),
  lastName: yup.string().required("Last name is required."),
  email: yup.string().email().required("Email is required."),
  password: yup.string().required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Confirm password is required."),
});

export const signUpCodeSchema = yup.object().shape({
  code: yup.string().required("Code is required."),
});
