import type { ReactNode } from "react";

export interface AccordionProps {
  title?: string;
  headerText?: string;
  hideActionButton?: boolean;
  actionButtonText?: string;
  actionButtonCallback?: () => void;
  children?: ReactNode[];
  noDataTitle?: string;
  actionLineItem?: ReactNode;
  showActionLineItem?: boolean;
  showAll?: boolean;
  minimumItems?: number;
  headerActionOnClick?: () => void;
  headerActionTitle?: string;
}
