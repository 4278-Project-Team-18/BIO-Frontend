import App from "./layout/App/App";
import AdminApplicantsTab from "./pages/admin/AdminApplicantsTab/AdminApplicantsTab";
import AdminClassesTab from "./pages/admin/AdminClassesTab/AdminClassesTab";
import AdminDashboardTab from "./pages/admin/AdminDashboardTab/AdminDashboardTab";
import AdminVolunteersTab from "./pages/admin/AdminVolunteersTab/AdminVolunteersTab";
import AuthPage from "./pages/auth/AuthPage";
import { AuthPageVariant } from "./pages/auth/AuthPage.definitions";
import { Role } from "./interfaces/User.interface";
import TeacherDashboardTab from "./pages/teacher/TeacherDashboardTab/TeacherDashboardTab";
import VolunteerDashboardTab from "./pages/volunteer/VolunteerDashboardTab/VolunteerDashboardTab";
import { useUserContext } from "./context/User.context";
import { getValueFromLocalStorage } from "./util/storage.util";
import { createBrowserRouter } from "react-router-dom";
import { Navigate, RouterProvider } from "react-router";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

const AppRouter = () => {
  const { currentUser } = useUserContext();
  const { user } = useUser();

  const role =
    currentUser?.role || getValueFromLocalStorage("accountRole") || null;

  console.log(user);

  const unprotectedRouter = createBrowserRouter([
    {
      path: "/*",
      element: <Navigate to="/sign-in/" />,
    },
    {
      path: "/sign-in/",
      element: <AuthPage variant={AuthPageVariant.SIGN_IN} />,
    },
    {
      path: "/sign-up/:inviteId?",
      element: <AuthPage variant={AuthPageVariant.SIGN_UP} />,
    },
  ]);

  const protectedRouter = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "/*",
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "/dashboard",
          element:
            role === Role.ADMIN ? (
              <AdminDashboardTab />
            ) : role === Role.TEACHER ? (
              <TeacherDashboardTab />
            ) : role === Role.VOLUNTEER ? (
              <VolunteerDashboardTab />
            ) : (
              <Navigate to="/" />
            ),
        },
        {
          path: "/classes",
          element:
            role === Role.ADMIN ? <AdminClassesTab /> : <Navigate to="/" />,
        },
        {
          path: "/volunteers",
          element:
            role === Role.ADMIN ? <AdminVolunteersTab /> : <Navigate to="/" />,
        },
        {
          path: "/applicants",
          element:
            role === Role.ADMIN ? <AdminApplicantsTab /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <>
      <SignedIn>
        <RouterProvider router={protectedRouter} />
      </SignedIn>
      <SignedOut>
        <RouterProvider router={unprotectedRouter} />
      </SignedOut>
    </>
  );
};

export default AppRouter;
