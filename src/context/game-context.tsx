"use client";

import {
  type ActionDispatch,
  createContext,
  type ReactNode,
  useEffect,
  useReducer,
} from "react";
import { getRandomUnusedCell } from "@/lib/grid";

type GameState = {
  grid: boolean[];
  cellHistory: number[];
  players: string[];
  chooseQueue: string[];
  _animation?: { grid?: "random" };
};

const initialGameState: GameState = {
  grid: new Array(49).fill(false),
  cellHistory: [],
  players: [],
  chooseQueue: [],
};

function loadGameState(): GameState {
  const save = localStorage.getItem("gameState");
  return save ? JSON.parse(save) : initialGameState;
}

type GameReducerAction =
  | { type: "toggle_cell"; index: number }
  | { type: "load"; save: GameState }
  | { type: "reset" }
  | { type: "random_cell" };

function gameReducer(state: GameState, action: GameReducerAction) {
  switch (action.type) {
    case "toggle_cell": {
      const { index: i } = action;

      const grid = [...state.grid];
      const used = !grid[i];

      grid[i] = used;

      const cellHistory = used
        ? [i, ...state.cellHistory]
        : state.cellHistory.filter((c) => c !== i);

      return { ...state, grid, cellHistory, _animation: {} };
    }
    case "load":
      return action.save;
    case "reset":
      return initialGameState;
    case "random_cell": {
      const grid = [...state.grid];
      const randomIndex = getRandomUnusedCell(grid);
      if (randomIndex === null) return state;

      grid[randomIndex] = true;

      const cellHistory = [randomIndex, ...state.cellHistory];

      return {
        ...state,
        grid,
        cellHistory,
        _animation: { grid: "random" as const },
      };
    }
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
    const { _animation: _, ...data } = gameState;
    localStorage.setItem("gameState", JSON.stringify(data));
  }, [gameState]);

  return (
    <GameContext.Provider value={{ gameState, gameDispatch }}>
      {children}
    </GameContext.Provider>
  );
}
