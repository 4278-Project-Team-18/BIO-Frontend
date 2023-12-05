import styles from "./InviteLineItem.module.css";
import { InviteStatus } from "../../interfaces/Invites.interface";
import LineItemLabel from "../FileUploadedLabel/LineItemLabel";
import { LineItemLabelVariant } from "../FileUploadedLabel/LineItemLabel.definitions";
import { capitalize } from "../../util/string.util";
import LoadingButton from "../LoadingButton/LoadingButton";
import { LoadingButtonVariant } from "../LoadingButton/LoadingButton.definitions";
import ConfirmationModal from "../../modals/ConfirmationModal/ConfirmationModal";
import { RequestMethods, useCustomFetch } from "../../api/request.util";
import { useInvitesContext } from "../../context/Invites.context";
import {
  faBookOpen,
  faCircleCheck,
  faClock,
  faPaperPlane,
  faTrash,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import type { Invite } from "../../interfaces/Invites.interface";
import type { InviteLineItemProps } from "./InviteLineItem.definitions";

const InviteLineItem = ({ invite }: InviteLineItemProps) => {
  const [showDeleteInviteModal, setShowDeleteInviteModal] =
    useState<boolean>(false);

  const { removeInvite } = useInvitesContext();

  const {
    data: deleteInviteResponseData,
    error: deleteInviteResponseError,
    loading: deleteInviteLoading,
    makeRequest: makeDeleteInviteRequest,
  } = useCustomFetch<Invite>(`/invite/`, RequestMethods.DELETE);

  const handleOpenDeleteInviteModal: () => void = () => {
    setShowDeleteInviteModal(true);
  };

  const handleCloseDeleteInviteModal: () => void = () => {
    setShowDeleteInviteModal(false);
  };

  const handleDeleteInvite: (_: Invite) => void = (invite: Invite) => {
    handleCloseDeleteInviteModal();
    makeDeleteInviteRequest(undefined, invite._id);
  };

  useEffect(() => {
    if (deleteInviteResponseData) {
      removeInvite(deleteInviteResponseData);
      handleCloseDeleteInviteModal();
    }

    if (deleteInviteResponseError) {
      handleCloseDeleteInviteModal();
    }
  }, [deleteInviteResponseData, deleteInviteResponseError]);

  // Render the label for the invite status
  const renderLineItemLabel: () => JSX.Element | null = () => {
    if (invite.status === InviteStatus.SENT) {
      return (
        <LineItemLabel
          label={"Sent"}
          variant={LineItemLabelVariant.PURPLE}
          icon={faPaperPlane}
        />
      );
    } else if (invite.status === InviteStatus.OPENED) {
      return (
        <LineItemLabel
          label={"Opened"}
          variant={LineItemLabelVariant.ORANGE}
          icon={faBookOpen}
        />
      );
    } else if (invite.status === InviteStatus.COMPLETED) {
      return (
        <LineItemLabel
          label={"Completed"}
          variant={LineItemLabelVariant.YELLOW}
          icon={faClock}
        />
      );
    } else if (invite.status === InviteStatus.REJECTED) {
      return (
        <LineItemLabel
          label={"Rejected"}
          variant={LineItemLabelVariant.RED}
          icon={faXmarkCircle}
        />
      );
    } else if (invite.status === InviteStatus.APPROVED) {
      return (
        <LineItemLabel
          label={"Approved"}
          variant={LineItemLabelVariant.GREEN}
          icon={faCircleCheck}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <div className={styles["invite-line-item-container"]}>
      <div className={styles["invite-line-item-text"]}>
        <div className={styles["invite-line-item-email"]}>{invite.email}</div>
        <div className={styles["invite-line-item-role"]}>
          {capitalize(invite.role)}
        </div>
      </div>
      <div className={styles["invite-line-item-label"]}>
        <div className={styles["invite-delete-icon"]}>
          <LoadingButton
            icon={faTrash}
            iconOnly={true}
            text="Delete Invite?"
            isLoading={false}
            variant={LoadingButtonVariant.RED}
            onClick={handleOpenDeleteInviteModal}
          />
        </div>
        {renderLineItemLabel()}
      </div>
      {showDeleteInviteModal && (
        <ConfirmationModal
          closeModal={handleCloseDeleteInviteModal}
          title="Delete Invite?"
          subtitle={`Are you sure you want to delete the invite to ${invite.email}?`}
          action={() => handleDeleteInvite(invite)}
          confirmText="Yes, delete invite"
          confirmColor={LoadingButtonVariant.RED}
          isLoading={deleteInviteLoading}
        />
      )}
    </div>
  );
};

export default InviteLineItem;
