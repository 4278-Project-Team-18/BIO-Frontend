/* eslint-disable autofix/no-unused-vars */

import type { Student } from "../../interfaces/User.interface";

export interface BookSelectionInput {
  newBookLink: string;
}

export enum BookSelectionInputName {
  BOOK_LINK = "newBookLink",
}

export interface BookSelectionModalProps {
  closeModal: () => void;
  student: Student;
}
