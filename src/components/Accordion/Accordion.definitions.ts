import type { ReactNode } from "react";

export interface AccordionProps {
  title: string;
  hideButtons?: boolean;
  actionButtonText?: string;
  actionButtonCallback?: () => void;
  children?: ReactNode[];
}
