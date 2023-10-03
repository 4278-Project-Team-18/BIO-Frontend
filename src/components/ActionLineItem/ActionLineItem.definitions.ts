export interface ActionLineItemProps {
  actionButtonTitle?: string;
  actionButtonOnClick?: () => void;
  showMoreButtonOnClick: () => void;
  isAccordionExpanded: boolean;
  hideShowMoreButton: boolean;
  hideActionButton: boolean;
}
