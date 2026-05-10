export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomInt(start: number, stop: number) {
  return Math.floor(Math.random() * (stop - start) + start);
}
