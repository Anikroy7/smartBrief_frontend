
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { IInput } from "../../../types";

interface IProps extends IInput {}

const SBInput = React.memo(function SBInput({
  name,
  label,
  type = "text",
  required = false,
  disabled = false,
  placeholder = "",
}: IProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;
console.log(errors)
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="form-control w-full">
          {label && (
            <label className="label">
              <span className="label-text">
                {label} {required && <span className="text-error">*</span>}
              </span>
            </label>
          )}
          <input
            {...field}
            type={type}
            placeholder={placeholder || label}
            className={`input input-bordered w-full ${
              errorMessage ? "input-error" : ""
            }`}
            disabled={disabled}
          />
          {errorMessage && (
            <label className="label">
              <span className="label-text-alt text-error">{errorMessage}</span>
            </label>
          )}
        </div>
      )}
    />
  );
});

export default SBInput;
