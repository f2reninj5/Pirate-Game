import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function Button({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button className={cn("bg-gray-400", className)} type="button">
      {children}
    </button>
  );
}
