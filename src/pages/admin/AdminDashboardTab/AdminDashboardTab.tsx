import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs } from "../../../interfaces/User.interface";
import { useUserContext } from "../../../context/User.context";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const AdminDashboardTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { user } = useUser();
  const { currentUser } = useUserContext();

  // on page render
  useEffect(() => {
    // set the current tab on render
    setCurrentTab(AdminTabs.DASHBOARD);

    // After sign up, update the user's role in Clerk's unsafe metadata
    if (user && currentUser && user.unsafeMetadata.role === undefined) {
      user.update({
        unsafeMetadata: {
          role: currentUser.role,
        },
      });
    }
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboardTab;
