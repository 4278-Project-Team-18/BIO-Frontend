import type { Student } from "../../interfaces/User.interface";

export interface StudentTileProps {
  student: Student;
  openViewStudentLetterModal: (_: Student) => void;
  openVolunteerLetterModal: (_: Student) => void;
  openBookSelectionModal: (_: Student) => void;
}
