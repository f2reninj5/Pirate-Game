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
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>

      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />

        <RadixDialog.Content
          className="fixed top-1/2 left-1/2 -translate-1/2 bg-dark text-light p-4 rounded-xl flex flex-col w-[min(400px,90%)] min-h-50 max-h-[90%]"
          onEscapeKeyDown={(e) => {
            if (e.target instanceof HTMLInputElement) {
              e.preventDefault();
            }
          }}
        >
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

          <div className="flex flex-col flex-1 overflow-auto">{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
