/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { Teacher } from "../interfaces/User.interface";

// User context types
interface TeachersContextType {
  currentTeachers: Teacher[] | null;
  setCurrentTeachers: (classes: Teacher[]) => void;
}

// Create the context for the user
const TeachersContext = createContext<TeachersContextType>({
  currentTeachers: null,
  setCurrentTeachers: (_: Teacher[]) => {},
});

// Create the wrapper for the user context
export const TeachersProvider = ({ children }: PropsWithChildren) => {
  const [currentTeachers, setCurrentTeachers] = useState<Teacher[]>(
    [] as Teacher[],
  );

  const value = {
    currentTeachers,
    setCurrentTeachers,
  };

  return (
    <TeachersContext.Provider value={value}>
      {children}
    </TeachersContext.Provider>
  );
};

/**
 * A hook to use the teachers context
 * @returns {TeachersContextType} The teachers context
 * @example
 * ```tsx
 * const { currentTeachers, setCurrentTeachers } = useTeachersContext();
 * ```
 */
export const useTeachersContext = () => {
  const context = useContext(TeachersContext);

  if (context === undefined) {
    throw new Error(
      "useTeachersContext must be used within a TeachersProvider",
    );
  }

  return context;
};
