"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import { RotateCcw } from "lucide-react";
import Button from "@/component/ui/button";
import Dialog from "@/component/ui/dialog";
import IconButton from "@/component/ui/icon-button";
import { useGameContext } from "@/context/game-context";

export default function ResetDialog() {
  const { gameActions } = useGameContext();

  return (
    <Dialog trigger={<IconButton icon={RotateCcw} />} title="Reset">
      <div className="flex flex-1 flex-col justify-around items-center">
        <h2>Are you sure?</h2>
        <RadixDialog.Close asChild>
          <Button onClick={() => gameActions.reset()}>Reset</Button>
        </RadixDialog.Close>
      </div>
    </Dialog>
  );
}
