import styles from "./AdminInvitesTab.module.css";
import { useCustomFetch } from "../../../api/request.util";
import Accordion from "../../../components/Accordion/Accordion";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import InviteLineItem from "../../../components/InviteLineItem/InviteLineItem";
import SendInviteForm from "../../../components/SendInviteForm/SendInviteForm";
import { useInvitesContext } from "../../../context/Invites.context";
import { useEffect } from "react";
import type { Invite } from "../../../interfaces/Invites.interface";

const AdminInvitesTab = () => {
  const { currentInvites, setCurrentInvites } = useInvitesContext();

  const {
    data: invitesData,
    loading: invitesLoading,
    error: invitesError,
    makeRequest: makeInvitesRequest,
  } = useCustomFetch<Invite[]>(`invite/`);

  useEffect(() => {
    if (invitesData && !invitesError) {
      setCurrentInvites(invitesData);
    }
  }, [invitesData]);

  if (invitesLoading || !currentInvites) return <FullPageLoadingIndicator />;

  if (invitesError || !invitesData) {
    return <FullPageErrorDisplay refetch={makeInvitesRequest} />;
  }

  return (
    <div>
      <div className={styles["admin-invites-header"]}>
        <div className={styles["admin-invites-title"]}>{`Invites`}</div>
      </div>
      <div>
        <SendInviteForm />
        <Accordion title={"All Invites"} noDataTitle="No invites send!">
          {currentInvites?.map((invite) => (
            <InviteLineItem key={invite._id} invite={invite} />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AdminInvitesTab;
