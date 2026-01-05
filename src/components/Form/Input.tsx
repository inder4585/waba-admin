import React, { ChangeEvent } from "react";
import clsx from "clsx";
import { FaStar } from "react-icons/fa6";

interface FieldProps {
  label: string;
  description: string;
  placeholder?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  className?: string;
  value?: string;
  required: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<FieldProps> = ({
  label,
  description,
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
        <label className="text-sm/6 font-medium text-gray">
          {label} &nbsp;{" "}
          {required && <span className="text-red-500 text-sm">*</span>}
        </label>
        {tooltip && (
          <div className="tooltip tooltip-left z-50" data-tip={description}>
            {icon}
          </div>
        )}
      </div>
      <div className="relative mt-1">
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="input input-bordered input-sm w-full "
        />
      </div>
    </div>
  );
};

export default InputComponent;
