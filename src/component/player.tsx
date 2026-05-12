import { Edit } from "lucide-react";
import { useState } from "react";

export default function Player({ player }: { player: string }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(player);

  return (
    <div className="flex flex-row gap-2 px-2 rounded-sm w-30 bg-gray-800">
      <span className="text-nowrap overflow-hidden">{player}</span>
      <button className="opacity-20 hover:opacity-100" type="button">
        <Edit size="1em"></Edit>
      </button>
    </div>
  );
}
