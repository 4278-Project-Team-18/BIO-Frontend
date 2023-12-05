import * as yup from "yup";

export const sendInviteSchema = yup.object().shape({
  email: yup.string().email("Invalid email.").required("Email is required."),
  inviteeRole: yup.string().required("Role is required."),
  senderId: yup.string(),
});
