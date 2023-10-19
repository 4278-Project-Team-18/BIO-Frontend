import styles from "./InviteLineItem.module.css";
import { Status } from "../../interfaces/Invites.interface";
import LineItemLabel from "../FileUploadedLabel/LineItemLabel";
import { LineItemLabelVariant } from "../FileUploadedLabel/LineItemLabel.definitions";
import { capitalize } from "../../util/string.util";
import {
  faBookOpen,
  faCircleCheck,
  faClock,
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
          variant={LineItemLabelVariant.ORANGE}
          icon={faBookOpen}
        />
      );
    } else if (invite.status === Status.COMPLETED) {
      return (
        <LineItemLabel
          label={"Completed"}
          variant={LineItemLabelVariant.YELLOW}
          icon={faClock}
        />
      );
    } else if (invite.status === Status.REJECTED) {
      return (
        <LineItemLabel
          label={"Rejected"}
          variant={LineItemLabelVariant.RED}
          icon={faXmarkCircle}
        />
      );
    } else if (invite.status === Status.APPROVED) {
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
        {renderLineItemLabel()}
      </div>
    </div>
  );
};

export default InviteLineItem;
