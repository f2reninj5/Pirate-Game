import { useDraggable } from "@dnd-kit/core";
import type { ReactNode } from "react";

export default function Draggable({
  id,
  children,
  className,
  showTransform,
}: {
  id: string;
  children?: ReactNode;
  className?: string;
  showTransform?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform:
      transform && showTransform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
    cursor: isDragging ? "grabbing" : "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={className}
    >
      {children}
    </div>
  );
}
