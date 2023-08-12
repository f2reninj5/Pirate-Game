import { PlayerSuggester } from './PlayerSuggester'

export class PlayerShuffler {
    public playerSuggester: PlayerSuggester
    private queue: string[] = []

    constructor(playerSuggester: PlayerSuggester) {
        this.playerSuggester = playerSuggester
    }

    public addPlayer(player: string): void {
        if (this.isPlayerInQueue(player)) { return }
        this.queue.push(player)
    }

    public removePlayer(player: string): void {
        this.queue = this.queue.filter(p => p !== player)
    }

    public randomiseOrder(): void {
        for (const player of this.queue) {
            this.playerSuggester.addPlayer(player)
        }

        let shuffled = this.queue.slice()
        shuffled.sort(() => Math.random() - 0.5)

        if (shuffled == this.queue) {
            shuffled.reverse()
        }

        this.queue = shuffled
    }

    public getPlayers(): string[] {
        return this.queue
    }

    private isPlayerInQueue(player: string): boolean {
        return this.queue.includes(player)
    }

    public getSuggestions(): string[] {
        return this.playerSuggester.getSuggestions().filter(p => !this.isPlayerInQueue(p))
    }

    public getQueue(): string[] {
        return this.queue
    }

    public removeSuggestion(player: string): void {
        this.playerSuggester.removePlayer(player)
    }
}
