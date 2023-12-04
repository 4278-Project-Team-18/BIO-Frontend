/* eslint-disable autofix/no-unused-vars */

import type { Class } from "../../interfaces/User.interface";

export interface BookDeliveryDateInput {
  newEstimatedDelivery: string;
}

export enum BookDeliveryDateInputName {
  BOOK_DELIVERY_DATE = "newEstimatedDelivery",
}

export interface BookDeliveryDateModalProps {
  closeModal: () => void;
  class: Class;
}
