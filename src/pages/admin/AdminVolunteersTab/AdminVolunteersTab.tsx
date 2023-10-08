import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs, ApprovalStatus } from "../../../interfaces/User.interface";
import VolunteerApprovalLineItem from "../../../components/VolunteerApprovalLineItem/VolunteerApprovalLineItem";
import Accordion from "../../../components/Accordion/Accordion";
import VolunteerLineItem from "../../../components/VolunteerLineItem/VolunteerLineItem";
import { useCustomFetch } from "../../../api/request.util";
import { useVolunteersContext } from "../../../context/Volunteers.context";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import { useEffect } from "react";
import type { Volunteer } from "../../../interfaces/User.interface";

const AdminVolunteersTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentVolunteers, setCurrentVolunteers } = useVolunteersContext();

  const { data, loading, error, makeRequest } = useCustomFetch<Volunteer[]>(
    `volunteer/allVolunteers`,
  );

  // set the current tab on render
  useEffect(() => {
    setCurrentTab(AdminTabs.VOLUNTEERS);
  }, []);

  useEffect(() => {
    setCurrentVolunteers(data || []);
  }, [data]);

  if (loading) {
    return <FullPageLoadingIndicator />;
  }

  if (error) {
    return (
      <FullPageErrorDisplay
        errorText="Uh oh! Something went wrong."
        refetch={makeRequest}
      />
    );
  }

  const volunteers = currentVolunteers?.filter(
    (volunteer) => volunteer.approvalStatus === ApprovalStatus.APPROVED,
  );

  const applicants = currentVolunteers?.filter(
    (volunteer) => volunteer.approvalStatus === ApprovalStatus.PENDING,
  );

  return (
    <div>
      <h1>Admin Volunteers</h1>
      <Accordion title="Volunteers">
        {volunteers?.map((volunteer, index) => (
          <VolunteerLineItem key={index} volunteer={volunteer} />
        ))}
      </Accordion>

      <Accordion title="Volunteer Applicants">
        {applicants?.map((volunteer, index) => (
          <VolunteerApprovalLineItem key={index} volunteer={volunteer} />
        ))}
      </Accordion>
    </div>
  );
};

export default AdminVolunteersTab;
