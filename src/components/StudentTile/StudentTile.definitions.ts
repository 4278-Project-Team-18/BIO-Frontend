import type { Student } from "../../interfaces/User.interface";

export interface StudentTileProps {
  student: Student;
  openVolunteerLetterModal: (_: Student) => void;
}
