"use client";

import Link from "next/link";
import { useGameContext } from "@/context/game-context";

export default function ChooseQueuePreview() {
  const { chooseQueueState } = useGameContext();

  return (
    <Link
      href="/choose-queue"
      className="text-2xl bg-gray-100 p-2 flex flex-col gap-2"
    >
      <div>Choose Queue</div>
      <div className="flex flex-col items-center gap-1">
        <div
          className="bg-gray-400 text-[1em] w-full"
          style={{
            visibility:
              chooseQueueState.queue.length < 1 ? "hidden" : "visible",
          }}
        >
          {chooseQueueState.queue[0] ?? "."}
        </div>
        <div
          className="bg-gray-300 text-[0.75em] w-[75%]"
          style={{
            visibility:
              chooseQueueState.queue.length < 2 ? "hidden" : "visible",
          }}
        >
          {chooseQueueState.queue[1] ?? "."}
        </div>
        <div
          className="bg-gray-200 text-[0.5625em] w-[56.25%]"
          style={{
            visibility:
              chooseQueueState.queue.length < 3 ? "hidden" : "visible",
          }}
        >
          {chooseQueueState.queue[2] ?? "."}
        </div>
      </div>
    </Link>
  );
}
