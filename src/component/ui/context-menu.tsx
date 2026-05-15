"use client";

import { ContextMenu as RadixContextMenu } from "radix-ui";
import type { ComponentProps, MouseEventHandler, ReactNode } from "react";

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

function ItemGroup({
  group,
}: {
  group: {
    name?: string;
    items: { name: string; onClick?: MouseEventHandler }[];
  };
}) {
  const { name, items } = group;
  return (
    <>
      {name ? <Label>{name}</Label> : null}
      {items.map((item) => (
        <Item key={item.name} onClick={item.onClick}>
          {item.name}
        </Item>
      ))}
    </>
  );
}

export default function ContextMenu({
  trigger,
  groups,
}: {
  trigger: ReactNode;
  groups: {
    name?: string;
    items: { name: string; onClick?: MouseEventHandler }[];
  }[];
}) {
  return (
    <RadixContextMenu.Root>
      <RadixContextMenu.Trigger>{trigger}</RadixContextMenu.Trigger>

      <RadixContextMenu.Portal>
        <RadixContextMenu.Content className="bg-dark text-light p-2 rounded-sm">
          {groups.map((group, i) => (
            <>
              {i === 0 ? null : <Separator key={`-${group.name ?? ""}`} />}
              <ItemGroup group={group} key={group.name ?? ""} />
            </>
          ))}
        </RadixContextMenu.Content>
      </RadixContextMenu.Portal>
    </RadixContextMenu.Root>
  );
}
