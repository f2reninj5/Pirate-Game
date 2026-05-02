"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export default function Dialog({
  trigger,
  title,
  children,
}: {
  trigger: ReactNode;
  title?: string;
  children: ReactNode;
}) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger>{trigger}</RadixDialog.Trigger>

      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />

        <RadixDialog.Content className="fixed top-1/2 left-1/2 -translate-1/2 bg-dark text-light p-4 w-80 min-h-80 rounded-xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <RadixDialog.Title>{title}</RadixDialog.Title>

            <RadixDialog.Close asChild>
              <button
                type="button"
                className="cursor-pointer text-light/70 hover:text-light"
              >
                ✕
              </button>
            </RadixDialog.Close>
          </div>

          <div className="flex flex-1">{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
