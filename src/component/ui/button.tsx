import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      className={cn(
        "bg-dark text-light rounded-sm hover:scale-120 duration-200 ease-out hover:outline-light hover:outline-1",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
