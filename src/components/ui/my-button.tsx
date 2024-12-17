import { cn } from "@/lib/utils";
import React from "react";

export default function Button({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "bg-gradient-to-bl from-primary from-50% py-2 px-6 text-white text-lg font-bold rounded-full",
        className,
      )}
    >
      {children}
    </button>
  );
}
