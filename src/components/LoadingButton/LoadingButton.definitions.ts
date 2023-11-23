/* eslint-disable autofix/no-unused-vars */
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface LoadingButtonProps {
  isLoading: boolean;
  text: string;
  onClick?: () => void;
  isLoadingText?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: any;
  icon?: IconDefinition;
  variant?: LoadingButtonVariant;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isResponsive?: boolean;
  iconOnly?: boolean;
}

export enum LoadingButtonVariant {
  GREEN = "green",
  RED = "red",
  BLUE = "blue",
  YELLOW = "yellow",
  GREY = "grey",
  PURPLE = "purple",
  DARKGREY = "darkgrey",
  BLACK = "black",
}

export const LoadingButtonVariantColorMap = {
  [LoadingButtonVariant.GREEN]: "#5ad06d",
  [LoadingButtonVariant.RED]: "#EF4444",
  [LoadingButtonVariant.BLUE]: "#3B82F6",
  [LoadingButtonVariant.YELLOW]: "#F59E0B",
  [LoadingButtonVariant.GREY]: "#CCCCCC",
  [LoadingButtonVariant.PURPLE]: "#8B5CF6",
  [LoadingButtonVariant.DARKGREY]: "#AAAAAA",
  [LoadingButtonVariant.BLACK]: "#222222",
};
