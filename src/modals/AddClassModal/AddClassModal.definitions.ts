/* eslint-disable autofix/no-unused-vars */

export interface AddClassModalProps {
  closeModal: () => void;
}

/**
 * Interface for the AddClassModal component
 *
 * @param {string} className - name of the class
 * @param {string} teacherId - id of the teacher
 */
export interface NewClassInput {
  className: string;
  teacherId: string;
}

export enum NewClassInputName {
  CLASS_NAME = "className",
  TEACHER_ID = "teacherId",
}
