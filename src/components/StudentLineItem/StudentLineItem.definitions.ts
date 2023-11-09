import type { Student } from "../../interfaces/User.interface";

export interface StudentLineItemProps {
  student: Student;
  openEditModal: (_: string) => void;
  openUploadLetterModal: (_: Student) => void;
  removeStudentFromClass: (_: string) => void;
  removeStudentLoading?: boolean;
}
