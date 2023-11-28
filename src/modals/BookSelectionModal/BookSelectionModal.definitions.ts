/* eslint-disable autofix/no-unused-vars */

import type { Student } from "../../interfaces/User.interface";

export interface BookSelectionInput {
  bookLink: string;
}

export enum BookSelectionInputName {
  BOOK_LINK = "bookLink",
}

export interface BookSelectionModalProps {
  closeModal: () => void;
  student: Student;
}
