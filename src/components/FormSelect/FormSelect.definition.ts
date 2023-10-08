import type { SendInviteInputName } from "../SendInviteForm/SendInviteForm.definitions";
import type { Control } from "react-hook-form";
import type { NewClassInputName } from "../../modals/AddClassModal/AddClassModal.definitions";
import type { MatchVolunteerInputName } from "../../modals/MatchVolunteerModal/MatchVolunteerModal.defintions";

export interface FormSelectProps {
  name: NewClassInputName | MatchVolunteerInputName | SendInviteInputName;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, any>;
  label: string;
  options: FormSelectOption[];
  error?: string;
  optText?: string;
  placeholder?: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, autofix/no-unused-vars
  onChange?: (selectedValue: any) => void;
}

export interface FormSelectOption {
  value: string;
  label: string;
}
