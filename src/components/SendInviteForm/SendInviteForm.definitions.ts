/* eslint-disable autofix/no-unused-vars */
export interface SendInviteInput {
  email: string;
  role: string;
  sender?: string;
}

export enum SendInviteInputName {
  EMAIL = "email",
  ROLE = "role",
}
