/* eslint-disable autofix/no-unused-vars */

import type { Student } from "../../interfaces/User.interface";

/**
 * @interface NewStudentInput - Interface for a new student input.
 *
 * @param {string} firstName - first name of the student
 * @param {string} lastInitial - last initial of the student
 */
export interface NewEditStudentInput {
  firstName: string;
  lastInitial: string;
  readingLevel: string;
}

/**
 * @enum NewEditStudentInputName - Enum for the name of a new student input (needed for react-hook-form)
 *
 * @param {string} FIRST_NAME - first name of the student
 * @param {string} LAST_INITIAL - last initial of the student
 */
export enum NewEditStudentInputName {
  FIRST_NAME = "firstName",
  LAST_INITIAL = "lastInitial",
  READING_LEVEL = "readingLevel",
}

/**
 * @interface AddEditStudentProps - Interface for the props of the AddStudent component.
 *
 * @param {() => void} closeModal - function to close the modal
 */
export interface AddEditStudentProps {
  closeModal: () => void;
  classId: string;
  student?: Student;
}
