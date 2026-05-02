"use client";

import { useState } from "react";
import Dialog from "@/component/dialog";
import SheetCard from "@/component/sheet-card";

export default function SheetsDialog() {
  const [half, setHalf] = useState(true);

  return (
    <Dialog trigger="Sheets" title="Sheets">
      <div className="flex flex-col gap-2">
        <div>
          <span>Size: </span>
          <button
            type="button"
            onClick={() => setHalf(!half)}
            className={half ? "bg-white text-black" : ""}
          >
            {half ? "Half" : "Full"}
          </button>
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
