"use client";

import Button from "@/component/ui/button";
import { useGameContext } from "@/context/game-context";

export default function RandomCellButton() {
  const { gridActions } = useGameContext();

  return (
    <Button className="p-5 text-2xl" onClick={gridActions.useRandomCell}>
      Random Cell
    </Button>
  );
}
