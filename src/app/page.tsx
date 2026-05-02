import FeedbackDialog from "@/component/feedback-dialog";
import InstructionsDialog from "@/component/instructions-dialog";
import SheetsDialog from "@/component/sheets-dialog";
import Dialog from "../component/dialog";
import Grid from "../component/grid";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col justify-between p-2">
      <header className="flex flex-row justify-around items-center">
        <span className="flex flex-row gap-2">
          <InstructionsDialog />
          <FeedbackDialog />
        </span>
        <h1 className="font-pirate text-5xl my-2">Pirate Game</h1>
        <span className="flex flex-row gap-2">
          <SheetsDialog />
          <Dialog trigger="Reset" title="Reset">
            <div className="flex flex-1 flex-col justify-around items-center">
              <h2>Are you sure?</h2>
              <button type="button">Reset</button>
            </div>
          </Dialog>
        </span>
      </header>
      <main>
        <Grid></Grid>
      </main>
      <footer className="flex flex-row justify-center items-center">
        <span>
          Copyright © 2026 Maks Nowak. Licensed under the{" "}
          <a href="https://www.apache.org/licenses/LICENSE-2.0">
            Apache License, Version 2.0
          </a>
          .
        </span>
      </footer>
    </div>
  );
}
