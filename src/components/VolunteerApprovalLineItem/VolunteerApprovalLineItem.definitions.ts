/* eslint-disable autofix/no-unused-vars */
import type { Volunteer } from "../../interfaces/User.interface";

export interface VolunteerApprovalLineItemProps {
  volunteer: Volunteer;
  onStatusChange: (volunteer: Volunteer) => void;
}
