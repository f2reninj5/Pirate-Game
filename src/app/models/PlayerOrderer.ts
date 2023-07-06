import { PlayerManager } from './PlayerManager'

export class PlayerOrderer {
    private playerManager: PlayerManager
    private queue: string[] = []

    constructor(playerManager: PlayerManager) {
        this.playerManager = playerManager
    }

    public addPlayer(player: string): void {
        this.playerManager.addPlayer(player)
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
