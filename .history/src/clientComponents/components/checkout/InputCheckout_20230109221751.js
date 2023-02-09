import React from "react";
import { useController } from "react-hook-form";

const InputCheckout = ({
  label,
  name,
  defaultValue = "",
  control,
  disabled,
}) => {
  const { field } = useController({
    defaultValue: defaultValue,
    control,
    name,
  });
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-lg font-semibold">
        {label}
      </label>
      <input
        {...field}
        type="text"
        name={name}
        id={name}
        autoComplete={"off"}
        disabled={disabled}
        className="w-full px-3 py-2 bg-white border border-black rounded-lg disabled:bg-[#d7d7d637] disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default InputCheckout;
