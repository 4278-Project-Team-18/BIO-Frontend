import styles from "./VolunteerUpdateApprovalStatus.module.css";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useVolunteersContext } from "../../context/Volunteers.context";
import {
  ApprovalStatus,
  type Volunteer,
} from "../../interfaces/User.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import type { VolunteerUpdateApprovalStatusProps } from "./VolunteerUpdateApprovalStatus.definitions";

const VolunteerUpdateApprovalStatus = ({
  volunteer,
}: VolunteerUpdateApprovalStatusProps) => {
  // request to update the volunteer status
  const {
    data: approveVolunteerResponseData,
    loading: approveVolunteerLoading,
    error: approveVolunteerError,
    makeRequest: approveVolunteer,
  } = useCustomFetch<Volunteer>(
    `volunteer/${volunteer._id}/approve`,
    RequestMethods.PATCH,
  );

  // request to update the volunteer status
  const {
    data: denyVolunteerResponseData,
    loading: denyVolunteerLoading,
    error: denyVolunteerError,
    makeRequest: denyVolunteer,
  } = useCustomFetch<Volunteer>(
    `volunteer/${volunteer._id}/deny`,
    RequestMethods.PATCH,
  );

  // get the updateVolunteerStatus function from the context
  const { updateVolunteerStatus } = useVolunteersContext();

  // send the request to approve the volunteer status
  const handleApproveVolunteer = async (volunteer: Volunteer) => {
    volunteer.approvalStatus = ApprovalStatus.APPROVED;
    await approveVolunteer(volunteer);
  };

  // send the request to deny the volunteer status
  const handleDenyVolunteer = async (volunteer: Volunteer) => {
    volunteer.approvalStatus = ApprovalStatus.REJECTED;
    await denyVolunteer(volunteer);
  };

  // update the volunteer status if the request was successful
  useEffect(() => {
    if (approveVolunteerResponseData || denyVolunteerResponseData) {
      const volunteerResponseData = approveVolunteerResponseData
        ? approveVolunteerResponseData
        : denyVolunteerResponseData;
      if (volunteerResponseData) {
        updateVolunteerStatus(volunteerResponseData as Volunteer);
      }
    }
  }, [
    approveVolunteerResponseData,
    denyVolunteerResponseData,
    updateVolunteerStatus,
  ]);

  if (approveVolunteerLoading || denyVolunteerLoading) {
    return <div>Loading...</div>;
  }

  if (approveVolunteerError || denyVolunteerError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={styles["buttons-container"]}>
      <button
        className={styles["approve-button"]}
        onClick={() => handleApproveVolunteer(volunteer)}
      >
        <div className={styles["button-title"]}>Approve</div>
        <FontAwesomeIcon icon={faCheck} className={styles["button-icon"]} />
      </button>
      <button
        className={styles["deny-button"]}
        onClick={() => handleDenyVolunteer(volunteer)}
      >
        <div className={styles["button-title"]}>Reject</div>
        <FontAwesomeIcon icon={faClose} className={styles["button-icon"]} />
      </button>
    </div>
  );
};

export default VolunteerUpdateApprovalStatus;
