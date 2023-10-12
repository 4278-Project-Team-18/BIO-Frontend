/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type {
  ApprovalStatus,
  Student,
  Volunteer,
} from "../interfaces/User.interface";

// User context types
interface VolunteersContextType {
  currentVolunteers: Volunteer[] | null;
  setCurrentVolunteers: (classes: Volunteer[]) => void;
  updateVolunteerApprovalStatus: (
    volunteerId: string,
    approvalStatus: ApprovalStatus,
  ) => void;
  matchVolunteer: (volunteerId: string, students: Student[]) => void;
}

// Create the context for the user
const VolunteersContext = createContext<VolunteersContextType>({
  currentVolunteers: null,
  setCurrentVolunteers: (_: Volunteer[]) => {},
  updateVolunteerApprovalStatus: (_: string, __: ApprovalStatus) => {},
  matchVolunteer: (_: string, __: Student[]) => {},
});

// Create the wrapper for the user context
export const VolunteersProvider = ({ children }: PropsWithChildren) => {
  const [currentVolunteers, setCurrentVolunteers] = useState<Volunteer[]>(
    [] as Volunteer[],
  );

  const updateVolunteerApprovalStatus = (
    volunteerId: string,
    approvalStatus: ApprovalStatus,
  ) => {
    setCurrentVolunteers((prevVolunteers) => {
      const updatedVolunteers = prevVolunteers.map((prevVolunteer) =>
        prevVolunteer._id === volunteerId
          ? {
              ...prevVolunteer,
              approvalStatus,
            }
          : prevVolunteer,
      );
      return updatedVolunteers;
    });
  };

  const matchVolunteer = (volunteerId: string, students: Student[]) => {
    setCurrentVolunteers(
      currentVolunteers.map((volunteer) => {
        if (volunteer._id === volunteerId) {
          return {
            ...volunteer,
            matchedStudents: [
              ...(volunteer.matchedStudents as Student[]),
              ...students,
            ],
          };
        }
        return volunteer;
      }),
    );
  };

  const value = {
    currentVolunteers,
    setCurrentVolunteers,
    updateVolunteerApprovalStatus,
    matchVolunteer,
  };

  return (
    <VolunteersContext.Provider value={value}>
      {children}
    </VolunteersContext.Provider>
  );
};

/**
 * A hook to use the volunteers context
 * @returns {VolunteerContextContextType} The volunteers context
 * @example
 * ```tsx
 * const { currentVolunteers, setCurrentVolunteers } = useVolunteersContext();
 * ```
 */
export const useVolunteersContext = () => {
  const context = useContext(VolunteersContext);

  if (context === undefined) {
    throw new Error(
      "useVolunteersProvider must be used within a VolunteersProvider",
    );
  }

  return context;
};
