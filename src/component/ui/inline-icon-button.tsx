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
    <Button className={cn("", className)} {...props}>
      <Icon size="1em" />
    </Button>
  );
}
