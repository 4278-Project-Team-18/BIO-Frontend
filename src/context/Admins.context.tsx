/* eslint-disable autofix/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";
import type { ApprovalStatus, Admin } from "../interfaces/User.interface";

// User context types
interface AdminsContextType {
  currentAdmins: Admin[] | null;
  setCurrentAdmins: (classes: Admin[]) => void;
  updateAdminApprovalStatus: (
    AdminId: string,
    approvalStatus: ApprovalStatus,
  ) => void;
}

// Create the context for the user
const AdminsContext = createContext<AdminsContextType>({
  currentAdmins: null,
  setCurrentAdmins: (_: Admin[]) => {},
  updateAdminApprovalStatus: (_: string, __: ApprovalStatus) => {},
});

// Create the wrapper for the user context
export const AdminsProvider = ({ children }: PropsWithChildren) => {
  const [currentAdmins, setCurrentAdmins] = useState<Admin[]>([] as Admin[]);

  const updateAdminApprovalStatus = (
    AdminId: string,
    approvalStatus: ApprovalStatus,
  ) => {
    setCurrentAdmins((prevAdmins) => {
      const updatedAdmins = prevAdmins.map((prevAdmin) =>
        prevAdmin._id === AdminId
          ? {
              ...prevAdmin,
              approvalStatus,
            }
          : prevAdmin,
      );
      return updatedAdmins;
    });
  };

  const value = {
    currentAdmins,
    setCurrentAdmins,
    updateAdminApprovalStatus,
  };

  return (
    <AdminsContext.Provider value={value}>{children}</AdminsContext.Provider>
  );
};

/**
 * A hook to use the Admins context
 * @returns {AdminsContextType} The Admins context
 * @example
 * ```tsx
 * const { currentAdmins, setCurrentAdmins } = useAdminsContext();
 * ```
 */
export const useAdminsContext = () => {
  const context = useContext(AdminsContext);

  if (context === undefined) {
    throw new Error("useAdminsContext must be used within a AdminsProvider");
  }

  return context;
};
