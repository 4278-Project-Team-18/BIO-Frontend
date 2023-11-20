/* eslint-disable autofix/no-unused-vars */

import type { Student, Volunteer } from "../../interfaces/User.interface";

export interface VolunteerLetterInput {
  firstName: string;
  gradeLevel: string;
  bookTitle: string;
  bookAuthor: string;
  message?: string;
}

export enum VolunteerLetterInputName {
  FIRST_NAME = "firstName",
  GRADE_LEVEL = "gradeLevel",
  BOOK_TITLE = "bookTitle",
  BOOK_AUTHOR = "bookAuthor",
  MESSAGE = "message",
}

export interface UploadVolunteerLetterModalProps {
  closeModal: () => void;
  student: Student;
  volunteer: Volunteer;
}
