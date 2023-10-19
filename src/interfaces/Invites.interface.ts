import type { Admin } from "./User.interface";

/* eslint-disable autofix/no-unused-vars */
export interface Invite {
  _id: string;
  email: string;
  sender: string | Admin;
  role: Role;
  status: Status;
}

export enum Role {
  ADMIN = "admin",
  TEACHER = "teacher",
  VOLUNTEER = "volunteer",
}

export enum Status {
  SENT = "sent",
  OPENED = "opened",
  COMPLETED = "completed",
  APPROVED = "approved",
  REJECTED = "rejected",
}
