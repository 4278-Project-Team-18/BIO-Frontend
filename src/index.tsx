import AdminClassesTab from "./pages/admin/AdminClassesTab/AdminClassesTab";
import App from "./layout/App";
import { UserProvider } from "./context/User.context";
import AdminVolunteersTab from "./pages/admin/AdminVolunteersTab/AdminVolunteersTab";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: "/",
    // redirect
    element: <App />,
    children: [
      {
        // redirect (will be conditional based on user context)
        path: "/",
        element: <Navigate to="/admin/classes" />,
      },
      {
        path: "/admin",
        element: <Navigate to="/admin/classes" />,
      },
      {
        path: "/admin/classes",
        element: <AdminClassesTab />,
      },
      {
        path: "/admin/volunteers",
        element: <AdminVolunteersTab />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);
