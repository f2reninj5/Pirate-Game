"use client";

import { ContextMenu as RadixContextMenu } from "radix-ui";
import type { ComponentProps } from "react";

function Item({ ...props }: ComponentProps<typeof RadixContextMenu.Item>) {
  return (
    <RadixContextMenu.Item
      className="outline-none rounded-xs px-2 py-1 hover:bg-zinc-700 hover:cursor-pointer"
      {...props}
    />
  );
}
function Label({ ...props }: ComponentProps<typeof RadixContextMenu.Label>) {
  return (
    <RadixContextMenu.Label className="text-zinc-400 text-xs m-1" {...props} />
  );
}

function Separator({
  ...props
}: ComponentProps<typeof RadixContextMenu.Separator>) {
  return (
    <RadixContextMenu.Separator
      className="h-px bg-light mx-1 my-2"
      {...props}
    />
  );
}

export default function ContextMenuDemo() {
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger>Right-click here.</RadixContextMenu.Trigger>

      <RadixContextMenu.Portal>
        <RadixContextMenu.Content className="bg-dark text-light p-2 rounded-sm">
          <Item>Edit name</Item>
          <Item>Delete player</Item>

          <Separator />

          <Label>People</Label>
          <Item>Back</Item>
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
}
