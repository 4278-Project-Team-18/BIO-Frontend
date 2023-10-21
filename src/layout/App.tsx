import SideBar from "./Sidebar";
import styles from "./App.module.css";
import { RequestMethods, useCustomFetch } from "../api/request.util";
import { useUserContext } from "../context/User.context";
import FullPageLoadingIndicator from "../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import type { UserType } from "../interfaces/User.interface";

const App = () => {
  const { isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const { currentUser, setCurrentUser } = useUserContext();
  const navigate = useNavigate();

  // request to get the user
  const {
    data: userData,
    error: userError,
    loading: userLoading,
    makeRequest: makeUserRequest,
  } = useCustomFetch<UserType>(
    `/accounts?accountEmail=${user?.primaryEmailAddress}`,
    RequestMethods.GET_WAIT,
  );

  useEffect(() => {
    if (isSignedIn && !currentUser) {
      makeUserRequest();
    }
  }, []);

  useEffect(() => {
    if (userData && !userError) {
      setCurrentUser(userData);
    }

    if (userError) {
      signOut();
      navigate("/sign-in");
    }
  }, [userData]);

  return userLoading ? (
    <FullPageLoadingIndicator />
  ) : (
    <div className={styles["app-main-container"]}>
      <div className={styles["app-main-sidebar"]}>
        <SideBar />
      </div>
      <div className={styles["app-main-content"]}>
        <div className={styles["app-main-content-inner-container"]}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default App;
