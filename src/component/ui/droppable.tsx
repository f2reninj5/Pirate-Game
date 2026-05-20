import { useDndContext, useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export default function Droppable({
  id,
  children,
  className,
  hoverClassName,
  hoverOverlay,
}: {
  id: string;
  children?: ReactNode;
  className?: string;
  hoverClassName?: string;
  hoverOverlay?: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const { active } = useDndContext();
  const activeContainerId = active?.id.toString().split(":")[0];
  const isSameContainer = id === activeContainerId;
  const showOverlay = isOver && !isSameContainer;

  return (
    <div
      ref={setNodeRef}
      className={cn("relative", className, isOver ? hoverClassName : "")}
    >
      {children}
      {showOverlay && hoverOverlay}
    </div>
  );
}
