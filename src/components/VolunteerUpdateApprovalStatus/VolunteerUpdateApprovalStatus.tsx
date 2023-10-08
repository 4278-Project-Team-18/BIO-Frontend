import styles from "./VolunteerUpdateApprovalStatus.module.css";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useVolunteersContext } from "../../context/Volunteers.context";
import {
  ApprovalStatus,
  type Volunteer,
} from "../../interfaces/User.interface";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import type { VolunteerUpdateApprovalStatusProps } from "./VolunteerUpdateApprovalStatus.definitions";

const VolunteerUpdateApprovalStatus = ({
  volunteer,
}: VolunteerUpdateApprovalStatusProps) => {
  // request to update the volunteer's approval status
  const {
    data: updateApprovalStatusResponseData,
    loading: updateApprovalStatusLoading,
    error: updateApprovalStatusError,
    makeRequest: onUpdateVolunteerApprovalStatus,
  } = useCustomFetch<Volunteer>(
    `volunteer/${volunteer._id}/changeVolunteerApprovalStatus`,
    RequestMethods.PATCH,
  );

  // get the updateVolunteerStatus function from the context
  const { updateVolunteerApprovalStatus } = useVolunteersContext();

  // send the request to update the volunteer's approval status
  const handleUpdateApprovalStatus = async (approvalStatus: ApprovalStatus) => {
    await onUpdateVolunteerApprovalStatus({
      newApprovalStatus: approvalStatus,
    });
  };

  // update the volunteer's approval status if the request was successful
  useEffect(() => {
    if (updateApprovalStatusResponseData) {
      updateVolunteerApprovalStatus(
        updateApprovalStatusResponseData._id,
        updateApprovalStatusResponseData.approvalStatus,
      );
    }
  }, [updateApprovalStatusResponseData]);

  if (updateApprovalStatusLoading) {
    return <div>Loading...</div>;
  }

  if (updateApprovalStatusError) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div className={styles["buttons-container"]}>
      <LoadingButton
        onClick={() => {
          handleUpdateApprovalStatus(ApprovalStatus.APPROVED);
        }}
        text="Approve"
        isLoading={updateApprovalStatusLoading}
        icon={faCheck}
        isLoadingText="Approving..."
        styles={{ marginLeft: "1rem" }}
        variant={LoadingButtonVariant.GREEN}
      />
      <LoadingButton
        onClick={() => {
          handleUpdateApprovalStatus(ApprovalStatus.REJECTED);
        }}
        text="Deny"
        isLoading={updateApprovalStatusLoading}
        icon={faClose}
        isLoadingText="Denying..."
        styles={{ marginLeft: "1rem" }}
        variant={LoadingButtonVariant.RED}
      />
    </div>
  );
};

export default VolunteerUpdateApprovalStatus;
