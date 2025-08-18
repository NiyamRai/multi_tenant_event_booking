"use client";
import { AiOutlineSearch } from "react-icons/ai";
import React from "react";

interface Props {
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  type?:
    | "email"
    | "text"
    | "password"
    | "number"
    | "date"
    | "tel"
    | "search"
    | "select";
  placeholder?: string;
  required?: boolean;
  label?: string;
  id?: string;
  className?: string;
  inputClassName?: string;
  options?: string[];
  readOnly?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  handleSearch?: () => void;
  isSearchButton?: boolean;
  min?: string;
  max?: string;
}

export default function CustomInput({
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  label,
  id,
  inputClassName,
  className,
  options = [],
  readOnly,
  disabled,
  onBlur,
  handleSearch,
  isSearchButton,
  min,
  max,
}: Props) {
  return (
    <div
      className={
        "flex flex-col gap-2 w-full relative " +
        className +
        (disabled ? " opacity-50" : "")
      }>
      {label && (
        <label
          htmlFor={id || name}
          className="text-sm font-medium text-text-main">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled || readOnly}
          className={
            "px-4 py-2 border border-brand-secondary-600 rounded-10 outline-none focus:ring-2 focus:ring-brand-main focus:border-brand-main bg-white text-sm text-gray-800 transition " +
            inputClassName
          }>
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onBlur={onBlur}
          onChange={(e) =>
            onChange({
              ...e,
              target: {
                ...e.target,
                name: e.target.name,
                value: e.target.value?.toLocaleUpperCase(),
              },
            })
          }
          placeholder={placeholder}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          min={min}
          max={max}
          className={
            "px-4 py-2 border  border-brand-secondary-600 rounded-10 focus:outline-none  ffocus:border-brand-main bg-white text-sm text-gray-800 placeholder-gray-400 transition " +
            inputClassName
          }
        />
      )}
      {isSearchButton && (
        <AiOutlineSearch
          onClick={handleSearch}
          size={32}
          className="absolute right-2 bottom-1 text-brand-main hover:bg-neutral-100 p-1 rounded-full cursor-pointer transition-all ease-in-out"
        />
      )}
    </div>
  );
}
