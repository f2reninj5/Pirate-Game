"use client";

import { useContext } from "react";
import { GameContext } from "@/context/game-context";

export default function RandomCellButton() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { gameDispatch } = gameContext;

  return (
    <button type="button" onClick={() => gameDispatch({ type: "random_cell" })}>
      Random Cell
    </button>
  );
}
