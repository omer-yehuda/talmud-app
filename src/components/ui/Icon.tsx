"use client";

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "" }: IconProps): React.ReactElement {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}
