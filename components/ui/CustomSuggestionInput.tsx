"use client";
import React, { useRef, useState } from "react";

interface Props {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  options: string[];
  onSelectOption?: (selected: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
}

export default function CustomSuggestionInput({
  name,
  value = "", // null safety default
  onChange,
  placeholder = "",
  label,
  required = false,
  className = "",
  inputClassName = "",
  options = [], // null safety default
  onSelectOption,
  disabled = false,
  readOnly = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const getLastToken = (val: string): string => {
    if (!val) return "";
    const parts = val.split(",");
    return parts?.[parts.length - 1]?.trimStart() ?? "";
  };

  const lastToken = getLastToken(value);
  const filteredOptions =
    lastToken === ""
      ? options
      : options.filter((option) =>
          option?.toLowerCase?.().includes(lastToken.toLowerCase())
        );

  const handleSelect = (selected: string) => {
    const parts = value ? value.split(",") : [];
    parts[parts.length - 1] = " " + (selected?.toUpperCase?.() ?? "");
    const newValue = value ? parts.join(",").replace(/^,/, "") : selected;

    onChange({
      target: {
        name,
        value: newValue,
      },
    } as React.ChangeEvent<HTMLInputElement>);

    if (onSelectOption) onSelectOption(selected);

    setShowSuggestions(false);
  };

  return (
    <div
      className={`relative flex flex-col gap-2 w-full ${className} ${
        disabled ? "opacity-50" : ""
      }`}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-text-main">
          {label}
        </label>
      )}

      <input
        ref={inputRef}
        type="text"
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(e) => {
          const newValue = e.target.value?.toUpperCase?.() ?? "";
          onChange({
            ...e,
            target: {
              ...e.target,
              name: e.target.name,
              value: newValue,
            },
          });
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // delay to allow click
        className={`px-4 py-2 border border-brand-secondary rounded-10 outline-none focus:ring-2 focus:ring-brand-main bg-white text-sm placeholder-gray-400 ${inputClassName}`}
        autoComplete="off"
      />

      {showSuggestions && filteredOptions.length > 0 && (
        <ul className="absolute z-10 top-full mt-1 bg-white border border-gray-300 rounded-md w-full max-h-40 overflow-y-auto shadow-md">
          {filteredOptions.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm">
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
