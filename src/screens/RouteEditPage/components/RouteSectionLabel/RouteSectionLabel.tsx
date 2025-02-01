import { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

interface RouteSectionLabelProps extends PropsWithChildren {
  label: string;
  className?: string;
}

export function RouteSectionLabel({
  label,
  className = "",
  children,
}: RouteSectionLabelProps) {
  return (
    <div className={twMerge("flex-col flex", className)}>
      <label>{label}</label>
      {children}
    </div>
  );
}
