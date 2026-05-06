"use client";

import {
  type ActionDispatch,
  createContext,
  type ReactNode,
  useEffect,
  useReducer,
  useRef,
} from "react";

type GameState = {
  grid: boolean[];
  cellHistory: number[];
  players: string[];
};

const initialGameState: GameState = {
  grid: new Array(49).fill(false),
  cellHistory: [],
  players: [],
};

function loadGameState(): GameState {
  const save = localStorage.getItem("gameState");
  return save ? JSON.parse(save) : initialGameState;
}

type GameReducerAction =
  | { type: "toggle_cell"; index: number }
  | { type: "load"; save: GameState }
  | { type: "reset" };

function gameReducer(state: GameState, action: GameReducerAction) {
  switch (action.type) {
    case "toggle_cell": {
      const { index: i } = action;

      const grid = [...state.grid];
      const used = !grid[i];

      grid[i] = used;

      const cellHistory = used
        ? [...state.cellHistory, i]
        : state.cellHistory.filter((c) => c !== i);

      return { ...state, grid, cellHistory };
    }
    case "load": {
      return action.save;
    }
    case "reset":
      return initialGameState;
  }
}

export const GameContext = createContext<{
  gameState: GameState;
  gameDispatch: ActionDispatch<[action: GameReducerAction]>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    gameDispatch({
      type: "load",
      save: loadGameState(),
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("gameState", JSON.stringify(gameState));
  }, [gameState]);

  return (
    <GameContext.Provider value={{ gameState, gameDispatch }}>
      {children}
    </GameContext.Provider>
  );
}
