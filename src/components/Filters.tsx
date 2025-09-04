import React from "react";

interface Props {
  children: React.ReactNode;
}

export const Filters = ({ children }: Props) => {
  return <div className="flex flex-row gap-5 items-center">{children}</div>;
};
