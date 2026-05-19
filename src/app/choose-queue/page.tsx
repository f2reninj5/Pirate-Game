"use client";

import { ArrowRight } from "lucide-react";
import Player from "@/component/player";
import PlayerList from "@/component/player-list";
import { useGameContext } from "@/context/game-context";
import { SelectionProvider } from "@/context/selection-context";

export default function ChooseQueue() {
  const { chooseQueueState } = useGameContext();

  return (
    <div className="flex flex-row gap-2 justify-between">
      <PlayerList></PlayerList>
      <div className="grid grid-cols-[max-content_auto] gap-1">
        <span>
          Next <ArrowRight className="inline" size="1em"></ArrowRight>
        </span>
        <SelectionProvider>
          <div className="flex flex-col gap-1">
            {chooseQueueState.queue.map((player) => (
              <Player player={player} key={player} />
            ))}
          </div>
        </SelectionProvider>
      </div>
    </div>
  );
}
