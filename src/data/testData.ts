import { ApprovalStatus, Role } from "../interfaces/user.interface";
import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import type {
  Admin,
  Student,
  Class,
  Teacher,
  Volunteer,
} from "../interfaces/user.interface";

export const createTestAdmin = () =>
  ({
    _id: new mongoose.Types.ObjectId().toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.ADMIN,
    authToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
  }) as Admin;

export const createTestStudent = () =>
  ({
    _id: new mongoose.Types.ObjectId().toString(),
    firstName: faker.person.firstName(),
    lastInitial: faker.person.lastName().charAt(0),
    readingLevel: faker.number.bigInt({ min: 100, max: 1500 }).toString(),
  }) as Student;

export const createTestClass = () =>
  ({
    _id: new mongoose.Types.ObjectId().toString(),
    name: faker.word.adjective() + " " + faker.word.noun() + " Class",
    teacherId: new mongoose.Types.ObjectId().toString(),
  }) as Class;

export const createTestTeacher = () =>
  ({
    _id: new mongoose.Types.ObjectId().toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.TEACHER,
    authToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    approvalStatus: randomApprovalStatus(),
  }) as Teacher;

export const createTestVolunteer = () =>
  ({
    _id: new mongoose.Types.ObjectId().toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.VOLUNTEER,
    authToken: faker.string.uuid(),
    refreshToken: faker.string.uuid(),
    approvalStatus: randomApprovalStatus(),
  }) as Volunteer;

export const randomApprovalStatus = () => {
  const approvalStatuses = [
    ApprovalStatus.APPROVED,
    ApprovalStatus.PENDING,
    ApprovalStatus.REJECTED,
  ];
  return approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)];
};