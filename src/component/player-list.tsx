import { Plus } from "lucide-react";
import { useContext } from "react";
import { GameContext } from "@/context/game-context";
import Player from "./player";

export default function PlayerList() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { gameState } = gameContext;

  return (
    <div className="bg-dark shadow-inner shadow-black p-2 rounded-md flex flex-col gap-2">
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
            <Player player={player} key={player} />
          </div>
        ))}
      </div>
    </div>
  );
}
