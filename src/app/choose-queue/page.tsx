"use client";

import { DndContext, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Droppable from "@/component/ui/droppable";
import { useGameContext } from "@/context/game-context";
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

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex flex-row gap-2 px-2 rounded-sm w-30 bg-zinc-100 hover:bg-zinc-300 cursor-grab brightness-75 opacity-50 outline-rose-500 outline-2"
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
      className="flex flex-row gap-2 px-2 rounded-sm w-30 bg-zinc-100 hover:bg-zinc-300 cursor-grab"
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

function Queue({ idGenerator }: { idGenerator: IdGenerator }) {
  const { chooseQueueState } = useGameContext();
  const queue: PlayerData[] = chooseQueueState.queue.map((player, index) => ({
    id: idGenerator.nextId(),
    data: { container: Container.QUEUE, player, index },
  }));

  return (
    <SortableContext items={queue.map((p) => p.id)}>
      <div className="flex flex-col gap-1 min-h-100">
        {queue.map((p) => {
          if (p.data.container !== Container.QUEUE) return null;
          return <PlayerItem {...p} key={p.data.index} />;
        })}
      </div>
    </SortableContext>
  );
}

export default function ChooseQueue() {
  const [mounted, setMounted] = useState(false);
  const { chooseQueueState, chooseQueueActions } = useGameContext();
  const [activePlayerItem, setActivePlayerItem] = useState<PlayerData | null>(
    null,
  );

  useEffect(() => {
    setMounted(true);
  });

  const idGenerator = new IdGenerator();

  const stage = chooseQueueState.stage.map((player) => ({
    id: idGenerator.nextId(),
    data: { player },
  }));

  return (
    <DndContext
      onDragStart={(event: DragStartEvent) => {
        if (event.active.data.current) {
          setActivePlayerItem({
            id: event.active.id as number,
            data: event.active.data.current as PlayerData["data"],
          });
          return;
        }
      }}
      onDragOver={() => {}}
      onDragEnd={() => {}}
    >
      <div className="flex flex-row gap-2 justify-between">
        <PlayerList idGenerator={idGenerator} />
        <Queue idGenerator={idGenerator} />
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
