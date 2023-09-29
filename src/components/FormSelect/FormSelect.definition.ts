import type { Control } from "react-hook-form";
import type { NewClassInputName } from "../../modals/AddClassModal/AddClassModal.definitions";

export interface FormSelectProps {
  name: NewClassInputName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  label: string;
  options: FormSelectOption[];
  error?: string;
  optText?: string;
  defaultValue?: string;
  setValue?: (_: string, __: string) => void;
}

export interface FormSelectOption {
  value: string;
  label: string;
}
