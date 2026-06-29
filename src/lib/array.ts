export function shuffled<T>(array: T[]) {
  return array.toSorted(() => Math.random() - 0.5);
}

export function areEqual<T>(a: T[], b: T[]) {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

export function distinctlyShuffled<T>(array: T[]) {
  let shuffledArray = shuffled(array);

  while (areEqual(shuffledArray, array)) {
    shuffledArray = shuffled(array);
  }

  return shuffledArray;
}
