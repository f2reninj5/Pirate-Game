"use client";

import { useContext } from "react";
import Button from "@/component/ui/button";
import { GameContext } from "@/context/game-context";

export default function RandomCellButton() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { gridActions } = gameContext;

  return <Button onClick={gridActions.useRandomCell}>Random Cell</Button>;
}
