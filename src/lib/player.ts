export type Player = {
  _id: string;
  name: string;
};

export function comparePlayersByName(player: Player, otherPlayer: Player) {
  return player.name
    .toLowerCase()
    .localeCompare(otherPlayer.name.toLowerCase());
}

export function createPlayer(name: string): Player {
  return { _id: crypto.randomUUID(), name };
}

export function renamePlayer(
  array: Player[],
  name: string,
  newName: string,
): Player[] {
  return array.map((p) => (p.name === name ? { ...p, name: newName } : p));
}

export function playerInArray(array: Player[], name: string): boolean {
  return array.some((p) => p.name === name);
}

export function removePlayer(array: Player[], name: string): Player[] {
  return array.filter((p) => p.name !== name);
}
