/* eslint-disable autofix/no-unused-vars */
export interface TitleLineItemProps {
  title: string;
  variant?: TitleLineItemVariant;
  actionOnClick?: () => void;
  actionTitle?: string;
}

export enum TitleLineItemVariant {
  TABLE_HEADER = "table-header",
  TABLE_TITLE = "table-title",
}
