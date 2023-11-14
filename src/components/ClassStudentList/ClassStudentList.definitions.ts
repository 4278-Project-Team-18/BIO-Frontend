import type { Class, Student } from "../../interfaces/User.interface";

export interface ClassStudentListProps {
  classObject: Class;
  openUploadLetterModal: (_: Student) => void;
}
