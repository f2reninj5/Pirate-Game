import * as RadixPopover from "@radix-ui/react-popover";
import type { ReactNode } from "react";

export function PopoverBasic({
  trigger,
  children,
  align,
}: {
  trigger: ReactNode;
  children: ReactNode;
  align?: "center" | "start" | "end" | undefined;
}) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button type="button">{trigger}</button>
      </RadixPopover.Trigger>
      <RadixPopover.Content align={align}>{children}</RadixPopover.Content>
    </RadixPopover.Root>
  );
}
