import { Edit, Plus } from "lucide-react";
import { useContext, useState } from "react";
import { GameContext } from "@/context/game-context";

function Player({ player }: { player: string }) {
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

export default function PlayerList() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { gameState } = gameContext;

  return (
    <div className="flex flex-col gap-2">
      <div>Players</div>
      <div className="flex flex-row gap-2">
        <input className="w-30" type="text" placeholder="Name" />
        <button type="button">
          <Plus size="1em"></Plus>
        </button>
      </div>
      <div className="flex flex-col gap-1 h-[min(300px,50vh)] overflow-scroll pr-3">
        {gameState.players.map((player) => (
          <div className="flex flex-row gap-2" key={player}>
            <input type="checkbox" />
            <Player player={player} key={player}></Player>
          </div>
        ))}
      </div>
    </div>
  );
}
