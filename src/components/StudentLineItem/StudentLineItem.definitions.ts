import type { Student } from "../../interfaces/User.interface";

export interface StudentLineItemProps {
  student: Student;
  openEditModal: (_: string) => void;
  removeStudentFromClass: (_: string) => void;
  removeStudentLoading?: boolean;
}
