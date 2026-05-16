import { Check, Edit, X } from "lucide-react";
import { useState } from "react";
import ContextMenu from "@/component/ui/context-menu";

export default function Player({ player }: { player: string }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(player);

  function save() {
    setEditing(false);
  }

  function cancel() {
    setEditing(false);
    setInput(player);
  }

  return (
    <ContextMenu
      groups={[
        {
          items: [
            {
              name: "Edit name",
              onSelect: () => {
                console.log("Edit name");
              },
            },
            { name: "Delete player" },
          ],
        },
        { name: "People", items: [{ name: "Back" }] },
      ]}
    >
      <div className="group flex flex-row gap-2 px-2 rounded-sm w-30 bg-gray-800 hover:bg-gray-700 overflow-hidden">
        {editing ? (
          <>
            <input
              autoFocus
              className="w-15 outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  save();
                }

                if (e.key === "Escape") {
                  cancel();
                }
              }}
            />{" "}
            <button type="button" onClick={save}>
              <Check size="1em" />
            </button>
            <button type="button" onClick={cancel}>
              <X size="1em" />
            </button>
          </>
        ) : (
          <>
            <span className="text-nowrap overflow-hidden">{player}</span>
            <button
              onClick={() => setEditing(true)}
              className="hidden group-hover:block opacity-20 hover:opacity-100"
              type="button"
            >
              <Edit size="1em" />
            </button>
          </>
        )}
      </div>
    </ContextMenu>
  );
}
