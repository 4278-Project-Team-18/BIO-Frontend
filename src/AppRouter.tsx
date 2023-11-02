import { ClassesProvider } from "./context/Classes.context";
import { InvitesProvider } from "./context/Invites.context";
import { TeachersProvider } from "./context/Teachers.context";
import { VolunteersProvider } from "./context/Volunteers.context";
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
import TeacherClassesTab from "./pages/teacher/TeacherClassesTab/TeacherClassesTab";
import VolunteerMatchesTab from "./pages/volunteer/VolunteerMatchesTab/VolunteerMatchesTab";
import { useUserContext } from "./context/User.context";
import { createBrowserRouter } from "react-router-dom";
import { Navigate, RouterProvider } from "react-router";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

const AppRouter = () => {
  const { currentUser } = useUserContext();

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
                {currentUser?.role !== undefined ? (
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
          element: (
            <>
              <SignedIn>
                <Navigate to="/" />
              </SignedIn>
              <SignedOut>
                <Navigate to="/sign-in/" />
              </SignedOut>
            </>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <>
              <SignedIn>
                {currentUser?.role === Role.ADMIN ? (
                  <AdminDashboardTab />
                ) : currentUser?.role === Role.TEACHER ? (
                  <TeacherDashboardTab />
                ) : currentUser?.role === Role.VOLUNTEER ? (
                  <VolunteerDashboardTab />
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
                {currentUser?.role === Role.ADMIN ? (
                  <TeachersProvider>
                    <ClassesProvider>
                      <AdminClassesTab />
                    </ClassesProvider>
                  </TeachersProvider>
                ) : currentUser?.role === Role.TEACHER ? (
                  <ClassesProvider>
                    <TeacherClassesTab />
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
          path: "/volunteers",
          element: (
            <>
              <SignedIn>
                {currentUser?.role === Role.ADMIN ? (
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
                {currentUser?.role === Role.ADMIN ? (
                  <InvitesProvider>
                    <TeachersProvider>
                      <VolunteersProvider>
                        <AdminApplicantsTab />
                      </VolunteersProvider>
                    </TeachersProvider>
                  </InvitesProvider>
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
          path: "/matches/",
          element: (
            <>
              <SignedIn>
                {currentUser?.role === Role.VOLUNTEER ? (
                  <VolunteerMatchesTab />
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
