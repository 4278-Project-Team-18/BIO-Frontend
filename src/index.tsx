import AdminClassesTab from "./pages/admin/AdminClassesTab/AdminClassesTab";
import App from "./layout/App";
import { UserProvider } from "./context/User.context";
import { NavigationProvider } from "./context/Navigation.context";
import AdminVolunteersTab from "./pages/admin/AdminVolunteersTab/AdminVolunteersTab";
import AdminDashboardTab from "./pages/admin/AdminDashboardTab/AdminDashboardTab";
import { ClassesProvider } from "./context/Classes.context";
import { VolunteersProvider } from "./context/Volunteers.context";
import { InvitesProvider } from "./context/Invites.context";
import { TeachersProvider } from "./context/Teachers.context";
import AdminApplicantsTab from "./pages/admin/AdminApplicantsTab/AdminApplicantsTab";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.globals.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        // redirect (will be conditional based on user context)
        path: "/",
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "/*",
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "/admin/*",
        element: <Navigate to="/admin/dashboard" />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboardTab />,
      },
      {
        path: "/admin/classes",
        element: (
          <ClassesProvider>
            <TeachersProvider>
              <AdminClassesTab />
            </TeachersProvider>
          </ClassesProvider>
        ),
      },
      {
        path: "/admin/volunteers",
        element: (
          <VolunteersProvider>
            <AdminVolunteersTab />
          </VolunteersProvider>
        ),
      },
      {
        path: "/admin/applicants",
        element: (
          <InvitesProvider>
            <TeachersProvider>
              <VolunteersProvider>
                <AdminApplicantsTab />
              </VolunteersProvider>
            </TeachersProvider>
          </InvitesProvider>
        ),
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <NavigationProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </NavigationProvider>
  </React.StrictMode>,
);
