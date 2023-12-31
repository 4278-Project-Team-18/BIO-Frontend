import styles from "./VolunteerUpdateApprovalStatus.module.css";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useVolunteersContext } from "../../context/Volunteers.context";
import {
  ApprovalStatus,
  type Volunteer,
} from "../../interfaces/User.interface";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { useInvitesContext } from "../../context/Invites.context";
import { InviteStatus } from "../../interfaces/Invites.interface";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
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
    `/volunteer/${volunteer._id}/changeVolunteerApprovalStatus`,
    RequestMethods.PATCH,
  );
  const [approveOrDenyLoading, setApproveOrDenyLoading] =
    useState<ApprovalStatus | null>(null);

  // get the updateVolunteerStatus function from the context
  const { updateVolunteerApprovalStatus } = useVolunteersContext();
  const { updateInviteStatus } = useInvitesContext();

  // send the request to update the volunteer's approval status
  const handleUpdateApprovalStatus = async (approvalStatus: ApprovalStatus) => {
    setApproveOrDenyLoading(approvalStatus);

    await onUpdateVolunteerApprovalStatus({
      newApprovalStatus: approvalStatus,
    });

    if (approvalStatus === ApprovalStatus.APPROVED) {
      updateInviteStatus(volunteer.email, InviteStatus.APPROVED);
    } else if (approvalStatus === ApprovalStatus.REJECTED) {
      updateInviteStatus(volunteer.email, InviteStatus.REJECTED);
    }

    setApproveOrDenyLoading(null);
  };

  // update the volunteer's approval status if the request was successful
  useEffect(() => {
    if (updateApprovalStatusResponseData && !updateApprovalStatusError) {
      updateVolunteerApprovalStatus(
        updateApprovalStatusResponseData._id,
        updateApprovalStatusResponseData.approvalStatus,
      );
    }
  }, [updateApprovalStatusResponseData]);

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
        isLoading={
          updateApprovalStatusLoading &&
          approveOrDenyLoading === ApprovalStatus.APPROVED
        }
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
        isLoading={
          updateApprovalStatusLoading &&
          approveOrDenyLoading === ApprovalStatus.REJECTED
        }
        icon={faClose}
        isLoadingText="Denying..."
        styles={{ marginLeft: "1rem" }}
        variant={LoadingButtonVariant.RED}
      />
    </div>
  );
};

export default VolunteerUpdateApprovalStatus;
