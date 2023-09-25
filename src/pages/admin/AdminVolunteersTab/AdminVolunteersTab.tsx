import { useNavigationContext } from "../../../context/Navigation.context";
import { createTestVolunteer } from "../../../data/testData";
import { AdminTabs } from "../../../interfaces/User.interface";
import VolunteerApprovalLineItem from "../../../components/VolunteerLineItem/VolunteerApprovalLineItem";
import Accordion from "../../../components/Accordion/Accordion";
import { useEffect } from "react";

const AdminVolunteersTab = () => {
  const { setCurrentTab } = useNavigationContext();

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.VOLUNTEERS);
  }, []);

  const volunteerTestData = Array.from({ length: 12 }, () =>
    createTestVolunteer(),
  );

  return (
    <div>
      <h1>Admin Volunteers</h1>
      <Accordion title="Volunteer Applicants">
        {volunteerTestData.map((volunteer, index) => (
          <VolunteerApprovalLineItem key={index} volunteer={volunteer} />
        ))}
      </Accordion>
    </div>
  );
};

export default AdminVolunteersTab;
