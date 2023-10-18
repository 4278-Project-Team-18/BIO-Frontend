import * as yup from "yup";

export const signUpSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email().required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const signUpCodeSchema = yup.object().shape({
  code: yup.string().required("Code is required."),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required("Required"),
  password: yup.string().required("Required"),
});
