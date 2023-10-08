import type { Volunteer } from "../../interfaces/User.interface";

export interface VolunteerLineItemProps {
  volunteer: Volunteer;
  openModal: () => void;
  closeModal: () => void;
}
