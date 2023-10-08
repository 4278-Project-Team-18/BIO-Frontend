/* eslint-disable autofix/no-unused-vars */
export interface Invite {
  _id: string;
  email: string;
  senderId: string;
  role: Role;
  status: Status;
}

export enum Role {
  ADMIN = "admin",
  TEACHER = "teacher",
  STUDENT = "student",
}

export enum Status {
  SENT = "sent",
  OPENED = "opened",
  COMPLETED = "completed",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}
