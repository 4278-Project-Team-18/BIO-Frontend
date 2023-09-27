/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { UserWithRole } from "../interfaces/User.interface";

// User context types
interface UserContextType {
  currentUser: UserWithRole | null;
  setCurrentUser: (_: UserWithRole | null) => void;
}

// Create the context for the user
const UserContext = createContext<UserContextType>({
  currentUser: null,
  setCurrentUser: (_: UserWithRole | null) => {},
});

// Create the wrapper for the user context
export const UserProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<UserWithRole | null>(null);

  const value = {
    currentUser,
    setCurrentUser,
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
