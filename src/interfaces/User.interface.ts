/* eslint-disable autofix/no-unused-vars */

/**
 * @interface User
 *
 * @param {string} firstName - The user's first name
 * @param {string} _id - The user's unique id
 * @param {string} lastName - The user's last name
 * @param {string} email - The user's email
 * @param {Role} role - The user's role
 * @param {string} authToken - The user's auth token
 * @param {string} refreshToken - The user's refresh token
 */
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  approvalStatus: ApprovalStatus;
  role: Role;
}

/**
 * @interface Admin - Extends User
 *
 * @param {string} firstName - The user's first name
 * @param {string} _id - The user's unique id
 * @param {string} lastName - The user's last name
 * @param {string} email - The user's email
 * @param {ApprovalStatus} approvalStatus - The admin's approval status
 */
export interface Admin extends User {}

/**
 * @interface Volunteer - Extends User
 *
 * @param {string} firstName - The user's first name
 * @param {string} _id - The user's unique id
 * @param {string} lastName - The user's last name
 * @param {string} email - The user's email
 * @param {string[]} matchedStudents - The mongo id's of the students matched to the volunteer
 * @param {ApprovalStatus} approvalStatus - The volunteer's approval status
 */
export interface Volunteer extends User {
  matchedStudents?: string[] | Student[];
}

/**
 * @interface Teacher - Extends User
 *
 * @param {string} firstName - The user's first name
 * @param {string} _id - The user's unique id
 * @param {string} lastName - The user's last name
 * @param {string} email - The user's email
 * @param {string[]} classes - The mongo id's of the classes owned by the teacher
 * @param {ApprovalStatus} approvalStatus - The teacher's approval status
 */
export interface Teacher extends User {
  classes?: Class[] | string[];
}

/**
 * UserTypes - Joint type of all user types
 * @type Admin - An admin user
 * @type Volunteer - A volunteer user
 * @type Teacher - A teacher user
 */
export type UserType = Admin | Volunteer | Teacher;

/**
 * @interface Class
 *
 * @param {string} _id - The class's unique mongo id
 * @param {string} name - The class's name
 * @param {string} teacherId - The mongo id of the teacher who owns the class
 * @param {string[]} students - The mongo id's of the students in the class
 * @param {string} estimatedDelivery - The estimated delivery notes of the class's books
 */
export interface Class {
  _id: string;
  name: string;
  teacherId: string;
  students?: Student[];
  estimatedDelivery?: string;
}

/**
 * @interface Student
 *
 * @param {string} _id - The student's unique mongo id
 * @param {string} firstName - The student's first name
 * @param {string} lastInitial - The student's last initial
 * @param {string} readingLevel - The student's reading level
 * @param {string} studentLetterLink - The link to the student's letter
 * @param {string} volunteerResponseLetterLink - The link to the volunteer's response letter
 * @param {string[]} matchedVolunteer - The mongo id of the volunteer matched to the student
 */
export interface Student {
  _id: string;
  firstName: string;
  lastInitial: string;
  readingLevel?: string;
  studentLetterLink?: string;
  volunteerResponseLetterLink?: string;
  matchedVolunteer?: string[];
}

/**
 * @option {string} PENDING - The pending approval status
 * @option {string} APPROVED - The approved approval status
 * @option {string} REJECTED - The rejected approval status
 */
export enum ApprovalStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

/**
 * @option {string} DASHBOARD - The dashboard tab
 * @option {string} CLASSES - The classes tab
 * @option {string} VOLUNTEERS - The volunteers tab
 * @option {string} TEACHERS - The teachers tab
 */
export enum AdminTabs {
  DASHBOARD = "dashboard",
  CLASSES = "classes",
  VOLUNTEERS = "volunteers",
  TEACHERS = "teachers",
  APPLICANTS = "applicants",
}

/**
 * @option {string} DASHBOARD - The dashboard tab
 * @option {string} STUDENTS - The students tab
 */
export enum VolunteerTabs {
  DASHBOARD = "dashboard",
  MATCHES = "matches",
}

/**
 * @option {string} DASHBOARD - The dashboard tab
 * @option {string} CLASSES - The classes tab
 */
export enum TeacherTabs {
  DASHBOARD = "dashboard",
  CLASSES = "classes",
}

export enum Role {
  ADMIN = "admin",
  TEACHER = "teacher",
  VOLUNTEER = "volunteer",
}

/**
 * @type TabOptions - Joint type of all tab types
 */
export type TabOptions = AdminTabs | VolunteerTabs | TeacherTabs;
