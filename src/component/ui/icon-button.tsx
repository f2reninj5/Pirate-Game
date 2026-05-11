import type { LucideIcon } from "lucide-react";
import type { ComponentProps } from "react";
import Button from "@/component/ui/button";
import { cn } from "@/lib/cn";

export default function IconButton({
  icon: Icon,
  className,
  ...props
}: ComponentProps<typeof Button> & { icon: LucideIcon }) {
  return (
    <Button className={cn("text-2xl p-1", className)} {...props}>
      <Icon size="1em" />
    </Button>
  );
}
