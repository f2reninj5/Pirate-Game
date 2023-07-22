import { PlayerSuggester } from './PlayerSuggester'

export class PlayerOrderer {
    private playerSuggester: PlayerSuggester
    private queue: string[] = []

    constructor(playerSuggester: PlayerSuggester) {
        this.playerSuggester = playerSuggester
    }

    public addPlayer(player: string): void {
        this.playerSuggester.addPlayer(player)
        this.queue.push(player)
    }

    public removePlayer(player: string): void {
        this.queue = this.queue.filter(p => p !== player)
    }

    public randomiseOrder(): void {
        this.queue = this.queue.sort(() => Math.random() - 0.5)
    }

    public getPlayers(): string[] {
        return this.queue
    }
}
