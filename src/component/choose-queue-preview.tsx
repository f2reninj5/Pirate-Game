"use client";

import Link from "next/link";
import Button from "@/component/ui/button";
import { useGameContext } from "@/context/game-context";

export default function ChooseQueuePreview() {
  const { chooseQueueState } = useGameContext();

  return (
    <Link href="/choose-queue">
      <Button className="text-2xl p-2 flex flex-col gap-2 isolate">
        <div>Choose Queue</div>
        <div className="flex flex-col items-center">
          <div
            className="bg-light text-dark text-[1em] w-full rounded-[0.25em] h-lh z-2 shadow-[0_0.1em_0.5em_0.1em] shadow-dark/50"
            style={{
              visibility:
                chooseQueueState.queue.length < 1 ? "hidden" : "visible",
            }}
          >
            {chooseQueueState.queue[0]?.name}
          </div>
          <div
            className="bg-light text-dark brightness-75 text-[0.75em] w-[75%] rounded-[0.25em] h-lh mt-[-0.5em] z-1 shadow-[0_0.1em_0.5em_0.1em] shadow-dark/50"
            style={{
              visibility:
                chooseQueueState.queue.length < 2 ? "hidden" : "visible",
            }}
          >
            {chooseQueueState.queue[1]?.name}
          </div>
          <div
            className="bg-light text-dark brightness-[56.25%] text-[0.5625em] w-[56.25%] rounded-[0.25em] h-lh mt-[-0.5em] shadow-[0_0.1em_0.5em_0.1em]"
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
