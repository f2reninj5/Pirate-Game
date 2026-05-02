"use client";

import { Copy, MessageSquare, Printer } from "lucide-react";
import Dialog from "@/component/dialog";

export default function FeedbackDialog() {
  return (
    <Dialog trigger={<MessageSquare />} title="Feedback">
      <div className="flex flex-row gap-2">
        <span>pirategame@maksnowak.me</span>
        <button
          type="button"
          onClick={() => {
            navigator.clipboard.writeText("pirategame@maksnowak.me");
          }}
        >
          <Copy />
        </button>
        <a href="mailto:pirategame@maksnowak.me?subject=Feedback">
          <button type="button">
            <Printer />
          </button>
        </a>
      </div>
    </Dialog>
  );
}
