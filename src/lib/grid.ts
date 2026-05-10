export function getUnusedCells(grid: boolean[]): number[] {
  return grid.map((used, i) => (used ? null : i)).filter((x) => x !== null);
}

export function getRandomUnusedCell(grid: boolean[]): number | null {
  const unusedCells = getUnusedCells(grid);

  if (unusedCells.length === 0) {
    return null;
  }

  return unusedCells[Math.floor(Math.random() * unusedCells.length)];
}
