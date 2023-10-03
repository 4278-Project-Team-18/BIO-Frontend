/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Volunteer } from "../interfaces/User.interface";

// User context types
interface VolunteersContextType {
  currentVolunteers: Volunteer[] | null;
  setCurrentVolunteers: (classes: Volunteer[]) => void;
}

// Create the context for the user
const VolunteersContext = createContext<VolunteersContextType>({
  currentVolunteers: null,
  setCurrentVolunteers: (_: Volunteer[]) => {},
});

// Create the wrapper for the user context
export const VolunteersProvider = ({ children }: PropsWithChildren) => {
  const [currentVolunteers, setCurrentVolunteers] = useState<Volunteer[]>(
    [] as Volunteer[],
  );

  const value = {
    currentVolunteers,
    setCurrentVolunteers,
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