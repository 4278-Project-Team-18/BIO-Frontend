import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs } from "../../../interfaces/User.interface";
import { useEffect } from "react";

const AdminDashboardTab = () => {
  const { setCurrentTab } = useNavigationContext();

  // on page render
  useEffect(() => {
    // set the current tab on render
    setCurrentTab(AdminTabs.DASHBOARD);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboardTab;
