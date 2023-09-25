import {
  type Admin,
  type Student,
  type Class,
  type Teacher,
  type Volunteer,
  Role,
  ApprovalStatus,
} from "../interfaces/user.interface";
import { faker } from "@faker-js/faker";

export const createTestAdmin = () =>
  ({
    _id: faker.string.alphanumeric(26),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.ADMIN,
    authToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
  }) as Admin;

/**
 * @function createTestStudent
 * @param isTest - optional parameter to determine if the image link should always be generated or not (for snapshots)
 * @returns a student object with random data
 */
export const createTestStudent = () =>
  ({
    _id: faker.string.alphanumeric(26),
    firstName: faker.person.firstName(),
    lastInitial: faker.person.lastName().charAt(0),
    readingLevel: faker.number.bigInt({ min: 100, max: 1500 }).toString(),
    studentLetterLink: randomImageLink(),
    volunteerResponseLetterLink: randomImageLink(),
  }) as Student;

/**
 * @function createTestClass
 * @returns a class object with random data
 */
export const createTestClass = () =>
  ({
    _id: faker.string.alphanumeric(26),
    name: faker.word.adjective() + " " + faker.word.noun() + " Class",
    teacherId: faker.string.alphanumeric(26),
  }) as Class;

/**
 * @function createTestTeacher
 * @returns a teacher object with random data
 */
export const createTestTeacher = () =>
  ({
    _id: faker.string.alphanumeric(26),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.TEACHER,
    authToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    approvalStatus: randomApprovalStatus(),
  }) as Teacher;

/**
 * @function createTestVolunteer
 * @returns a volunteer object with random data
 */
export const createTestVolunteer = () =>
  ({
    _id: faker.string.alphanumeric(26),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.VOLUNTEER,
    authToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    approvalStatus: randomApprovalStatus(),
  }) as Volunteer;

/**
 * @function randomApprovalStatus
 * @returns a random approval status
 */
export const randomApprovalStatus = () => {
  const approvalStatuses = [
    ApprovalStatus.APPROVED,
    ApprovalStatus.PENDING,
    ApprovalStatus.REJECTED,
  ];
  return approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)];
};

export const randomImageLink = () => {
  if (faker.number.int(1) > 5) {
    return faker.internet.url();
  } else {
    return undefined;
  }
};
