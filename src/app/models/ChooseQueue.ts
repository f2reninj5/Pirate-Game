import { PlayerSuggester } from './PlayerSuggester'

export const enum Direction {
    UP,
    DOWN
}

export const enum QueueTypes {
    MAIN,
    EXTENSION
}

export class ChooseQueue {
    private playerSuggester: PlayerSuggester
    private mainQueue: string[] = ['georgenstein', 'dylan', 'ben', 'maks', 'ethan']
    private extensionQueue: string[] = []

    constructor(playerSuggester: PlayerSuggester) {
        this.playerSuggester = playerSuggester
    }

    public addPlayer(player: string, queueType: QueueTypes): void {
        if (this.isPlayerInEitherQueue(player)) { return }

        let queue: string[] = this.getQueue(queueType)

        if (queueType === QueueTypes.MAIN) {
            this.playerSuggester.addPlayer(player)
        }

        queue.push(player)
    }

    public movePlayer(player: string, direction: Direction, queueType: QueueTypes): void {
        let queue: string[] = this.getQueue(queueType)

        if (direction === Direction.UP) {
            const index = queue.indexOf(player)
            if (index > 0) {
                queue[index] = queue[index - 1]
                queue[index - 1] = player
            }
        }
        else if (direction === Direction.DOWN) {
            const index = queue.indexOf(player)
            if (index < queue.length - 1) {
                queue[index] = queue[index + 1]
                queue[index + 1] = player
            }
        }
    }

    public removePlayer(player: string, queueType: QueueTypes): void {
        if (queueType === QueueTypes.MAIN) {
            this.mainQueue = this.mainQueue.filter(p => p !== player)
        }
        else if (queueType === QueueTypes.EXTENSION) {
            this.extensionQueue = this.extensionQueue.filter(p => p !== player)
        }
        else {
            throw new Error('Invalid queue type')
        }
    }

    public isPlayerInEitherQueue(player: string): boolean {
        return this.mainQueue.includes(player) || this.extensionQueue.includes(player)
    }

    public shuffle(queueType: QueueTypes): void {
        let queue: string[] = this.getQueue(queueType)
        queue = queue.sort(() => Math.random() - 0.5)
    }

    public mergeQueues(): void {

        for (const player of this.extensionQueue) {
            this.removePlayer(player, QueueTypes.EXTENSION)
            this.addPlayer(player, QueueTypes.MAIN)
        }
    }

    public getQueue(queueType: QueueTypes): string[] {
        if (queueType === QueueTypes.MAIN) {
            return this.mainQueue
        }
        else if (queueType === QueueTypes.EXTENSION) {
            return this.extensionQueue
        }
        else {
            throw new Error('Invalid queue type')
        }
    }
}
