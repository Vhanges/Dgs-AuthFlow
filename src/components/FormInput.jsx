import { forwardRef } from "react";
import { Input } from "antd";

const FormInput = forwardRef(
  (
    {
      icon: Icon,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      disabled = false,
      required = false,
      className = "",
    },
    ref,
  ) => {
    return (
      <div className="relative">
        <Input
          ref={ref}
          className={`${Icon ? "pl-8" : "pl-3"} py-2 w-full border-none outline-none rounded-sm text-sm bg-gray-100 focus:ring-2 focus:ring-secondary ${className}`}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          aria-label={placeholder}
          disabled={disabled}
        />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
