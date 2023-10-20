import { ApprovalStatus, type Admin } from "./User.interface";

/* eslint-disable autofix/no-unused-vars */
export interface Invite {
  _id: string;
  email: string;
  sender: string | Admin;
  role: Role;
  status: InviteStatus;
}

export enum Role {
  ADMIN = "admin",
  TEACHER = "teacher",
  VOLUNTEER = "volunteer",
}

export enum InviteStatus {
  SENT = "sent",
  OPENED = "opened",
  COMPLETED = "completed",
  APPROVED = ApprovalStatus.APPROVED,
  REJECTED = ApprovalStatus.REJECTED,
}
