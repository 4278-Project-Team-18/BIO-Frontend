import type { Volunteer } from "src/interfaces/User.interface";

export interface ViewVolunteerResponsesModalProps {
  closeModal: () => void;
  volunteer: Volunteer;
}
