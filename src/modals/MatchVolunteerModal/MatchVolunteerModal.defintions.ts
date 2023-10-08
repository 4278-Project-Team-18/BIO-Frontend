/* eslint-disable autofix/no-unused-vars */

export interface MatchVolunteerModalProps {
  closeModal: () => void;
  volunteerId: string;
}

/**
 * Interface for the MatchVolunteerModal component
 *
 */
export interface MatchVolunteerInput {
  volunteerId: string;
  studentIds: string[];
  teacherId: string;
  classId: string;
}

export enum MatchVolunteerInputName {
  VOLUNTEER_ID = "volunteerId",
  STUDENT_IDS = "studentIds",
  TEACHER_ID = "teacherId",
  CLASS_ID = "classId",
}
