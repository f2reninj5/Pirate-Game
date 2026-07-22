export type Player = {
  _id: string;
  name: string;
};

export function comparePlayersByName(player: Player, otherPlayer: Player) {
  return player.name
    .toLowerCase()
    .localeCompare(otherPlayer.name.toLowerCase());
}

export function createPlayer(name: string) {
  return { _id: crypto.randomUUID(), name };
}

export function renamePlayer(array: Player[], name: string, newName: string) {
  return array.map((p) => (p.name === name ? { ...p, name: newName } : p));
}
