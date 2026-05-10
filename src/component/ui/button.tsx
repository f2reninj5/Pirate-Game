import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn("border-2 border-cyan-300", className)}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
