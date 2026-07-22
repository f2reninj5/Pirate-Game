export type Player = {
  _id: string;
  name: string;
};

export function comparePlayersByName(player: Player, otherPlayer: Player) {
  return player.name
    .toLowerCase()
    .localeCompare(otherPlayer.name.toLowerCase());
}
