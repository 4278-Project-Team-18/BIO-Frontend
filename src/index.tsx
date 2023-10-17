import AdminClassesTab from "./pages/admin/AdminClassesTab/AdminClassesTab";
import App from "./layout/App";
import { UserProvider } from "./context/User.context";
import { NavigationProvider } from "./context/Navigation.context";
import AdminVolunteersTab from "./pages/admin/AdminVolunteersTab/AdminVolunteersTab";
import AdminDashboardTab from "./pages/admin/AdminDashboardTab/AdminDashboardTab";
import { ClassesProvider } from "./context/Classes.context";
import { VolunteersProvider } from "./context/Volunteers.context";
import AdminInvitesTab from "./pages/admin/AdminInvitesTab/AdminInvitesTab";
import AuthPage from "./pages/auth/AuthPage";
import { AuthPageVariant } from "./pages/auth/AuthPage.definitions";
import { InvitesProvider } from "./context/Invites.context";
import AdminTeachersTab from "./pages/admin/AdminTeachersTab/AdminTeachersTab";
import { TeachersProvider } from "./context/Teachers.context";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

if (!process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Clerk publishable key not found!");
}

const clerkPubKey = process.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

console.log("clerkPubKey", clerkPubKey);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <>
            <SignedIn>
              <Navigate to="/admin/dashboard" />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/*",
        element: (
          <>
            <SignedIn>
              <Navigate to="/admin/dashboard" />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/admin/*",
        element: (
          <>
            <SignedIn>
              <Navigate to="/admin/dashboard" />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <>
            <SignedIn>
              <AdminDashboardTab />
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/admin/classes",
        element: (
          <>
            <SignedIn>
              <ClassesProvider>
                <AdminClassesTab />
              </ClassesProvider>
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/admin/volunteers",
        element: (
          <>
            <SignedIn>
              <VolunteersProvider>
                <AdminVolunteersTab />
              </VolunteersProvider>
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/admin/invites",
        element: (
          <>
            <SignedIn>
              <InvitesProvider>
                <AdminInvitesTab />
              </InvitesProvider>
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
      {
        path: "/admin/teachers",
        element: (
          <>
            <SignedIn>
              <TeachersProvider>
                <AdminTeachersTab />
              </TeachersProvider>
            </SignedIn>
            <SignedOut>
              <Navigate to="/sign-in/" />
            </SignedOut>
          </>
        ),
      },
    ],
  },
  {
    path: "/sign-in/*",
    element: <AuthPage variant={AuthPageVariant.SIGN_IN} />,
  },
  {
    path: "/sign-up/*",
    element: <AuthPage variant={AuthPageVariant.SIGN_UP} />,
  },
]);

root.render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <NavigationProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </NavigationProvider>
    </ClerkProvider>
  </React.StrictMode>,
);
