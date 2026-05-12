import { Check, Edit, X } from "lucide-react";
import { useState } from "react";

export default function Player({ player }: { player: string }) {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(player);

  return (
    <div className="group flex flex-row gap-2 px-2 rounded-sm w-30 bg-gray-800 overflow-hidden">
      {editing ? (
        <>
          <input
            autoFocus
            className="w-15 outline-none"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />{" "}
          <button type="button" onClick={() => {}}>
            <Check size="1em" />
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setInput(player);
            }}
          >
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
  );
}
