"use client";

import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Check, Plus, Shuffle } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import ContextMenu from "@/component/ui/context-menu";
import Droppable from "@/component/ui/droppable";
import InlineIconButton from "@/component/ui/inline-icon-button";
import { useGameContext } from "@/context/game-context";
import { cn } from "@/lib/cn";
import type { Player } from "@/lib/player";

enum Container {
  PLAYER_LIST,
  STAGE,
  QUEUE,
}

type DndPlayer = {
  id: string;
  data: { container: Container; player: Player; index: number };
};

function createDndPlayer(player: Player, index: number, container: Container) {
  return {
    id: player._id,
    data: { container, player, index },
  };
}

function PlayerItem({ id, data }: DndPlayer) {
  const { playersActions, chooseQueueActions } = useGameContext();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(data.player.name);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, data, disabled: editing });
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

  if (editing) {
    return (
      <div
        style={style}
        className={cn("flex flex-row gap-2 px-2 rounded-sm w-30 ", bg)}
      >
        <input
          className="text-nowrap overflow-hidden select-none w-full"
          autoFocus
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={() => {
            setEditing(false);
            setNewName(data.player.name);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setEditing(false);
              playersActions.renamePlayer(data.player.name, newName);
            } else if (e.key === "Escape") {
              setEditing(false);
              setNewName(data.player.name);
            }
          }}
        />
      </div>
    );
  }

  const contextMenuGroups = [
    {
      name: "Player",
      items: [
        {
          name: "Rename",
          onSelect: () => {
            setEditing(true);
          },
        },
        {
          name: "Delete",
          onSelect: () => {
            playersActions.deletePlayer(data.player.name);
          },
        },
      ],
    },
  ];

  if (data.container === Container.QUEUE) {
    contextMenuGroups.unshift({
      name: "Queue",
      items: [
        {
          name: "Remove from queue",
          onSelect: () => {
            chooseQueueActions.removePlayer(data.index);
          },
        },
      ],
    });
  }

  if (data.container === Container.STAGE) {
    contextMenuGroups.unshift({
      name: "Stage",
      items: [
        {
          name: "Unstage",
          onSelect: () => {
            chooseQueueActions.unstagePlayer(data.player.name);
          },
        },
      ],
    });
  }

  return (
    <ContextMenu groups={contextMenuGroups}>
      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className={cn(
          "flex flex-row gap-2 px-2 rounded-sm w-30 cursor-grab",
          bg,
        )}
      >
        <span className="text-nowrap overflow-hidden select-none">
          {data.player.name}
        </span>
      </div>
    </ContextMenu>
  );
}

function PlayerList() {
  const { playersState, playersActions } = useGameContext();
  const [adding, setAdding] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState("");
  const players: DndPlayer[] = playersState.players.map((player, index) =>
    createDndPlayer(player, index, Container.PLAYER_LIST),
  );

  return (
    <Droppable id="player-list">
      <div className="flex flex-col gap-1 min-h-100">
        {players.map((p) => (
          <PlayerItem {...p} key={p.id} />
        ))}
        {adding ? (
          <input
            className="px-2 rounded-sm w-30 h-lh"
            autoFocus
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            onBlur={() => {
              setAdding(false);
              setNewPlayerName("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setAdding(false);
                playersActions.addPlayer(newPlayerName);
                setNewPlayerName("");
              } else if (e.key === "Escape") {
                setAdding(false);
                setNewPlayerName("");
              }
            }}
          />
        ) : (
          <div className="flex flex-row gap-2 px-2 rounded-sm w-30 h-lh">
            <InlineIconButton icon={Plus} onClick={() => setAdding(true)} />
          </div>
        )}
      </div>
    </Droppable>
  );
}

function Queue({ hoveringPlayer }: { hoveringPlayer?: DndPlayer }) {
  const { chooseQueueState, chooseQueueActions } = useGameContext();
  const queue: DndPlayer[] = chooseQueueState.queue.map((player, index) =>
    createDndPlayer(player, index, Container.QUEUE),
  );
  const stage: DndPlayer[] = chooseQueueState.stage.map((player, index) =>
    createDndPlayer(player, index, Container.STAGE),
  );

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
              return <PlayerItem {...p} key={p.id} />;
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
  const { chooseQueueActions } = useGameContext();
  const [activePlayerItem, setActivePlayerItem] = useState<DndPlayer | null>(
    null,
  );
  const [movingFromPlayerListToQueue, setMovingFromPlayerListToQueue] =
    useState(false);

  useEffect(() => {
    setMounted(true);
  });

  return (
    <DndContext
      sensors={useSensors(useSensor(PointerSensor))}
      collisionDetection={pointerWithin}
      onDragStart={(event: DragStartEvent) => {
        if (event.active.data.current) {
          setActivePlayerItem({
            id: event.active.id as string,
            data: event.active.data.current as DndPlayer["data"],
          });
          return;
        }
      }}
      onDragOver={(event: DragOverEvent) => {
        if (activePlayerItem?.data.container !== Container.PLAYER_LIST)
          return setMovingFromPlayerListToQueue(false);
        if (event.over?.id === "queue")
          return setMovingFromPlayerListToQueue(true);

        const overPlayerData = event.over?.data.current as
          | DndPlayer["data"]
          | undefined;

        if (
          overPlayerData?.container &&
          [Container.QUEUE, Container.STAGE].includes(overPlayerData.container)
        )
          return setMovingFromPlayerListToQueue(true);

        return setMovingFromPlayerListToQueue(false);
      }}
      onDragEnd={(event: DragEndEvent) => {
        const { over } = event;
        if (!activePlayerItem) return;

        try {
          if (movingFromPlayerListToQueue) {
            chooseQueueActions.stagePlayer(activePlayerItem.data.player.name);
            return;
          }

          if (!over) return;
          if (activePlayerItem.id === over.id) return;
          if (!over.data.current) return;
          const overPlayerData = over.data.current as DndPlayer["data"];

          if (
            activePlayerItem.data.container === Container.QUEUE &&
            overPlayerData.container === Container.QUEUE
          ) {
            chooseQueueActions.movePlayerInQueue(
              activePlayerItem.data.index,
              overPlayerData.index,
            );
          }

          if (
            activePlayerItem.data.container === Container.STAGE &&
            overPlayerData.container === Container.STAGE
          ) {
            chooseQueueActions.movePlayerInStage(
              activePlayerItem.data.index,
              overPlayerData.index,
            );
          }
        } finally {
          setMovingFromPlayerListToQueue(false);
          setActivePlayerItem(null);
        }
      }}
    >
      <div className="flex flex-row gap-2 justify-between">
        <PlayerList />
        <Queue
          hoveringPlayer={
            movingFromPlayerListToQueue && activePlayerItem
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
