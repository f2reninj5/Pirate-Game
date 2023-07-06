
export class PlayerManager {
    public players: string[] = []

    constructor() {}

    public addPlayer(player: string): void {
        if (!this.players.includes(player)) {
            this.players.push(player)
        }
    }

    public removePlayer(player: string): void {
        this.players = this.players.filter(p => p !== player)
    }

    public getPlayers(): string[] {
        return this.players
    }
}
