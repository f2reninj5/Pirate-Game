"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import { RotateCcw } from "lucide-react";
import { useContext } from "react";
import Dialog from "@/component/dialog";
import { GameContext } from "@/context/game-context";

export default function ResetDialog() {
  const gameContext = useContext(GameContext);
  if (!gameContext) return null;
  const { gameDispatch } = gameContext;

  return (
    <Dialog trigger={<RotateCcw />} title="Reset">
      <div className="flex flex-1 flex-col justify-around items-center">
        <h2>Are you sure?</h2>
        <RadixDialog.Close asChild>
          <button type="button" onClick={() => gameDispatch({ type: "reset" })}>
            Reset
          </button>
        </RadixDialog.Close>
      </div>
    </Dialog>
  );
}
