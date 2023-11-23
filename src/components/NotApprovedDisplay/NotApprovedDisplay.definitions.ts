import type { ApprovalStatus } from "src/interfaces/User.interface";

export interface NotApprovedDisplayProps {
  status: Omit<ApprovalStatus, "approved">;
}
