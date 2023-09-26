import styles from "./FormInput.module.css";
import { Controller } from "react-hook-form";
import type { FormInputProps } from "./FormInput.definitions";

/**
 * FormInput component
 *
 * @param {string} name - name of the input (for react-hook-form data)
 * @param {string} type - type of the input (e.g. text, password, email)
 * @param {string} label - label of the input (optional, appears top left)
 * @param {string} placeholder - placeholder of the input (optional)
 * @param {string} defaultValue - default value of the input (optional)
 * @param {string} optText - optional text of the input (optional, displayed in gray next to label in parentheses)
 * @param {any} control - control of the input (from react-hook-form)
 * @param {string} error - error of the input (optional, displayed in red next to label)
 */
const FormInput = ({
  name,
  type,
  label,
  placeholder,
  defaultValue,
  optText,
  control,
  error,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className={styles["form-input-container"]}>
        <div className={styles["form-input-inner-container"]}>
          {label && (
            <div
              className={
                error
                  ? styles["form-input-label-no-opt"]
                  : styles["form-input-label-opt"]
              }
            >
              {label}
              {!error && optText && (
                <span className={styles["form-input-opt-text"]}>
                  {" (" + optText + ")"}
                </span>
              )}
              {error && (
                <span className={styles["form-input-error"]}>
                  {" (" + error + ")"}
                </span>
              )}
            </div>
          )}
          <input
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            className={styles["form-input"]}
            placeholder={placeholder}
            type={type}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    )}
  />
);

export default FormInput;