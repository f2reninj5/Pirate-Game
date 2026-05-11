import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function Droppable({
  id,
  children,
  className,
  hoverClassName,
}: {
  id: string;
  children?: ReactNode;
  className?: string;
  hoverClassName?: string;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(className, isOver ? hoverClassName : "")}
    >
      {children}
    </div>
  );
}
