"use client";

import Button from "@/component/ui/button";
import { useGameContext } from "@/context/game-context";

export default function RandomCellButton() {
  const { gridActions } = useGameContext();

  return <Button onClick={gridActions.useRandomCell}>Random Cell</Button>;
}
