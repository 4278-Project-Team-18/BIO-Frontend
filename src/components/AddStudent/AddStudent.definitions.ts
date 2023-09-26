/* eslint-disable autofix/no-unused-vars */
/**
 * @interface NewStudentInput - Interface for a new student input.
 *
 * @param {string} firstName - first name of the student
 * @param {string} lastInitial - last initial of the student
 */
export interface NewStudentInput {
  firstName: string;
  lastInitial: string;
}

/**
 * @enum NewStudentInputName - Enum for the name of a new student input (needed for react-hook-form)
 *
 * @param {string} FIRST_NAME - first name of the student
 * @param {string} LAST_INITIAL - last initial of the student
 */
export enum NewStudentInputName {
  FIRST_NAME = "firstName",
  LAST_INITIAL = "lastInitial",
}

/**
 * @interface AddStudentProps - Interface for the props of the AddStudent component.
 *
 * @param {() => void} closeModal - function to close the modal
 */
export interface AddStudentProps {
  closeModal: () => void;
  classId: string;
}
