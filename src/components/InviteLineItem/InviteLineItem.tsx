import styles from "./InviteLineItem.module.css";
import { Status } from "../../interfaces/Invites.interface";
import LineItemLabel from "../FileUploadedLabel/LineItemLabel";
import { LineItemLabelVariant } from "../FileUploadedLabel/LineItemLabel.definitions";
import { capitalize } from "../../util/string.util";
import {
  faBookOpen,
  faCircleCheck,
  faPaperPlane,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import type { InviteLineItemProps } from "./InviteLineItem.definitions";

const InviteLineItem = ({ invite }: InviteLineItemProps) => {
  // Render the label for the invite status
  const renderLineItemLabel: () => JSX.Element | null = () => {
    if (invite.status === Status.SENT) {
      return (
        <LineItemLabel
          label={"Sent"}
          variant={LineItemLabelVariant.PURPLE}
          icon={faPaperPlane}
        />
      );
    } else if (invite.status === Status.OPENED) {
      return (
        <LineItemLabel
          label={"Opened"}
          variant={LineItemLabelVariant.YELLOW}
          icon={faBookOpen}
        />
      );
    } else if (invite.status === Status.COMPLETED) {
      return (
        <LineItemLabel
          label={"Completed"}
          variant={LineItemLabelVariant.GREEN}
          icon={faCircleCheck}
        />
      );
    } else if (invite.status === Status.ACCEPTED) {
      return (
        <LineItemLabel
          label={"Declined"}
          variant={LineItemLabelVariant.RED}
          icon={faXmarkCircle}
        />
      );
    } else if (invite.status === Status.REJECTED) {
      return (
        <LineItemLabel
          label={"Expired"}
          variant={LineItemLabelVariant.RED}
          icon={faXmarkCircle}
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
        {renderLineItemLabel()}
      </div>
    </div>
  );
};

export default InviteLineItem;
