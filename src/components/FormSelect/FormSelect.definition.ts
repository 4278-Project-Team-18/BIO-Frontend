import type { Control } from "react-hook-form";

export interface FormSelectProps {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  label: string;
  error?: string;
  optText?: string;
  options: FormSelectOption[];
}

export interface FormSelectOption {
  value: string;
  label: string;
}
