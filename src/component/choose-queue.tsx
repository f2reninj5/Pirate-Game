"use client";

import { ArrowRight } from "lucide-react";
import { useContext } from "react";
import Player from "@/component/player";
import PlayerList from "@/component/player-list";
import Dialog from "@/component/ui/dialog";
import { GameContext } from "@/context/game-context";
import { SelectionProvider } from "@/context/selection-context";

function ChooseQueueTrigger(queue: string[]) {
  return (
    <button
      className="text-2xl bg-gray-100 p-2 flex flex-col gap-2"
      type="button"
    >
      <div>Choose Queue</div>
      <div className="flex flex-col items-center gap-1">
        <div className="bg-gray-400 text-[1em] w-full">{queue[0]}</div>
        <div className="bg-gray-300 text-[0.75em] w-[75%]">{queue[1]}</div>
        <div className="bg-gray-200 text-[0.5625em] w-[56.25%]">{queue[2]}</div>
      </div>
    </button>
  );
}

export default function ChooseQueue() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { chooseQueueState } = gameContext;

  return (
    <Dialog
      trigger={ChooseQueueTrigger(chooseQueueState.queue)}
      title="Choose Queue"
    >
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
    </Dialog>
  );
}
