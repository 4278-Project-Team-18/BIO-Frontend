import styles from "./AdminUpdateApprovalStatus.module.css";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { ApprovalStatus } from "../../interfaces/User.interface";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { useAdminsContext } from "../../context/Admins.context";
import { useInvitesContext } from "../../context/Invites.context";
import { InviteStatus } from "../../interfaces/Invites.interface";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import type { Admin } from "../../interfaces/User.interface";
import type { AdminUpdateApprovalStatusProps } from "./AdminUpdateApprovalStatus.definitions";

const AdminUpdateApprovalStatus = ({
  admin,
}: AdminUpdateApprovalStatusProps) => {
  // request to update the admin's approval status
  const {
    data: updateApprovalStatusResponseData,
    loading: updateApprovalStatusLoading,
    error: updateApprovalStatusError,
    makeRequest: onUpdateAdminApprovalStatus,
  } = useCustomFetch<Admin>(
    `/admin/${admin._id}/changeAdminApprovalStatus`,
    RequestMethods.PATCH,
  );
  const [approveOrDenyLoading, setApproveOrDenyLoading] =
    useState<ApprovalStatus | null>(null);

  // get the updateAdminStatus function from the context
  const { updateAdminApprovalStatus } = useAdminsContext();
  const { updateInviteStatus } = useInvitesContext();

  // send the request to update the admin's approval status
  const handleUpdateApprovalStatus = async (approvalStatus: ApprovalStatus) => {
    setApproveOrDenyLoading(approvalStatus);

    await onUpdateAdminApprovalStatus({
      newApprovalStatus: approvalStatus,
    });

    if (approvalStatus === ApprovalStatus.APPROVED) {
      updateInviteStatus(admin.email, InviteStatus.APPROVED);
    } else if (approvalStatus === ApprovalStatus.REJECTED) {
      updateInviteStatus(admin.email, InviteStatus.REJECTED);
    }

    setApproveOrDenyLoading(null);
  };

  // update the admin's approval status if the request was successful
  useEffect(() => {
    if (updateApprovalStatusResponseData && !updateApprovalStatusError) {
      updateAdminApprovalStatus(
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

export default AdminUpdateApprovalStatus;
