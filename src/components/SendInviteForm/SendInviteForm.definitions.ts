/* eslint-disable autofix/no-unused-vars */
export interface SendInviteInput {
  email: string;
  inviteeRole: string;
  senderId: string;
}

export enum SendInviteInputName {
  EMAIL = "email",
  INVITEEROLE = "inviteeRole",
  SENDERID = "senderId",
}
