import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/* eslint-disable autofix/no-unused-vars */
export interface TitleLineItemProps {
  title: string;
  variant?: TitleLineItemVariant;
  actionOneOnClick?: () => void;
  actionOneTitle?: string;
  actionOneIcon?: IconDefinition;
  actionTwoOnClick?: () => void;
  actionTwoTitle?: string;
  actionTwoIcon?: IconDefinition;
}

export enum TitleLineItemVariant {
  TABLE_HEADER = "table-header",
  TABLE_TITLE = "table-title",
}
