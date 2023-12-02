import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { LoadingButtonVariant } from "../../components/LoadingButton/LoadingButton.definitions";

export interface ConfirmationModalProps {
  closeModal: () => void;
  title: string;
  subtitle?: string;
  confirmText: string;
  confirmIcon?: IconDefinition;
  confirmColor?: LoadingButtonVariant;
  action: () => void;
  isLoading?: boolean;
}
