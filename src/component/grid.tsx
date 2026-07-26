"use client";

import { useEffect, useRef, useState } from "react";
import Button from "@/component/ui/button";
import { useGameContext } from "@/context/game-context";
import { randomInt, sleep } from "@/lib/animation";
import { cn } from "@/lib/cn";
import { getRandomUnusedCell } from "@/lib/grid";

const styles = {
  used: (position: number | null) => {
    switch (position) {
      case 0:
        return "opacity-60";
      default:
        return "opacity-20";
    }
  },
  highlighted: "scale-110 outline-1 outline-dark",
};

const letters = ["A", "B", "C", "D", "E", "F", "G"];

const labels = Array.from({ length: 7 }, (_, i) =>
  letters.map((x) => `${x}${i + 1}`),
).flat();

export default function Grid() {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [grid, setGrid] = useState<boolean[]>(new Array(49).fill(false));
  const animationId = useRef(0);

  const { gridState, gridActions, chooseQueueActions } = useGameContext();

  useEffect(() => {
    const target = gridState.cellHistory[0];
    const grid = [...gridState.grid];
    grid[target] = false;
    const id = ++animationId.current;

    (async function animate() {
      if (
        gridState._animation === "random" &&
        gridState.cellHistory.length < 49
      ) {
        for (let i = 0; i < randomInt(8, 13); i++) {
          if (id !== animationId.current) {
            setGrid(gridState.grid);
            return;
          }
          const randomIndex = getRandomUnusedCell(grid);
          if (randomIndex === null) break;
          setHighlighted(randomIndex);
          await sleep(250);
        }
      }

      setGrid(gridState.grid);
      setHighlighted(null);
    })();
  }, [gridState]);

  const cellPositions: (number | null)[] = new Array(49).fill(null);
  gridState.cellHistory.forEach((c, i) => {
    cellPositions[c] = i;
  });

  return (
    <div className="select-none grid grid-cols-7 gap-[0.5vmin] bg-dark p-[1vmin] rounded-lg w-[80vmin] h-[80vmin]">
      {grid.map((used, i) => (
        <Button
          onClick={() => {
            if (!used) chooseQueueActions.dequeuePlayer();
            gridActions.toggleCell(i);
          }}
          className={cn(
            "bg-light text-dark rounded-sm hover:outline-dark hover:cursor-pointer",
            used
              ? styles.used(cellPositions[i])
              : highlighted === i
                ? styles.highlighted
                : "",
          )}
          key={labels[i]}
        >
          <span className="m-1">{labels[i]}</span>
        </Button>
      ))}
    </div>
  );
}
