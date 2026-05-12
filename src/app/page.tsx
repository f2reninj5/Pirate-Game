import ChooseQueue from "@/component/choose-queue";
import FeedbackDialog from "@/component/feedback-dialog";
import InstructionsDialog from "@/component/instructions-dialog";
import RandomCellButton from "@/component/random-cell-button";
import SheetsDialog from "@/component/sheets-dialog";
import { GameProvider } from "@/context/game-context";
import Grid from "../component/grid";
import ResetDialog from "../component/reset-dialog";

export default function Game() {
  return (
    <GameProvider>
      <div className="min-h-full flex flex-col justify-between p-2">
        <header className="flex flex-row justify-around items-center">
          <span className="flex flex-row gap-2">
            <InstructionsDialog />
            <FeedbackDialog />
          </span>
          <h1 className="font-pirate text-5xl my-2">Pirate Game</h1>
          <span className="flex flex-row gap-2">
            <SheetsDialog />
            <ResetDialog></ResetDialog>
          </span>
        </header>
        <main className="flex flex-row flex-wrap">
          <Grid></Grid>
          <RandomCellButton></RandomCellButton>
          <ChooseQueue></ChooseQueue>
        </main>
        <footer className="flex flex-row justify-center items-center">
          <span>
            Copyright © 2026 Maks Nowak. Licensed under the{" "}
            <a
              className="text-blue-600"
              href="https://www.apache.org/licenses/LICENSE-2.0"
            >
              Apache License, Version 2.0
            </a>
            .
          </span>
        </footer>
      </div>
    </GameProvider>
  );
}
