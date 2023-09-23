import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs } from "../../../interfaces/user.interface";
import { useEffect } from "react";

const AdminDashboardTab = () => {
  const { setCurrentTab } = useNavigationContext();

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.DASHBOARD);
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
};

export default AdminDashboardTab;
