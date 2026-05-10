"use client";

import { Copy, MessageSquare, Printer } from "lucide-react";
import Dialog from "@/component/ui/dialog";
import IconButton from "@/component/ui/icon-button";

export default function FeedbackDialog() {
  return (
    <Dialog trigger={<IconButton icon={MessageSquare} />} title="Feedback">
      <div className="flex flex-row gap-2">
        <span>pirategame@maksnowak.me</span>
        <IconButton
          icon={Copy}
          onClick={() => {
            navigator.clipboard.writeText("pirategame@maksnowak.me");
          }}
        />
        <a href="mailto:pirategame@maksnowak.me?subject=Feedback">
          <IconButton icon={Printer} type="button" />
        </a>
      </div>
    </Dialog>
  );
}
