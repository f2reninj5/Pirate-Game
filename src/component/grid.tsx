"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const styles = {
  used: "bg-gray-400",
};

const letters = ["A", "B", "C", "D", "E", "F", "G"];

const labels = Array.from({ length: 7 }, (_, i) =>
  letters.map((x) => `${x}${i + 1}`),
).flat();

export default function Grid() {
  const [grid, setGrid] = useState<Array<boolean>>(new Array(49).fill(false));

  function toggleCell(i: number) {
    setGrid((g) => {
      g = [...g];
      g[i] = !g[i];
      return g;
    });
  }

  return (
    <div className="select-none grid grid-cols-7 gap-2 bg-dark p-4 m-auto rounded-md w-[80vmin] h-[80vmin]">
      {grid.map((used, i) => (
        <button
          onClick={() => toggleCell(i)}
          className={cn(
            "block bg-light rounded-sm hover:cursor-pointer hover:scale-105 active:scale-100 active:translate-y-0.5",
            used ? styles.used : "",
          )}
          key={labels[i]}
          type="button"
        >
          <span className="m-1">{labels[i]}</span>
        </button>
      ))}
    </div>
  );
}
