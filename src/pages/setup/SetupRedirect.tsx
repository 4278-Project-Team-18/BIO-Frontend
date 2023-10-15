import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useUserContext } from "../../context/User.context";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router";
import type { Admin, UserWithRole } from "../../interfaces/User.interface";

const SetupRedirect = () => {
  const [completed, setCompleted] = useState<boolean>(false);
  const { user } = useUser();
  const { setCurrentUser } = useUserContext();

  const {
    data: createAdminData,
    // loading: createAdminLoading,
    error: createAdminError,
    makeRequest: createAdminMakeRequest,
  } = useCustomFetch<UserWithRole>(`admin/`, RequestMethods.POST);

  useEffect(() => {
    // Create an admin user if the user is an admin
    const createUser = async () => {
      if (user) {
        await createAdminMakeRequest({
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      }
    };

    createUser();
  }, [user]);

  useEffect(() => {
    if (createAdminData && !createAdminError) {
      setCurrentUser(createAdminData as Admin);
      setCompleted(true);
    }
  }, [createAdminData]);

  // if the admin is created, redirect to the dashboard
  if (completed) return <Navigate to="/dashboard" />;

  return <div>Loading..</div>;
};

export default SetupRedirect;
