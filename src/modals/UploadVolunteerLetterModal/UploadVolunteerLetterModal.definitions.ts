/* eslint-disable autofix/no-unused-vars */

import type { Student, Volunteer } from "../../interfaces/User.interface";

export interface VolunteerLetterInput {
  message: string;
}

export enum VolunteerLetterInputName {
  MESSAGE = "message",
}

export interface UploadVolunteerLetterModalProps {
  closeModal: () => void;
  student: Student;
  volunteer: Volunteer;
}
