import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ActionTileProps {
  title: string;
  icon: IconDefinition;
  onClick: () => void;
}
