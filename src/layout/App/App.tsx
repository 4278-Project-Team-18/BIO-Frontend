import styles from "./App.module.css";
import SideBar from "../Sidebar/Sidebar";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useUserContext } from "../../context/User.context";
import FullPageLoadingIndicator from "../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useUser } from "@clerk/clerk-react";
import type { UserType } from "../../interfaces/User.interface";

const App = () => {
  const { setCurrentUser } = useUserContext();
  const { user } = useUser();

  // request to create the user
  const {
    data: userData,
    error: errorUser,
    loading: userLoading,
    makeRequest: makeUserRequest,
  } = useCustomFetch<UserType>(
    `/accounts?accountEmail=${user?.primaryEmailAddress?.emailAddress}`,
    RequestMethods.GET,
  );

  useEffect(() => {
    makeUserRequest();
  }, []);

  useEffect(() => {
    if (userData) {
      setCurrentUser(userData);
    }
  }, [userData]);

  if (errorUser) {
    return <Navigate to="/sign-in" />;
  }

  if (userLoading || !userData) {
    return <FullPageLoadingIndicator />;
  }

  return (
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
