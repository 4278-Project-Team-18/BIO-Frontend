import { useNavigationContext } from "../../../context/Navigation.context";
import { VolunteerTabs } from "../../../interfaces/User.interface";
import { useEffect } from "react";

const VolunteerDashboardTab = () => {
  const { setCurrentTab } = useNavigationContext();

  // on page render
  useEffect(() => {
    // set the current tab on render
    setCurrentTab(VolunteerTabs.DASHBOARD);
  }, []);

  return <div>VolunteerDashboardTab</div>;
};

export default VolunteerDashboardTab;
