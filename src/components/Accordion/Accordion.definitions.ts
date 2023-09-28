import type { ReactNode } from "react";

export interface AccordionProps {
  title: string;
  hideActionButton?: boolean;
  actionButtonText?: string;
  actionButtonCallback?: () => void;
  children?: ReactNode[];
}
