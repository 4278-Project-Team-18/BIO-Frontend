import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
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
  headerActionOneOnClick?: () => void;
  headerActionOneIcon: IconDefinition;
  headerActionOneTitle?: string;
  headerActionTwoIcon: IconDefinition;
  headerActionTwoOnClick?: () => void;
  headerActionTwoTitle?: string;
}
