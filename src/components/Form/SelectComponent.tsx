import React, { ChangeEvent, FC } from "react";
import clsx from "clsx";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  description: string;
  options: SelectOption[];
  placeholder?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  className?: string;
  value?: string;
  required: boolean;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectComponent: FC<SelectProps> = ({
  label,
  description,
  options,
  placeholder,
  icon,
  tooltip,
  className,
  onChange,
  value,
  required,
}) => {
  return (
    <div className={clsx("flex flex-col", className)}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">
          {label} &nbsp;{" "}
          {required && <span className="text-red-500 text-sm">*</span>}
        </label>
        {tooltip && (
          <div className="tooltip tooltip-left" data-tip={description}>
            {icon}
          </div>
        )}
      </div>
      <div className="relative mt-1">
        <select
          value={value}
          onChange={onChange}
          className="select select-bordered select-sm w-full"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectComponent;
