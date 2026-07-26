import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import Button from "@/component/ui/button";
import { cn } from "@/lib/cn";

export default function InlineIconButton({
  icon: Icon,
  className,
  ...props
}: ComponentProps<typeof Button> & { icon: LucideIcon }) {
  return (
    <Button
      className={cn(
        "bg-transparent text-inherit rounded-full hover:scale-125 duration-200 ease-out outline-none h-lh",
        className,
      )}
      {...props}
    >
      <Icon size="1em" />
    </Button>
  );
}
