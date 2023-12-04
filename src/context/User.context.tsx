/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type {
  Student,
  UserType,
  Volunteer,
} from "../interfaces/User.interface";

// User context types
interface UserContextType {
  currentUser: UserType | null;
  setCurrentUser: (_: UserType | null) => void;
  updateStudentBookLink: (_: string, __: string) => void;
  updateVolunteerResponseLink: (_: string, __: string) => void;
}

// Create the context for the user
const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: (_: UserType | null) => {},
  updateStudentBookLink: (_: string, __: string) => {},
  updateVolunteerResponseLink: (_: string, __: string) => {},
});

// Create the wrapper for the user context
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  const updateStudentBookLink = (
    studentId: string,
    assignedBookLink: string,
  ) => {
    const newStudents = (
      (currentUser as Volunteer)?.matchedStudents as Student[]
    )?.map((student: Student) => {
      if (student._id === studentId) {
        return {
          ...student,
          assignedBookLink,
        };
      }

      return student;
    });

    setCurrentUser({
      ...(currentUser as UserType),
      matchedStudents: newStudents,
    });
  };

  const updateVolunteerResponseLink = (
    studentId: string,
    volunteerLetterLink: string,
  ) => {
    const newStudents = (
      (currentUser as Volunteer)?.matchedStudents as Student[]
    )?.map((student: Student) => {
      if (student._id === studentId) {
        return {
          ...student,
          volunteerLetterLink,
        };
      }

      return student;
    });

    setCurrentUser({
      ...(currentUser as UserType),
      matchedStudents: newStudents,
    });
  };

  const value = {
    currentUser,
    setCurrentUser,
    updateStudentBookLink,
    updateVolunteerResponseLink,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

/**
 * A hook to use the user context
 * @returns {UserContextType} The user context
 * @example
 * ```tsx
 * const { currentUser, setCurrentUser } = useUserContext();
 * ```
 */
export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserProvider must be used within a UserProvider");
  }

  return context;
};
