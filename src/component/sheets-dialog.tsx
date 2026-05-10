"use client";

import { Columns2, Printer, Square } from "lucide-react";
import { useState } from "react";
import SheetCard from "@/component/sheet-card";
import Dialog from "@/component/ui/dialog";
import IconButton from "@/component/ui/icon-button";

export default function SheetsDialog() {
  const [half, setHalf] = useState(true);

  return (
    <Dialog trigger={<IconButton icon={Printer} />} title="Sheets">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <span>Size: </span>
          <IconButton
            icon={half ? Columns2 : Square}
            onClick={() => setHalf(!half)}
          />
        </div>
        <div className="flex flex-row gap-2">
          {half ? (
            <>
              <SheetCard name="standard_half" />
              <SheetCard name="chaos_half" />
            </>
          ) : (
            <>
              <SheetCard name="standard" />
              <SheetCard name="chaos" />
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
