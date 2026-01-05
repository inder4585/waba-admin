import React, { ChangeEvent } from "react";
import clsx from "clsx";

interface FieldProps {
  label: string;
  description: string;
  placeholder?: string;
  icon?: React.ReactNode;
  tooltip?: string;
  className?: string;
  value?: string;
  required: boolean;
  onChange: (event: React.ChangeEvent) => void;
}

const TextArea: React.FC<FieldProps> = ({
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
          <div className="tooltip tooltip-left" data-tip={description}>
            {icon}
          </div>
        )}
      </div>
      <div className="relative mt-1">
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="textarea textarea-bordered w-full"
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
