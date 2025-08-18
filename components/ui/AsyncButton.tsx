import React from "react";

interface Props {
  lable: string;
  onClick?: () => void;
}
export default function AsyncButton({ lable, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded-10 border border-brand-secondary-500">
      {lable}
    </button>
  );
}
