/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { TabOptions } from "../interfaces/Users.interface";

// User context types
interface NavigationContextType {
  currentTab: TabOptions | null;
  setCurrentTab: (_: TabOptions | null) => void;
}

// Create the context for the user
const NavigationContext = createContext<NavigationContextType>({
  currentTab: null,
  setCurrentTab: (_: TabOptions | null) => {},
});

// Create the wrapper for the user context
export const NavigationProvider = ({ children }: PropsWithChildren) => {
  const [currentTab, setCurrentTab] = useState<TabOptions | null>(null);

  const value = {
    currentTab: currentTab,
    setCurrentTab: setCurrentTab,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * A hook to use the navigation context
 * @returns {NavigationContextType} The navigation context
 * @example
 * ```tsx
 * const { currentTab, setCurrentTab } = useNavigationContext();
 * ```
 */
export const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (context === undefined) {
    throw new Error("useNavigationProvider must be used within a UserProvider");
  }

  return context;
};
