import { ClassesProvider } from "./context/Classes.context";
import { InvitesProvider } from "./context/Invites.context";
import { TeachersProvider } from "./context/Teachers.context";
import { VolunteersProvider } from "./context/Volunteers.context";
import App from "./layout/App";
import AdminApplicantsTab from "./pages/admin/AdminApplicantsTab/AdminApplicantsTab";
import AdminClassesTab from "./pages/admin/AdminClassesTab/AdminClassesTab";
import AdminDashboardTab from "./pages/admin/AdminDashboardTab/AdminDashboardTab";
import AdminVolunteersTab from "./pages/admin/AdminVolunteersTab/AdminVolunteersTab";
import AuthPage from "./pages/auth/AuthPage";
import { AuthPageVariant } from "./pages/auth/AuthPage.definitions";
import { RequestMethods, useCustomFetch } from "./api/request.util";
import { useUserContext } from "./context/User.context";
import { Role, type UserType } from "./interfaces/User.interface";
import TeacherDashboardTab from "./pages/teacher/TeacherDashboardTab/TeacherDashboardTab";
import VolunteerDashboardTab from "./pages/volunteer/VolunteerDashboardTab/VolunteerDashboardTab";
import FullPageErrorDisplay from "./components/FullPageErrorDisplay/FullPageErrorDisplay";
import TeacherClassesTab from "./pages/teacher/TeacherClassesTab/TeacherClassesTab";
import FullPageLoadingIndicator from "./components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import { createBrowserRouter } from "react-router-dom";
import { Navigate, RouterProvider } from "react-router";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const AppRouter = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { signOut } = useAuth();
  const { setCurrentUser } = useUserContext();

  // request to get the user
  const {
    data: userData,
    error: userError,
    loading: userLoading,
    makeRequest: makeUserRequest,
  } = useCustomFetch<UserType>(
    `/accounts?accountEmail=${user?.emailAddresses[0].emailAddress}`,
    RequestMethods.GET_WAIT,
  );

  // get the user on page render
  useEffect(() => {
    if (isSignedIn && isLoaded) {
      makeUserRequest();
    }
  }, [isLoaded]);

  // once the user is fetched, set the current user
  useEffect(() => {
    if (userData && !userError) {
      setCurrentUser(userData);
    }

    // if there is an error, sign out
    if (userError) {
      signOut();
    }
  }, [userData]);

  // if the user has not been fetched, show the loading indicator
  if (!isLoaded || userLoading || !userData)
    return <FullPageLoadingIndicator />;

  // if the user signed in but we failed to fetch the user, sign out
  if (isLoaded && !userLoading && !userData) signOut();

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
                <Navigate to="/dashboard" />
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
                <Navigate to="/dashboard" />
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
                {userData?.role === Role.ADMIN ? (
                  <AdminDashboardTab />
                ) : userData?.role === Role.TEACHER ? (
                  <TeacherDashboardTab />
                ) : userData?.role === Role.VOLUNTEER ? (
                  <VolunteerDashboardTab />
                ) : (
                  <FullPageErrorDisplay
                    refetch={makeUserRequest}
                    refetchText="Try again"
                    errorText="Uh oh! You can't access this page"
                  />
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
                {userData?.role === Role.ADMIN ? (
                  <TeachersProvider>
                    <ClassesProvider>
                      <AdminClassesTab />
                    </ClassesProvider>
                  </TeachersProvider>
                ) : userData?.role === Role.TEACHER ? (
                  <ClassesProvider>
                    <TeacherClassesTab />
                  </ClassesProvider>
                ) : userData?.role === Role.VOLUNTEER ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <FullPageErrorDisplay
                    refetch={makeUserRequest}
                    refetchText="Try again"
                    errorText="Uh oh! You can't access this page"
                  />
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
          path: "/applicants",
          element: (
            <>
              <SignedIn>
                <InvitesProvider>
                  <TeachersProvider>
                    <VolunteersProvider>
                      <AdminApplicantsTab />
                    </VolunteersProvider>
                  </TeachersProvider>
                </InvitesProvider>
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
