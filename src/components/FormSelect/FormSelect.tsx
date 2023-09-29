import styles from "./FormSelect.module.css";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import type { FormSelectProps } from "./FormSelect.definition";

const FormSelect = ({
  name,
  control,
  label,
  error,
  optText,
  options,
  defaultValue,
  setValue,
}: FormSelectProps) => {
  useEffect(() => {
    if (defaultValue && setValue) {
      setValue(name, defaultValue);
    }
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={styles["form-select-container"]}>
          <div className={styles["form-select-inner-container"]}>
            {label && (
              <div
                className={
                  error
                    ? styles["form-select-label-no-opt"]
                    : styles["form-select-label-opt"]
                }
              >
                {label}
                {!error && optText && (
                  <span className={styles["form-select-opt-text"]}>
                    {" (" + optText + ")"}
                  </span>
                )}
                {error && (
                  <span className={styles["form-select-error"]}>
                    {" (" + error + ")"}
                  </span>
                )}
              </div>
            )}
            <select
              className={styles["form-select"]}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              defaultValue={defaultValue}
            >
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className={styles["form-select-option"]}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    />
  );
};

export default FormSelect;
