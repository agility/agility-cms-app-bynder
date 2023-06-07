import React from "react";
interface MetaRowProps {
  label: string;
  value: any;
  className?: string;
}

export const MetaRow = ({ label, value, className = "" }:MetaRowProps) => {
  return (
    <div
      className={`my-2 flex w-full justify-between border-b border-b-gray-300 pb-2 ${
        className && className
      }`}
    >
      <div className='text-sm text-gray-500 font-sm'>{label}</div>
      <div className='text-sm text-gray-900 '>{value}</div>
    </div>
  );
};
