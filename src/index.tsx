import { UserProvider } from "./context/User.context";
import { NavigationProvider } from "./context/Navigation.context";
import AppRouter from "./AppRouter";
import "./index.globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ClassesProvider } from "./context/Classes.context";
import { InvitesProvider } from "./context/Invites.context";
import { TeachersProvider } from "./context/Teachers.context";
import { VolunteersProvider } from "./context/Volunteers.context";
import { AdminsProvider } from "./context/Admins.context";
import { ToastContainer } from "react-toastify";
import { ClerkProvider } from "@clerk/clerk-react";
import ReactDOM from "react-dom/client";
import React from "react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

if (!process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Clerk publishable key not found!");
}

const clerkPubKey = process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

root.render(
  <React.StrictMode>
    <UserProvider>
      <ClerkProvider publishableKey={clerkPubKey}>
        <AdminsProvider>
          <InvitesProvider>
            <TeachersProvider>
              <ClassesProvider>
                <VolunteersProvider>
                  <NavigationProvider>
                    <ToastContainer
                      position="bottom-center"
                      autoClose={4000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                    />
                    <AppRouter />
                  </NavigationProvider>
                </VolunteersProvider>
              </ClassesProvider>
            </TeachersProvider>
          </InvitesProvider>
        </AdminsProvider>
      </ClerkProvider>
    </UserProvider>
  </React.StrictMode>,
);
