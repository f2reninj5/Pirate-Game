import { Plus } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { GameContext } from "@/context/game-context";
import Player from "./player";

export default function PlayerList() {
  const gameContext = useContext(GameContext);
  const ref = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  if (!gameContext) return null;
  const { gameState } = gameContext;

  return (
    <div className="bg-dark shadow-inner shadow-black p-2 rounded-md flex flex-col gap-2">
      <div>Players</div>
      <div className="flex flex-row gap-2">
        <input
          ref={ref}
          className="w-30 outline-none"
          type="text"
          placeholder="Name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Escape") {
              setInput("");
              if (ref.current) ref.current.blur();
            }
          }}
        />
        <button type="button">
          <Plus size="1em"></Plus>
        </button>
      </div>
      <div className="flex flex-col gap-1 h-[min(300px,50vh)] overflow-scroll pr-3">
        {gameState.players
          .filter((player) =>
            player.toLowerCase().startsWith(input.toLowerCase()),
          )
          .map((player) => (
            <div className="flex flex-row gap-2" key={player}>
              <input type="checkbox" />
              <Player player={player} key={player} />
            </div>
          ))}
      </div>
    </div>
  );
}
