"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Root({
  className,
  ...props
}: ComponentProps<typeof RadixAccordion.Root>) {
  return <RadixAccordion.Root className={className} {...props} />;
}

export function Item({
  className,
  ...props
}: ComponentProps<typeof RadixAccordion.Item>) {
  return <RadixAccordion.Item className={className} {...props} />;
}

export function Trigger({
  children,
  className,
  ...props
}: ComponentProps<typeof RadixAccordion.Trigger>) {
  return (
    <RadixAccordion.Trigger
      className={cn("group flex flex-row items-center gap-2", className)}
      {...props}
    >
      <ChevronDown className="transition-transform group-data-[state=open]:rotate-180" />
      {children}
    </RadixAccordion.Trigger>
  );
}

export function Content({
  className,
  ...props
}: ComponentProps<typeof RadixAccordion.Content>) {
  return (
    <RadixAccordion.Content
      className={cn(
        "overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out]",
        className,
      )}
      {...props}
    />
  );
}
