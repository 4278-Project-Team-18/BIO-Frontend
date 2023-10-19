import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

/* eslint-disable autofix/no-unused-vars */
export interface LineItemLabelProps {
  variant: LineItemLabelVariant;
  label: string;
  icon?: IconDefinition;
}

export enum LineItemLabelVariant {
  GREEN = "green",
  RED = "red",
  YELLOW = "yellow",
  BLUE = "blue",
  PURPLE = "purple",
  ORANGE = "orange",
}
