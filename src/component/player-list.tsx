import { Delete, ListPlus, Plus } from "lucide-react";
import { useRef, useState } from "react";
import IconButton from "@/component/ui/icon-button";
import { useGameContext } from "@/context/game-context";
import { SelectionProvider } from "@/context/selection-context";
import Player from "./player";

export default function PlayerList() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const { playersState, playersActions } = useGameContext();

  function unfocusInput() {
    if (ref.current) ref.current.blur();
  }

  function addPlayer() {
    if (input === "") return;
    if (
      playersState.players.some(
        (player) => player.toLowerCase() === input.toLowerCase(),
      )
    ) {
      return;
    }
    playersActions.addPlayer(input.trim());
    setInput("");
  }

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
              unfocusInput();
            }

            if (e.code === "Enter") {
              addPlayer();
            }
          }}
        />
        <button onClick={addPlayer} type="button">
          <Plus size="1em"></Plus>
        </button>
      </div>
      <SelectionProvider>
        <div className="flex flex-col gap-1 h-[min(300px,50vh)] overflow-scroll pr-3 py-1">
          {playersState.players
            .filter((player) =>
              player.toLowerCase().startsWith(input.toLowerCase()),
            )
            .map((player) => (
              <Player player={player} key={player} />
            ))}
        </div>
      </SelectionProvider>
      <div className="flex flex-row gap-2 justify-between">
        <input type="checkbox" />
        <div className="flex flex-row gap-2">
          <IconButton className="text-[1em]" icon={Delete} />
          <IconButton className="text-[1em]" icon={ListPlus}></IconButton>
        </div>
      </div>
    </div>
  );
}
