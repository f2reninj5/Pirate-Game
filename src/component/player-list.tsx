import { Edit } from "lucide-react";
import { useContext } from "react";
import { GameContext } from "@/context/game-context";

function Player({ player }: { player: string }) {
  return (
    <div className="flex flex-row gap-2 bg-gray-400">
      <input type="checkbox" />
      <span>{player}</span>
      <button type="button">
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
    <div className="">
      {gameState.players.map((player) => (
        <Player player={player} key={player}></Player>
      ))}
    </div>
  );
}
