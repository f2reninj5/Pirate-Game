import { useContext } from "react";
import { GameContext } from "@/context/game-context";

export default function PlayerList() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { gameState } = gameContext;

  return (
    <div className="grid grid-cols-2 gap-2">
      {gameState.players.map((player) => (
        <div key={player} className="flex flex-row gap-2">
          <input type="checkbox" />
          <span>{player}</span>
        </div>
      ))}
    </div>
  );
}
