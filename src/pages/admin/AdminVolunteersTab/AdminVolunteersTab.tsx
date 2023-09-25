import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs } from "../../../interfaces/User.interface";
import { useEffect } from "react";

const AdminVolunteersTab = () => {
  const { setCurrentTab } = useNavigationContext();

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.VOLUNTEERS);
  }, []);

  return (
    <div>
      <h1>Admin Volunteers</h1>
    </div>
  );
};

export default AdminVolunteersTab;
