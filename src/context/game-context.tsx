"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getRandomUnusedCell } from "@/lib/grid";
import { comparePlayers } from "@/lib/player";

type GridState = {
  grid: boolean[];
  cellHistory: number[];
  _animation?: "random";
};

type PlayersState = {
  players: string[];
};

type ChooseQueueState = {
  stage: string[];
  queue: string[];
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
      "Alice A",
      "Alice B",
      "Benjamin",
      "Chloe",
      "Daniel D",
      "Daniel H",
      "Ethan",
      "Fiona",
      "Grace",
      "Henry",
      "Isabella",
      "Jack J",
      "Jack K",
      "Kevin",
      "Liam",
      "Mia M",
      "Mia S",
      "Noah",
      "Olivia",
      "Parker",
      "Quinn",
      "Ryan R",
      "Ryan T",
      "Sophia",
      "Thomas",
      "Uma",
      "Victor",
      "Willow",
      "Xander",
      "Zoe",
    ].toSorted(comparePlayers),
  },
  chooseQueueState: {
    stage: ["Xander", "Willow", "Zoe"],
    queue: ["Zoe", "Victor", "Mia M"],
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
  addPlayer: (player: string) => void;
  deletePlayer: (player: string) => void;
  reset: () => void;
};

type ChooseQueueActions = {
  stagePlayer: (player: string) => void;
  unstagePlayer: (player: string) => void;
  commitStage: () => void;
  enqueuePlayer: (player: string) => void;
  removePlayer: (index: number) => void;
  dequeuePlayer: () => void;
  reset: () => void;
  shuffleStage: () => void;
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
    addPlayer: (player) => {
      setPlayersState({
        ...playersState,
        players: [...playersState.players, player].toSorted(comparePlayers),
      });
    },
    deletePlayer: (player) => {
      const players = playersState.players.filter((p) => p !== player);
      const queue = chooseQueueState.queue.filter((p) => p !== player);
      const stage = chooseQueueState.stage.filter((p) => p !== player);
      setPlayersState({ players });
      setChooseQueueState({ queue, stage });
    },
    reset: () => {
      setPlayersState(initialGameState.playersState);
    },
  };

  const chooseQueueActions: ChooseQueueActions = {
    stagePlayer: (player) => {
      if (chooseQueueState.stage.includes(player)) return;

      const stage = [...chooseQueueState.stage, player];
      setChooseQueueState({ ...chooseQueueState, stage });
    },
    unstagePlayer: (player) => {},
    commitStage: () => {
      const queue = [...chooseQueueState.queue, ...chooseQueueState.stage];
      const stage: string[] = [];
      setChooseQueueState({ queue, stage });
    },
    enqueuePlayer: (player) => {},
    removePlayer: (index) => {
      const queue = [...chooseQueueState.queue];
      queue.splice(index, 1);
      setChooseQueueState({ ...chooseQueueState, queue });
    },
    dequeuePlayer: () => {},
    reset: () => {
      setChooseQueueState(initialGameState.chooseQueueState);
    },
    shuffleStage: () => {
      const stage = chooseQueueState.stage.toSorted(() => Math.random() - 0.5);
      setChooseQueueState({ ...chooseQueueState, stage });
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
