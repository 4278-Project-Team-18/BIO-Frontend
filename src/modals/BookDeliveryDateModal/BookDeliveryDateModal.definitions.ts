/* eslint-disable autofix/no-unused-vars */

import type { Class } from "../../interfaces/User.interface";

export interface BookDeliveryDateInput {
  newDeliveryDate: string;
}

export enum BookDeliveryDateInputName {
  BOOK_DELIVERY_DATE = "newDeliveryDate",
}

export interface BookDeliveryDateModalProps {
  closeModal: () => void;
  class: Class;
}
