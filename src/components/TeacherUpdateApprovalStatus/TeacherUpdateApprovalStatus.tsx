import styles from "./TeacherUpdateApprovalStatus.module.css";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useTeachersContext } from "../../context/Teachers.context";
import { ApprovalStatus, type Teacher } from "../../interfaces/User.interface";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import type { TeacherUpdateApprovalStatusProps } from "./TeacherUpdateApprovalStatus.definitions";

const TeacherUpdateApprovalStatus = ({
  teacher,
}: TeacherUpdateApprovalStatusProps) => {
  // request to update the teacher's approval status
  const {
    data: updateApprovalStatusResponseData,
    loading: updateApprovalStatusLoading,
    error: updateApprovalStatusError,
    makeRequest: onUpdateTeacherApprovalStatus,
  } = useCustomFetch<Teacher>(
    `/teacher/${teacher._id}/changeTeacherApprovalStatus`,
    RequestMethods.PATCH,
  );

  // get the updateTeacherStatus function from the context
  const { updateTeacherApprovalStatus } = useTeachersContext();

  // send the request to update the teacher's approval status
  const handleUpdateApprovalStatus = async (approvalStatus: ApprovalStatus) => {
    await onUpdateTeacherApprovalStatus({
      newApprovalStatus: approvalStatus,
    });
  };

  // update the teacher's approval status if the request was successful
  useEffect(() => {
    if (updateApprovalStatusResponseData && !updateApprovalStatusError) {
      updateTeacherApprovalStatus(
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

export default TeacherUpdateApprovalStatus;
