import { ClassesProvider } from "./context/Classes.context";
import { InvitesProvider } from "./context/Invites.context";
import { TeachersProvider } from "./context/Teachers.context";
import { VolunteersProvider } from "./context/Volunteers.context";
import { AdminsProvider } from "./context/Admins.context";
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
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const AppRouter = () => {
  const { currentUser } = useUserContext();

  const role =
    currentUser?.role || getValueFromLocalStorage("accountRole") || null;

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
                {role !== null ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/sign-in/" />
                )}
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in/" />
              </SignedOut>
            </>
          ),
        },
        {
          path: "/*",
          element: <Navigate to="/" />,
        },
        {
          path: "/dashboard",
          element: (
            <>
              <SignedIn>
                {role === Role.ADMIN ? (
                  <InvitesProvider>
                    <TeachersProvider>
                      <ClassesProvider>
                        <VolunteersProvider>
                          <AdminDashboardTab />
                        </VolunteersProvider>
                      </ClassesProvider>
                    </TeachersProvider>
                  </InvitesProvider>
                ) : role === Role.TEACHER ? (
                  <ClassesProvider>
                    <TeacherDashboardTab />
                  </ClassesProvider>
                ) : role === Role.VOLUNTEER ? (
                  <ClassesProvider>
                    <VolunteerDashboardTab />
                  </ClassesProvider>
                ) : (
                  <Navigate to="/" />
                )}
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in/" />
              </SignedOut>
            </>
          ),
        },
        {
          path: "/classes",
          element: (
            <>
              <SignedIn>
                {role === Role.ADMIN ? (
                  <TeachersProvider>
                    <ClassesProvider>
                      <AdminClassesTab />
                    </ClassesProvider>
                  </TeachersProvider>
                ) : (
                  <Navigate to="/" />
                )}
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in/" />
              </SignedOut>
            </>
          ),
        },
        {
          path: "/volunteers",
          element: (
            <>
              <SignedIn>
                {role === Role.ADMIN ? (
                  <VolunteersProvider>
                    <AdminVolunteersTab />
                  </VolunteersProvider>
                ) : (
                  <Navigate to="/" />
                )}
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in/" />
              </SignedOut>
            </>
          ),
        },
        {
          path: "/applicants",
          element: (
            <>
              <SignedIn>
                {role === Role.ADMIN ? (
                  <AdminsProvider>
                    <InvitesProvider>
                      <TeachersProvider>
                        <VolunteersProvider>
                          <AdminApplicantsTab />
                        </VolunteersProvider>
                      </TeachersProvider>
                    </InvitesProvider>
                  </AdminsProvider>
                ) : (
                  <Navigate to="/" />
                )}
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
      path: "/sign-in/",
      element: <AuthPage variant={AuthPageVariant.SIGN_IN} />,
    },
    {
      path: "/sign-up/:inviteId?",
      element: <AuthPage variant={AuthPageVariant.SIGN_UP} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
