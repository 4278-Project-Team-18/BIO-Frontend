import AdminClassesTab from "./pages/admin/AdminClassesTab/AdminClassesTab";
import App from "./layout/App";
import { UserProvider } from "./context/User.context";
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
        element: <Navigate to="/admin" />,
      },
      {
        path: "/admin",
        element: <AdminClassesTab />,
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
