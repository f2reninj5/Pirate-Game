"use client";

import { useContext } from "react";
import PlayerList from "@/component/player-list";
import Dialog from "@/component/ui/dialog";
import { GameContext } from "@/context/game-context";

function ChooseQueueTrigger(queue: string[]) {
  return (
    <button className="bg-gray-100 p-2 flex flex-col gap-2" type="button">
      <div>Choose Queue</div>
      <div className=" flex flex-col items-center gap-1">
        <div className="bg-gray-400 text-[16px] w-full">{queue[0]}</div>
        <div className="bg-gray-300 text-[12px] w-[75%]">{queue[1]}</div>
        <div className="bg-gray-200 text-[9px] w-[56.25%]">{queue[2]}</div>
      </div>
    </button>
  );
}

export default function ChooseQueue() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { gameState, gameDispatch } = gameContext;

  return (
    <Dialog
      trigger={ChooseQueueTrigger(gameState.chooseQueue)}
      title="Choose Queue"
    >
      <div className="flex flex-row gap-2">
        <div className="grid grid-cols-2">
          <span>Next:</span>
          <div>
            {gameState.chooseQueue.map((player) => (
              <div key={player}>{player}</div>
            ))}
          </div>
        </div>
        <PlayerList></PlayerList>
      </div>
    </Dialog>
  );
}
