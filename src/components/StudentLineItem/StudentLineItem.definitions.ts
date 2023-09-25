import type { Student } from "../../interfaces/user.interface";

export interface StudentLineItemProps {
  student: Student;
  index: number;
  maxIndex: number;
}
