import type { Student } from "../../interfaces/User.interface";

export interface StudentMatchLineItemProps {
  student: Student;
  selectStudent: (_: Student) => void;
  isSelected: boolean;
  alreadyMatched?: boolean;
  otherVolunteerMatchesLabel?: string;
}
