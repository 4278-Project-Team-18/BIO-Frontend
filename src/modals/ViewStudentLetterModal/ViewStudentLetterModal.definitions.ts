import type { Student } from "../../interfaces/User.interface";

export interface ViewStudentLetterModalProps {
  closeModal: () => void;
  student: Student;
}
