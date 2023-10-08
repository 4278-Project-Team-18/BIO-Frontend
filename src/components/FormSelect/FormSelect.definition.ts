import type { SendInviteInputName } from "../SendInviteForm/SendInviteForm.definitions";
import type { Control } from "react-hook-form";
import type { NewClassInputName } from "../../modals/AddClassModal/AddClassModal.definitions";

export interface FormSelectProps {
  name: NewClassInputName | SendInviteInputName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  label: string;
  options: FormSelectOption[];
  error?: string;
  optText?: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: any;
}

export interface FormSelectOption {
  value: string;
  label: string;
}
