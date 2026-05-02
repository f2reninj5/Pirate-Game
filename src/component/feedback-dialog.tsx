"use client";

import Dialog from "@/component/dialog";

export default function FeedbackDialog() {
  return (
    <Dialog trigger="Feedback" title="Feedback">
      <div className="flex flex-row gap-2">
        <span>pirategame@maksnowak.me</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText("pirategame@maksnowak.me");
          }}
        >
          Copy
        </button>
        <a href="mailto:pirategame@maksnowak.me?subject=Feedback">
          <button type="button">Mail</button>
        </a>
      </div>
    </Dialog>
  );
}
