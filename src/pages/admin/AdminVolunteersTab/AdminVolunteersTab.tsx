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
import { useEffect, useState } from "react";
import type { Volunteer } from "../../../interfaces/User.interface";

const AdminVolunteersTab = () => {
  const { setCurrentTab } = useNavigationContext();
  const { currentVolunteers, setCurrentVolunteers } = useVolunteersContext();

  const { data, loading, error, makeRequest } =
    useCustomFetch<Volunteer[]>(`/volunteer`);

  const [matchModalOpen, setMatchModalOpen] = useState<boolean>(false);
  const [currentMatchingVolunteer, setCurrentMatchingVolunteer] =
    useState<Volunteer | null>(null);

  const handleCloseModal = () => {
    setMatchModalOpen(false);
  };

  const handleOpenModal = (volunteer: Volunteer) => {
    setCurrentMatchingVolunteer(volunteer);
    setMatchModalOpen(true);
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
        <Accordion title="Status">
          {volunteers?.map((volunteer, index) => (
            <VolunteerLineItem
              key={index}
              volunteer={volunteer}
              openModal={handleOpenModal}
              closeModal={handleCloseModal}
            />
          ))}
        </Accordion>
      </div>
      <div>
        {matchModalOpen && currentMatchingVolunteer && (
          <MatchVolunteerModal
            closeModal={handleCloseModal}
            volunteer={currentMatchingVolunteer}
          />
        )}
      </div>
    </div>
  );
};

export default AdminVolunteersTab;
