/* eslint-disable autofix/no-unused-vars */
export interface LineItemLabelProps {
  variant: LineItemLabelVariant;
  label: string;
}

export enum LineItemLabelVariant {
  SUCCESS = "success",
  ERROR = "error",
}
