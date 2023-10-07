import type { InviteLineItemProps } from "./InviteLineItem.definitions";

const InviteLineItem = ({ invite }: InviteLineItemProps) => {
  console.log(invite);

  return <div>{invite.email}</div>;
};

export default InviteLineItem;
