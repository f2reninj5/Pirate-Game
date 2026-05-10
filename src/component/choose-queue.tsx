import Dialog from "@/component/ui/dialog";

function ChooseQueueTrigger() {
  return (
    <button type="button">
      <div>Choose Queue</div>
      <div>Player 1</div>
      <div>Player 2</div>
      <div>Player 3</div>
    </button>
  );
}

export default function ChooseQueue() {
  return (
    <Dialog trigger={ChooseQueueTrigger()} title="Choose Queue">
      hello
    </Dialog>
  );
}
