/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext, useState } from "react";
import type { Invite, InviteStatus } from "../interfaces/Invites.interface";
import type { PropsWithChildren } from "react";

// Invites context types
interface InviteContextType {
  currentInvites: Invite[] | null;
  setCurrentInvites: (_: Invite[] | null) => void;
  addInvite: (_: Invite) => void;
  removeInvite: (_: Invite) => void;
  updateInviteStatus: (_: string, __: InviteStatus) => void;
}

// Create the context for the invites
const InviteContext = createContext<InviteContextType>({
  currentInvites: null,
  setCurrentInvites: (_: Invite[] | null) => {},
  addInvite: (_: Invite) => {},
  removeInvite: (_: Invite) => {},
  updateInviteStatus: (_: string, __: InviteStatus) => {},
});

// Create the wrapper for the invites context
export const InvitesProvider = ({ children }: PropsWithChildren) => {
  const [currentInvites, setCurrentInvites] = useState<Invite[] | null>(null);

  const addInvite = (invite: Invite) => {
    if (currentInvites) {
      setCurrentInvites([...currentInvites, invite]);
    } else {
      setCurrentInvites([invite]);
    }
  };

  const removeInvite = (invite: Invite) => {
    if (currentInvites) {
      setCurrentInvites(
        currentInvites.filter(
          (currentInvite) => currentInvite._id !== invite._id,
        ),
      );
    }
  };

  const updateInviteStatus = (email: string, status: InviteStatus) => {
    if (currentInvites) {
      const updatedInvites = currentInvites.map((invite) => {
        if (invite.email === email) {
          return {
            ...invite,
            status: status,
          };
        } else {
          return invite;
        }
      });

      setCurrentInvites(updatedInvites);
    }
  };

  const value = {
    currentInvites: currentInvites,
    setCurrentInvites: setCurrentInvites,
    addInvite: addInvite,
    removeInvite: removeInvite,
    updateInviteStatus: updateInviteStatus,
  };

  return (
    <InviteContext.Provider value={value}>{children}</InviteContext.Provider>
  );
};

/**
 * A hook to use the user context
 * @returns {InviteContextType} The user context
 * @example
 * ```tsx
 * const { currentUser, setCurrentUser } = useUserContext();
 * ```
 */
export const useInvitesContext = () => {
  const context = useContext(InviteContext);

  if (context === undefined) {
    throw new Error("useInvitesProvider must be used within a InvitesProvider");
  }

  return context;
};
