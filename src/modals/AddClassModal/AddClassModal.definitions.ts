/* eslint-disable autofix/no-unused-vars */
import type { Teacher } from "../../interfaces/User.interface";

export interface AddClassModalProps {
  closeModal: () => void;
  teacher?: Teacher;
}

/**
 * Interface for the AddClassModal component
 *
 * @param {string} className - name of the class
 * @param {string} teacherId - id of the teacher
 */
export interface NewClassInput {
  name: string;
  teacherId: string;
}

export enum NewClassInputName {
  CLASS_NAME = "name",
  TEACHER_ID = "teacherId",
}
