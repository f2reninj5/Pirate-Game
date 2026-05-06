import * as RadixPopover from "@radix-ui/react-popover";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Popover({
  className,
  trigger,
  children,
  align,
}: {
  className?: string;
  trigger: ReactNode;
  children: ReactNode;
  align?: "center" | "start" | "end" | undefined;
}) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button className={cn("", className)} type="button">
          {trigger}
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Content
        className="bg-light text-dark min-w-60 min-h-20 rounded-md p-2"
        align={align}
      >
        {children}
      </RadixPopover.Content>
    </RadixPopover.Root>
  );
}
