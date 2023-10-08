import type { Volunteer } from "../../interfaces/User.interface";

export interface MatchVolunteerModalProps {
  closeModal: () => void;
  volunteer: Volunteer;
}
