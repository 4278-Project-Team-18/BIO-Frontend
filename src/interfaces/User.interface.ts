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
  firstName: string;
  _id: string;
  lastName: string;
  email: string;
  role: Role;
  authToken: string;
  refreshToken: string;
}

/**
 * @interface Admin - Extends User
 *
 * @param {string} firstName - The user's first name
 * @param {string} _id - The user's unique id
 * @param {string} lastName - The user's last name
 * @param {string} email - The user's email
 * @param {Role} role - The user's role (`Role.ADMIN`)
 * @param {string} authToken - The user's auth token
 * @param {string} refreshToken - The user's refresh token
 */
export interface Admin extends User {
  role: Role.ADMIN;
}

/**
 * @interface Volunteer - Extends User
 *
 * @param {string} firstName - The user's first name
 * @param {string} _id - The user's unique id
 * @param {string} lastName - The user's last name
 * @param {string} email - The user's email
 * @param {Role} role - The user's role (`Role.VOLUNTEER`)
 * @param {string} authToken - The user's auth token
 * @param {string} refreshToken - The user's refresh token
 * @param {string[]} matchedStudents - The mongo id's of the students matched to the volunteer
 * @param {string} approvalStatus - The volunteer's approval status
 */
export interface Volunteer extends User {
  role: Role.VOLUNTEER;
  matchedStudents?: string[];
  approvalStatus: string;
}

/**
 * @interface Teacher - Extends User
 *
 * @param {string} firstName - The user's first name
 * @param {string} _id - The user's unique id
 * @param {string} lastName - The user's last name
 * @param {string} email - The user's email
 * @param {Role} role - The user's role (`Role.TEACHER`)
 * @param {string} authToken - The user's auth token
 * @param {string} refreshToken - The user's refresh token
 * @param {string[]} classes - The mongo id's of the classes owned by the teacher
 */
export interface Teacher extends User {
  role: Role.TEACHER;
  classes?: Class[];
}

/**
 * UserWithRole - Joint type of all user types
 * @type Admin - An admin user
 * @type Volunteer - A volunteer user
 * @type Teacher - A teacher user
 */
export type UserWithRole = Admin | Volunteer | Teacher;

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
 */
export interface Student {
  _id: string;
  firstName: string;
  lastInitial: string;
  readingLevel?: string;
  studentLetterLink?: string;
  volunteerResponseLetterLink?: string;
}

/**
 * @option {string} ADMIN - The admin role
 * @option {string} VOLUNTEER - The volunteer role
 * @option {string} TEACHER - The teacher roles
 */
export enum Role {
  ADMIN = "admin",
  VOLUNTEER = "volunteer",
  TEACHER = "teacher",
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
 */
export enum AdminTabs {
  DASHBOARD = "dashboard",
  CLASSES = "classes",
  VOLUNTEERS = "volunteers",
}

/**
 * @type TabOptions - Joint type of all tab types
 */
export type TabOptions = AdminTabs;
