import { useEffect, useRef, useState } from "react";
import ContextMenu from "@/component/ui/context-menu";
import { useSelectionContext } from "@/context/selection-context";
import { cn } from "@/lib/cn";

function EditableText({
  value: initialValue,
  editing,
  onSave,
  onCancel,
}: {
  value: string;
  editing: boolean;
  onSave: (value: string) => void;
  onCancel: () => void;
}) {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editing) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 10);
    }
  }, [editing]);

  return editing ? (
    <input
      className="w-full"
      type="text"
      value={value}
      ref={inputRef}
      autoFocus
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSave(value);
        }

        if (e.key === "Escape") {
          setValue(initialValue);
          onCancel();
        }
      }}
    />
  ) : (
    <span className="text-nowrap overflow-hidden">{initialValue}</span>
  );
}

export default function Player({ player }: { player: string }) {
  const [editing, setEditing] = useState(false);
  const selectionContext = useSelectionContext();

  const selfSelected = selectionContext.selected.has(player);

  function startEditing() {
    selectionContext.selectOne(player);
    setEditing(true);
  }

  function stopEditing() {
    selectionContext.clear();
    setEditing(false);
  }

  return (
    <ContextMenu
      groups={[
        {
          items: [
            {
              name: "Edit name",
              onSelect: startEditing,
            },
            { name: "Delete player" },
          ],
        },
        { name: "People", items: [{ name: "Back" }] },
      ]}
    >
      <button
        className={cn(
          "flex flex-row gap-2 px-2 rounded-sm w-30 bg-gray-800 hover:bg-gray-700",
          selfSelected ? "bg-gray-700" : "",
        )}
        onClick={() => selectionContext.toggle(player)}
        type="button"
      >
        <EditableText
          editing={editing}
          value={player}
          onSave={stopEditing}
          onCancel={stopEditing}
        />
      </button>
    </ContextMenu>
  );
}
