import styles from "./FormInput.module.css";
import {
  FormInputSizeVariant,
  type FormInputProps,
} from "./FormInput.definitions";
import { Controller } from "react-hook-form";

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
  autocomplete,
  sizeVariant = FormInputSizeVariant.standard,
  extraStyles = {},
  paragraph = false,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className={styles[`form-input-container`]}>
        <div className={styles["form-input-inner-container"]}>
          {(label || error) && (
            <div
              className={
                error
                  ? styles[`form-input-label-no-opt-${sizeVariant}`]
                  : styles[`form-input-label-opt-${sizeVariant}`]
              }
            >
              <div className={styles["label"]}>{label}</div>
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
          {!paragraph ? (
            <input
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className={styles[`form-input-${sizeVariant}`]}
              placeholder={placeholder}
              type={type}
              defaultValue={defaultValue}
              autoComplete={autocomplete}
              style={{ ...extraStyles }}
            />
          ) : (
            <textarea
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              className={`${styles[`form-input-${sizeVariant}`]} ${
                styles["form-textarea"]
              }`}
              placeholder={placeholder}
              defaultValue={defaultValue}
              autoComplete={autocomplete}
              style={{ ...extraStyles }}
            />
          )}
        </div>
      </div>
    )}
  />
);

export default FormInput;
