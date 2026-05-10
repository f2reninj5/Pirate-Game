"use client";

import { useContext } from "react";
import Dialog from "@/component/ui/dialog";
import { GameContext } from "@/context/game-context";

function ChooseQueueTrigger(queue: string[]) {
  return (
    <button type="button">
      <div>Choose Queue</div>
      {queue.map((player, _) => (
        <div key={player}>{player}</div>
      ))}
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
      hello
    </Dialog>
  );
}
