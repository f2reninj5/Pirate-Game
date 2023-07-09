import { PlayerManager } from './PlayerManager'

export const enum Direction {
    UP,
    DOWN
}

export class ChooseQueue {
    private playerManager: PlayerManager
    private queue: string[] = ['Dylan', 'Ben', 'Maks', 'Ethan', 'George']

    constructor(playerManager: PlayerManager) {
        this.playerManager = playerManager
    }

    public addPlayer(player: string): void {
        this.playerManager.addPlayer(player)
        this.queue.push(player)
    }

    public movePlayer(player: string, direction: Direction): void {
        if (direction === Direction.UP) {
            const index = this.queue.indexOf(player)
            if (index > 0) {
                this.queue[index] = this.queue[index - 1]
                this.queue[index - 1] = player
            }
        }
        else if (direction === Direction.DOWN) {
            const index = this.queue.indexOf(player)
            if (index < this.queue.length - 1) {
                this.queue[index] = this.queue[index + 1]
                this.queue[index + 1] = player
            }
        }
    }

    public removePlayer(player: string): void {
        this.queue = this.queue.filter(p => p !== player)
    }

    public getQueue(): string[] {
        return this.queue
    }
}
