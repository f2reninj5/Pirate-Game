"use client";

import { DndContext, DragOverlay, useDndContext } from "@dnd-kit/core";
import { Check, Shuffle } from "lucide-react";
import Draggable from "@/component/ui/draggable";
import Droppable from "@/component/ui/droppable";
import InlineIconButton from "@/component/ui/inline-icon-button";
import { useGameContext } from "@/context/game-context";

function HoverOverlay({ text }: { text: string }) {
  return (
    <div className="absolute bg-black/50 w-full h-full flex justify-center items-center p-2">
      <div className="bg-light text-balance text-center rounded-md p-1">
        {text}
      </div>
    </div>
  );
}

function ActivePlayerItem() {
  const { active } = useDndContext();
  const player = active?.id.toString().split(":")[1];

  return (
    <div className="flex flex-row gap-2 px-2 rounded-sm w-30 bg-zinc-100 hover:bg-zinc-300">
      <span className="text-nowrap overflow-hidden select-none">{player}</span>
    </div>
  );
}

function StagePlayerItem({ player }: { player: string }) {
  return (
    <div className="flex flex-row gap-2 px-2 rounded-sm w-30 bg-green-200 hover:bg-green-300">
      <span className="text-nowrap overflow-hidden select-none">{player}</span>
    </div>
  );
}

function DraggablePlayerItem({
  player,
  containerId,
}: {
  player: string;
  containerId: string;
}) {
  return (
    <Draggable
      id={`${containerId}:${player}`}
      showTransform={false}
      className="flex flex-row gap-2 px-2 rounded-sm w-30 bg-zinc-100 hover:bg-zinc-300"
    >
      <span className="text-nowrap overflow-hidden select-none">{player}</span>
    </Draggable>
  );
}

function PlayerList() {
  const { playersState } = useGameContext();

  return (
    <Droppable
      id="player-list"
      className="flex flex-col gap-1 min-h-100"
      hoverOverlay={<HoverOverlay text="Remove from queue" />}
    >
      {playersState.players.map((player) => (
        <DraggablePlayerItem
          player={player}
          containerId={"player-list"}
          key={player}
        />
      ))}
    </Droppable>
  );
}

export default function ChooseQueue() {
  const { chooseQueueState, chooseQueueActions } = useGameContext();

  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (!over) return;

        const [sourceContainerId, player] = active.id.toString().split(":");

        if (
          over.id.toString() === "choose-queue" &&
          sourceContainerId === "player-list"
        ) {
          chooseQueueActions.stagePlayer(player);
        }
      }}
    >
      <div className="flex flex-row gap-2 justify-between">
        <PlayerList />
        <Droppable
          id="choose-queue"
          className="flex flex-col gap-1"
          hoverOverlay={<HoverOverlay text="Add to queue" />}
        >
          <div className="flex flex-col gap-1">
            {chooseQueueState.queue.map((player) => (
              <DraggablePlayerItem
                player={player}
                containerId="choose-queue"
                key={player}
              />
            ))}
            {chooseQueueState.stage.map((player) => (
              <StagePlayerItem player={player} key={player} />
            ))}
            {chooseQueueState.stage.length > 0 ? (
              <div className="px-2 w-30">
                <span className="flex flex-row gap-2">
                  <InlineIconButton
                    icon={Shuffle}
                    onClick={chooseQueueActions.shuffleStage}
                  />
                  <InlineIconButton icon={Check} />
                </span>
              </div>
            ) : null}
          </div>
        </Droppable>
      </div>

      <DragOverlay dropAnimation={null}>
        <ActivePlayerItem />
      </DragOverlay>
    </DndContext>
  );
}
