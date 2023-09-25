import type { Student } from "../../interfaces/User.interface";

export interface StudentLineItemProps {
  student: Student;
  index: number;
  maxIndex: number;
}
