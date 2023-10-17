/* eslint-disable autofix/no-unused-vars */
export interface SignUpInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export enum SignUpInputName {
  FIRST_NAME = "firstName",
  LAST_NAME = "lastName",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
}

export interface SignUpCodeInput {
  code: string;
}

export enum SignUpCodeName {
  CODE = "code",
}
