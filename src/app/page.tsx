import ChooseQueuePreview from "@/component/choose-queue-preview";
import RandomCellButton from "@/component/random-cell-button";
import Grid from "../component/grid";

export default function Game() {
  return (
    <>
      <Grid></Grid>
      <div className="flex flex-col gap-2">
        <RandomCellButton></RandomCellButton>
        <ChooseQueuePreview></ChooseQueuePreview>
      </div>
    </>
  );
}
