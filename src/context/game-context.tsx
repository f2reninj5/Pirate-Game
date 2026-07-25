"use client";

import { arrayMove } from "@dnd-kit/sortable";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { distinctlyShuffled } from "@/lib/array";
import { getRandomUnusedCell } from "@/lib/grid";
import {
  comparePlayersByName,
  createPlayer,
  type Player,
  playerInArray,
  removePlayer,
  renamePlayer,
} from "@/lib/player";

type GridState = {
  grid: boolean[];
  cellHistory: number[];
  _animation?: "random";
};

type PlayersState = {
  players: Player[];
};

type ChooseQueueState = {
  stage: Player[];
  queue: Player[];
};

type GameState = {
  gridState: GridState;
  playersState: PlayersState;
  chooseQueueState: ChooseQueueState;
};

const initialGameState: GameState = {
  gridState: {
    grid: new Array(49).fill(false),
    cellHistory: [],
  },
  playersState: {
    players: [
      { _id: "0", name: "Alice A" },
      { _id: "1", name: "Alice B" },
      { _id: "2", name: "Benjamin" },
      { _id: "3", name: "Chloe" },
      { _id: "4", name: "Daniel D" },
      { _id: "5", name: "Daniel H" },
      { _id: "6", name: "Ethan" },
      { _id: "7", name: "Fiona" },
      { _id: "8", name: "Grace" },
      { _id: "9", name: "Henry" },
      { _id: "10", name: "Isabella" },
      { _id: "11", name: "Jack J" },
      { _id: "12", name: "Jack K" },
      { _id: "13", name: "Kevin" },
      { _id: "14", name: "Liam" },
      { _id: "15", name: "Mia M" },
      { _id: "16", name: "Mia S" },
      { _id: "17", name: "Noah" },
      { _id: "18", name: "Olivia" },
      { _id: "19", name: "Parker" },
      { _id: "20", name: "Quinn" },
      { _id: "21", name: "Ryan R" },
      { _id: "22", name: "Ryan T" },
      { _id: "23", name: "Sophia" },
      { _id: "24", name: "Thomas" },
      { _id: "25", name: "Uma" },
      { _id: "26", name: "Victor" },
      { _id: "27", name: "Willow" },
      { _id: "28", name: "Xander" },
      { _id: "29", name: "Zoe" },
    ].toSorted(comparePlayersByName),
  },
  chooseQueueState: {
    stage: [
      { _id: "30", name: "Xander" },
      { _id: "31", name: "Willow" },
      { _id: "32", name: "Zoe" },
    ],
    queue: [
      { _id: "33", name: "Zoe" },
      { _id: "34", name: "Victor" },
      { _id: "35", name: "Mia M" },
    ],
  },
};

function loadGameState(): GameState {
  const save = localStorage.getItem("gameState");
  return save ? JSON.parse(save) : initialGameState;
}

function saveGameState(save: GameState) {
  localStorage.setItem("gameState", JSON.stringify(save));
}

type GridActions = {
  toggleCell: (index: number) => void;
  useRandomCell: () => void;
  reset: () => void;
};

type PlayersActions = {
  addPlayer: (name: string) => void;
  deletePlayer: (name: string) => void;
  renamePlayer: (name: string, newName: string) => void;
  reset: () => void;
};

type ChooseQueueActions = {
  stagePlayer: (name: string) => void;
  unstagePlayer: (name: string) => void;
  commitStage: () => void;
  enqueuePlayer: (name: string) => void;
  removePlayer: (index: number) => void;
  dequeuePlayer: () => void;
  reset: () => void;
  shuffleStage: () => void;
  movePlayerInQueue: (from: number, to: number) => void;
  movePlayerInStage: (from: number, to: number) => void;
};

type GameActions = {
  reset: () => void;
};

type GameContextType = {
  gridState: GridState;
  gridActions: GridActions;
  playersState: PlayersState;
  playersActions: PlayersActions;
  chooseQueueState: ChooseQueueState;
  chooseQueueActions: ChooseQueueActions;
  gameActions: GameActions;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gridState, setGridState] = useState<GridState>(
    initialGameState.gridState,
  );
  const [playersState, setPlayersState] = useState<PlayersState>(
    initialGameState.playersState,
  );
  const [chooseQueueState, setChooseQueueState] = useState<ChooseQueueState>(
    initialGameState.chooseQueueState,
  );

  useEffect(() => {
    const { gridState, playersState, chooseQueueState } = loadGameState();
    setGridState(gridState);
    setPlayersState(playersState);
    setChooseQueueState(chooseQueueState);
  }, []);

  useEffect(() => {
    const { _animation: _, ...strippedGridState } = gridState;
    const gameState = {
      gridState: strippedGridState,
      playersState,
      chooseQueueState,
    };
    saveGameState(gameState);
  }, [gridState, playersState, chooseQueueState]);

  const gridActions: GridActions = {
    toggleCell: (i) => {
      const grid = [...gridState.grid];
      const used = !grid[i];

      grid[i] = used;

      const cellHistory = used
        ? [i, ...gridState.cellHistory]
        : gridState.cellHistory.filter((c) => c !== i);

      setGridState({ grid, cellHistory });
    },
    useRandomCell: () => {
      const grid = [...gridState.grid];
      const randomIndex = getRandomUnusedCell(grid);
      if (randomIndex === null) return;

      grid[randomIndex] = true;

      const cellHistory = [randomIndex, ...gridState.cellHistory];

      setGridState({
        grid,
        cellHistory,
        _animation: "random" as const,
      });
    },
    reset: () => {
      setGridState(initialGameState.gridState);
    },
  };

  const playersActions: PlayersActions = {
    addPlayer: (name) => {
      setPlayersState({
        ...playersState,
        players: [...playersState.players, createPlayer(name)].toSorted(
          comparePlayersByName,
        ),
      });
    },
    deletePlayer: (name) => {
      const players = playersState.players.filter((p) => p.name !== name);
      const queue = chooseQueueState.queue.filter((p) => p.name !== name);
      const stage = chooseQueueState.stage.filter((p) => p.name !== name);
      setPlayersState({ players });
      setChooseQueueState({ queue, stage });
    },
    renamePlayer: (name, newName) => {
      const players = renamePlayer(
        playersState.players,
        name,
        newName,
      ).toSorted(comparePlayersByName);
      const queue = renamePlayer(chooseQueueState.queue, name, newName);
      const stage = renamePlayer(chooseQueueState.stage, name, newName);

      setPlayersState({ players });
      setChooseQueueState({ queue, stage });
    },
    reset: () => {
      setPlayersState(initialGameState.playersState);
    },
  };

  const chooseQueueActions: ChooseQueueActions = {
    stagePlayer: (name) => {
      if (playerInArray(chooseQueueState.stage, name)) return;

      const stage = [...chooseQueueState.stage, createPlayer(name)];
      setChooseQueueState({ ...chooseQueueState, stage });
    },
    unstagePlayer: (name) => {
      const stage = removePlayer(chooseQueueState.stage, name);
      setChooseQueueState({ ...chooseQueueState, stage });
    },
    commitStage: () => {
      const queue = [...chooseQueueState.queue, ...chooseQueueState.stage];
      const stage: Player[] = [];
      setChooseQueueState({ queue, stage });
    },
    enqueuePlayer: (name) => {},
    removePlayer: (index) => {
      const queue = [...chooseQueueState.queue];
      queue.splice(index, 1);
      setChooseQueueState({ ...chooseQueueState, queue });
    },
    dequeuePlayer: () => {
      const queue = chooseQueueState.queue.slice(1);
      setChooseQueueState({ ...chooseQueueState, queue });
    },
    reset: () => {
      setChooseQueueState(initialGameState.chooseQueueState);
    },
    shuffleStage: () => {
      const stage = distinctlyShuffled(chooseQueueState.stage);
      setChooseQueueState({ ...chooseQueueState, stage });
    },
    movePlayerInQueue: (from, to) => {
      setChooseQueueState({
        ...chooseQueueState,
        queue: arrayMove(chooseQueueState.queue, from, to),
      });
    },
    movePlayerInStage: (from, to) => {
      setChooseQueueState({
        ...chooseQueueState,
        stage: arrayMove(chooseQueueState.stage, from, to),
      });
    },
  };

  const gameActions: GameActions = {
    reset: () => {
      gridActions.reset();
      playersActions.reset();
      chooseQueueActions.reset();
    },
  };

  return (
    <GameContext.Provider
      value={{
        gridState,
        gridActions,
        playersState,
        playersActions,
        chooseQueueState,
        chooseQueueActions,
        gameActions,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
}
