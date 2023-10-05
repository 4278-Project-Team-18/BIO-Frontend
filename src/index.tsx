import AdminClassesTab from "./pages/admin/AdminClassesTab/AdminClassesTab";
import App from "./layout/App";
import { UserProvider } from "./context/User.context";
import { NavigationProvider } from "./context/Navigation.context";
import AdminVolunteersTab from "./pages/admin/AdminVolunteersTab/AdminVolunteersTab";
import AdminDashboardTab from "./pages/admin/AdminDashboardTab/AdminDashboardTab";
import { ClassesProvider } from "./context/Classes.context";
import { VolunteersProvider } from "./context/Volunteers.context";
import AdminInvitesTab from "./pages/admin/AdminInvitesTab/AdminInvitesTab";
import { InvitesProvider } from "./context/Invites.context";
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
            <AdminClassesTab />
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
        path: "/admin/invites",
        element: (
          <InvitesProvider>
            <AdminInvitesTab />
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
