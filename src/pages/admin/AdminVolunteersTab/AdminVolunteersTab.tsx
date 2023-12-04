import styles from "./AdminVolunteersTab.module.css";
import { useNavigationContext } from "../../../context/Navigation.context";
import { AdminTabs, ApprovalStatus } from "../../../interfaces/User.interface";
import Accordion from "../../../components/Accordion/Accordion";
import VolunteerLineItem from "../../../components/VolunteerLineItem/VolunteerLineItem";
import { useCustomFetch } from "../../../api/request.util";
import { useVolunteersContext } from "../../../context/Volunteers.context";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import MatchVolunteerModal from "../../../modals/MatchVolunteerModal/MatchVolunteerModal";
import ViewVolunteerResponsesModal from "../../../modals/ViewVolunteerResponsesModal/ViewVolunteerResponsesModal";
import { useEffect, useState } from "react";
import type { Volunteer } from "../../../interfaces/User.interface";

const AdminVolunteersTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentVolunteers, setCurrentVolunteers } = useVolunteersContext();

  const { data, loading, error, makeRequest } =
    useCustomFetch<Volunteer[]>(`/volunteer`);

  const [matchModalOpen, setMatchModalOpen] = useState<boolean>(false);
  const [viewModalOpen, setViewModalOpen] = useState<boolean>(false);
  const [currentMatchingVolunteer, setCurrentMatchingVolunteer] =
    useState<Volunteer | null>(null);

  const handleCloseUploadModal = () => {
    setMatchModalOpen(false);
  };

  const handleOpenUploadModal = (volunteer: Volunteer) => {
    setCurrentMatchingVolunteer(volunteer);
    setMatchModalOpen(true);
  };

  const handleOpenViewModal = (volunteer: Volunteer) => {
    setCurrentMatchingVolunteer(volunteer);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setViewModalOpen(false);
  };

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

  return (
    <div>
      <div>
        <div className={styles["admin-volunteers-header"]}>
          <div className={styles["admin-volunteers-title"]}>{`Volunteers`}</div>
        </div>
        <div className={"divider"} />
        <Accordion title="Status">
          {volunteers?.map((volunteer, index) => (
            <VolunteerLineItem
              key={index}
              volunteer={volunteer}
              openMatchModal={handleOpenUploadModal}
              openViewModal={handleOpenViewModal}
            />
          ))}
        </Accordion>
      </div>
      <div>
        {matchModalOpen && currentMatchingVolunteer && (
          <MatchVolunteerModal
            closeModal={handleCloseUploadModal}
            volunteer={currentMatchingVolunteer}
          />
        )}
        {viewModalOpen && currentMatchingVolunteer && (
          <ViewVolunteerResponsesModal
            volunteer={currentMatchingVolunteer}
            closeModal={handleCloseViewModal}
          />
        )}
      </div>
    </div>
  );
};

export default AdminVolunteersTab;
