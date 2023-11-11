import type { Student } from "../../interfaces/User.interface";

export interface UploadStudentLetterModalProps {
  closeModal: () => void;
  student: Student;
}
