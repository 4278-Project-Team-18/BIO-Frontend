import styles from "./AdminInvitesTab.module.css";
import { useCustomFetch } from "../../../api/request.util";
import Accordion from "../../../components/Accordion/Accordion";
import FullPageErrorDisplay from "../../../components/FullPageErrorDisplay/FullPageErrorDisplay";
import FullPageLoadingIndicator from "../../../components/FullPageLoadingIndicator/FullPageLoadingIndicator";
import InviteLineItem from "../../../components/InviteLineItem/InviteLineItem";
import type { Invite } from "../../../interfaces/Invites.interface";

const AdminInvitesTab = () => {
  const {
    data: invitesData,
    loading: invitesLoading,
    error: invitesError,
    makeRequest: makeInvitesRequest,
  } = useCustomFetch<Invite[]>(`invite/`);

  if (invitesLoading) return <FullPageLoadingIndicator />;

  if (invitesError || !invitesData) {
    return <FullPageErrorDisplay refetch={makeInvitesRequest} />;
  }

  return (
    <div>
      <div className={styles["admin-invites-header"]}>
        <div className={styles["admin-invites-title"]}>{`Invites`}</div>
      </div>
      <div>
        <Accordion title={"Invites"} noDataTitle="No invites send!">
          {invitesData.map((invite) => (
            <InviteLineItem key={invite._id} invite={invite} />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default AdminInvitesTab;
