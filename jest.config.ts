// Jest configuration file
export default {
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  // just the components folder
  collectCoverageFrom: ["src/components/**/*.{js,jsx,ts,tsx}"],

  // ignore the following files
  coveragePathIgnorePatterns: [
    "src/components/StudentMatchLineItem/StudentMatchLineItem.tsx",
    "src/components/TeacherApprovalLineItem/TeacherApprovalLineItem.tsx",
    "src/components/TeacherUpdateApprovalStatus/TeacherUpdateApprovalStatus.tsx",
    "src/components/AdminUpdateApprovalStatus/AdminUpdateApprovalStatus.tsx",
    "src/components/VolunteerUpdateApprovalStatus/VolunteerUpdateApprovalStatus.tsx",
    "src/components/AdminApprovalLineItem/AdminApprovalLineItem.tsx",
    "src/components/SendInviteForm/SendInviteForm.tsx",
    "src/components/SendInviteForm/SendInviteForm.definitions.ts",
  ],

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  collectCoverage: true,
  coverageDirectory: "coverage",

  // A list of paths to directories that Jest should use to search for files in
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$":
      "<rootDir>/src/util/mockImage.ts",
  },

  // A preset that is used as a base for Jest's configuration
  testEnvironment: "jsdom",

  // The glob patterns Jest uses to detect test files
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
