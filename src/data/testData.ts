import { ApprovalStatus } from "../interfaces/User.interface";
import { faker } from "@faker-js/faker";
import type { Invite, Role } from "../interfaces/Invites.interface";
import type {
  Admin,
  Student,
  Class,
  Teacher,
  Volunteer,
} from "../interfaces/User.interface";

export const createTestAdmin = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });

  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    approvalStatus: randomApprovalStatus(),
  } as Admin;
};

export const createTestStudent = () =>
  ({
    firstName: faker.person.firstName(),
    lastInitial: faker.person.lastName().charAt(0),
    readingLevel: faker.number.bigInt({ min: 100, max: 1500 }).toString(),
  }) as Student;

export const createTestClass = () =>
  ({
    name: faker.word.adjective() + " " + faker.word.noun() + " Class",
  }) as Class;

export const createTestTeacher = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });

  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    approvalStatus: randomApprovalStatus(),
  } as Teacher;
};

export const createTestVolunteer = () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email({
    firstName: firstName,
    lastName: lastName,
  });

  return {
    firstName: firstName,
    lastName: lastName,
    email: email,
    approvalStatus: randomApprovalStatus(),
  } as Volunteer;
};

export const createTestInvite = (role?: Role) =>
  ({
    email: faker.internet.email(),
    role: role || randomRole(),
  }) as Invite;

export const randomApprovalStatus = () => {
  const approvalStatuses = [
    ApprovalStatus.APPROVED,
    ApprovalStatus.PENDING,
    ApprovalStatus.REJECTED,
  ];
  return approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)];
};

export const randomRole = () => {
  const roles = ["teacher", "volunteer", "admin"];
  return roles[Math.floor(Math.random() * roles.length)];
};
