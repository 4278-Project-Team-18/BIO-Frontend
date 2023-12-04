import type { Volunteer } from "../../interfaces/User.interface";

export interface VolunteerLineItemProps {
  volunteer: Volunteer;
  openMatchModal: (_: Volunteer) => void;
  openViewModal: (_: Volunteer) => void;
}
