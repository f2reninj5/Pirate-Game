"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { GameContext } from "@/context/game-context";
import { randomInt, sleep } from "@/lib/animation";
import { cn } from "@/lib/cn";
import { getRandomUnusedCell } from "@/lib/grid";

const styles = {
  used: "bg-gray-400",
  highlighted: "bg-yellow-400",
};

const letters = ["A", "B", "C", "D", "E", "F", "G"];

const labels = Array.from({ length: 7 }, (_, i) =>
  letters.map((x) => `${x}${i + 1}`),
).flat();

export default function Grid() {
  const [highlighted, setHighlighted] = useState<number | null>(null);
  const [grid, setGrid] = useState<boolean[]>(new Array(49).fill(false));
  const animationId = useRef(0);

  const gameContext = useContext(GameContext);

  useEffect(() => {
    if (!gameContext) return;
    const { gameState } = gameContext;

    const target = gameState.cellHistory[0];
    const grid = [...gameState.grid];
    grid[target] = false;
    const id = ++animationId.current;

    (async function animate() {
      if (
        gameState._animation?.grid === "random" &&
        gameState.cellHistory.length < 49
      ) {
        for (let i = 0; i < randomInt(8, 13); i++) {
          if (id !== animationId.current) {
            setGrid(gameState.grid);
            return;
          }
          const randomIndex = getRandomUnusedCell(grid);
          if (randomIndex === null) break;
          setHighlighted(randomIndex);
          await sleep(200);
        }
      }

      setGrid(gameState.grid);
      setHighlighted(null);
    })();
  }, [gameContext]);

  if (!gameContext) return null;
  const { gameState, gameDispatch } = gameContext;

  const cellPositions: (number | null)[] = new Array(49).fill(null);
  gameState.cellHistory.forEach((c, i) => {
    cellPositions[c] = i;
  });

  return (
    <div className="select-none grid grid-cols-7 gap-[0.5vmin] bg-dark p-[1vmin] m-auto rounded-lg w-[80vmin] h-[80vmin]">
      {grid.map((used, i) => (
        <button
          onClick={() => gameDispatch({ type: "toggle_cell", index: i })}
          className={cn(
            "block bg-light rounded-sm hover:cursor-pointer hover:scale-105 active:scale-100 active:translate-y-0.5",
            used ? styles.used : highlighted === i ? styles.highlighted : "",
          )}
          key={labels[i]}
          type="button"
        >
          <span className="m-1">{labels[i]}</span>
          <span className="m-1">{cellPositions[i]}</span>
        </button>
      ))}
    </div>
  );
}
