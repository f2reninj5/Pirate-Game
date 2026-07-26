"use client";

import Link from "next/link";
import Button from "@/component/ui/button";
import { useGameContext } from "@/context/game-context";

export default function ChooseQueuePreview() {
  const { chooseQueueState } = useGameContext();

  return (
    <Link href="/choose-queue" className="w-fit h-fit">
      <Button className="text-2xl p-2 flex flex-col gap-2 isolate">
        <div>Choose Queue</div>
        <div className="flex flex-col items-center">
          <div
            className="bg-light text-dark player-item text-[1em] z-2 shadow-[0_0.1em_0.5em_0.1em] shadow-dark/50"
            style={{
              visibility:
                chooseQueueState.queue.length < 1 ? "hidden" : "visible",
            }}
          >
            {chooseQueueState.queue[0]?.name}
          </div>
          <div
            className="bg-light text-dark player-item text-[0.75em] brightness-90 mt-[-0.5em] z-1 shadow-[0_0.1em_0.5em_0.1em] shadow-dark/50"
            style={{
              visibility:
                chooseQueueState.queue.length < 2 ? "hidden" : "visible",
            }}
          >
            {chooseQueueState.queue[1]?.name}
          </div>
          <div
            className="bg-light text-dark player-item text-[0.5625em] brightness-81 mt-[-0.5em] shadow-[0_0.1em_0.5em_0.1em]"
            style={{
              visibility:
                chooseQueueState.queue.length < 3 ? "hidden" : "visible",
            }}
          >
            {chooseQueueState.queue[2]?.name}
          </div>
        </div>
      </Button>
    </Link>
  );
}
