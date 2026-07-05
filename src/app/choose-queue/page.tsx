"use client";

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Droppable from "@/component/ui/droppable";
import InlineIconButton from "@/component/ui/inline-icon-button";
import { useGameContext } from "@/context/game-context";
import { cn } from "@/lib/cn";
import { IdGenerator } from "@/lib/dnd";

enum Container {
  PLAYER_LIST,
  STAGE,
  QUEUE,
}

type PlayerData = {
  id: number;
  data:
    | { container: Container.QUEUE; player: string; index: number }
    | { container: Exclude<Container, Container.QUEUE>; player: string };
};

function PlayerItem({ id, data }: PlayerData) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data });
  const isStaged = data.container === Container.STAGE;

  const style = { transition, transform: CSS.Transform.toString(transform) };
  const bg = isStaged
    ? "bg-green-100 hover:bg-green-300"
    : "bg-zinc-100 hover:bg-zinc-300";

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={cn(
          "flex flex-row gap-2 px-2 rounded-sm w-30 cursor-grab brightness-75 opacity-50 outline-rose-500 outline-2",
          bg,
        )}
      >
        <span className="text-nowrap overflow-hidden select-none invisible">
          -
        </span>
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn("flex flex-row gap-2 px-2 rounded-sm w-30 cursor-grab", bg)}
    >
      <span className="text-nowrap overflow-hidden select-none">
        {data.player}
      </span>
    </div>
  );
}

function PlayerList({ idGenerator }: { idGenerator: IdGenerator }) {
  const { playersState } = useGameContext();
  const players: PlayerData[] = playersState.players.map((player) => ({
    id: idGenerator.nextId(),
    data: { container: Container.PLAYER_LIST, player },
  }));

  return (
    <Droppable id="player-list">
      <div className="flex flex-col gap-1 min-h-100">
        {players.map((p) => (
          <PlayerItem {...p} key={p.data.player} />
        ))}
      </div>
    </Droppable>
  );
}

function Queue({
  idGenerator,
  hoveringPlayer,
}: {
  idGenerator: IdGenerator;
  hoveringPlayer?: PlayerData;
}) {
  const { chooseQueueState, chooseQueueActions } = useGameContext();
  const queue: PlayerData[] = chooseQueueState.queue.map((player, index) => ({
    id: idGenerator.nextId(),
    data: { container: Container.QUEUE, player, index },
  }));
  const stage: PlayerData[] = chooseQueueState.stage.map((player) => ({
    id: idGenerator.nextId(),
    data: { container: Container.STAGE, player },
  }));

  return (
    <Droppable id="queue">
      <div className="flex flex-col gap-1 min-h-100">
        <SortableContext items={queue.map((p) => p.id)}>
          <div className="flex flex-col gap-1">
            {queue.map((p) => {
              if (p.data.container !== Container.QUEUE) return null;
              return <PlayerItem {...p} key={p.data.index} />;
            })}
          </div>
        </SortableContext>
        <SortableContext items={stage.map((p) => p.id)}>
          <div className="flex flex-col gap-1">
            {stage.map((p) => {
              return <PlayerItem {...p} key={p.data.player} />;
            })}
            {hoveringPlayer && (
              <div className="flex flex-row gap-2 px-2 rounded-sm w-30 h-lh bg-green-300" />
            )}
            {stage.length > 0 && (
              <div className="flex flex-row gap-2 px-2 rounded-sm w-30 h-lh">
                <InlineIconButton
                  icon={Shuffle}
                  onClick={chooseQueueActions.shuffleStage}
                />
                <InlineIconButton
                  icon={Check}
                  onClick={chooseQueueActions.commitStage}
                />
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </Droppable>
  );
}

export default function ChooseQueue() {
  const [mounted, setMounted] = useState(false);
  const [activePlayerItem, setActivePlayerItem] = useState<PlayerData | null>(
    null,
  );
  const [isOverQueueFromPlayerList, setIsOverQueueFromPlayerList] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  });

  const idGenerator = new IdGenerator();

  return (
    <DndContext
      onDragStart={(event: DragStartEvent) => {
        console.log(`start: ${event.active.data?.current?.player}`);
        if (event.active.data.current) {
          setActivePlayerItem({
            id: event.active.id as number,
            data: event.active.data.current as PlayerData["data"],
          });
          return;
        }
      }}
      onDragOver={(event: DragOverEvent) => {
        console.log(
          `over: ${event.active.data?.current?.player} | ${event.over?.id} ${event.over?.data?.current?.player}`,
        );
        if (activePlayerItem?.data.container !== Container.PLAYER_LIST)
          return setIsOverQueueFromPlayerList(false);
        if (event.over?.id === "queue")
          return setIsOverQueueFromPlayerList(true);

        const overPlayerData = event.over?.data.current as
          | PlayerData["data"]
          | undefined;

        console.log(overPlayerData);

        if (
          overPlayerData?.container &&
          [Container.QUEUE, Container.STAGE].includes(overPlayerData.container)
        )
          return setIsOverQueueFromPlayerList(true);

        return setIsOverQueueFromPlayerList(false);
      }}
      onDragEnd={(event: DragEndEvent) => {
        console.log(
          `end: ${event.active.data?.current?.player} | ${event.over?.id} ${event.over?.data?.current?.player}`,
        );

        setIsOverQueueFromPlayerList(false);
        setActivePlayerItem(null);
      }}
    >
      <div className="flex flex-row gap-2 justify-between">
        <PlayerList idGenerator={idGenerator} />
        <Queue
          idGenerator={idGenerator}
          hoveringPlayer={
            isOverQueueFromPlayerList && activePlayerItem
              ? activePlayerItem
              : undefined
          }
        />
      </div>

      {mounted &&
        createPortal(
          <DragOverlay>
            {activePlayerItem && <PlayerItem {...activePlayerItem} />}
          </DragOverlay>,
          document.body,
        )}
    </DndContext>
  );
}
