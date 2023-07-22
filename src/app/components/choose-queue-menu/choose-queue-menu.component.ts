import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { ChooseQueue, Direction, QueueTypes } from 'src/app/models/ChooseQueue'
import { WindowService } from 'src/app/window.service'

@Component({
    selector: 'app-choose-queue-menu',
    templateUrl: './choose-queue-menu.component.html',
    styleUrls: ['./choose-queue-menu.component.scss']
})
export class ChooseQueueMenuComponent {
    public inputPlayerRaw: string = ''

    constructor(private gameControlService: GameControlService, private windowService: WindowService) {}

    get chooseQueue(): ChooseQueue {
        return this.gameControlService.chooseQueue
    }

    get mainQueue(): string[] {
        return this.chooseQueue.getQueue(QueueTypes.MAIN)
    }

    get extensionQueue(): string[] {
        return this.chooseQueue.getQueue(QueueTypes.EXTENSION)
    }

    get inputPlayer(): string {
        return this.inputPlayerRaw.trim().toLowerCase()
    }

    public addPlayer(): void {
        if (this.inputPlayer) {
            this.chooseQueue.addPlayer(this.inputPlayer, QueueTypes.EXTENSION)
            this.inputPlayerRaw = ''
        }
    }

    public movePlayerUpMain(player: string): void {
        this.chooseQueue.movePlayer(player, Direction.UP, QueueTypes.MAIN)
    }

    public movePlayerDownMain(player: string): void {
        this.chooseQueue.movePlayer(player, Direction.DOWN, QueueTypes.MAIN)
    }

    public removePlayerMain(player: string): void {
        this.chooseQueue.removePlayer(player, QueueTypes.MAIN)
    }

    public movePlayerUpExtension(player: string): void {
        this.chooseQueue.movePlayer(player, Direction.UP, QueueTypes.EXTENSION)
    }

    public movePlayerDownExtension(player: string): void {
        this.chooseQueue.movePlayer(player, Direction.DOWN, QueueTypes.EXTENSION)
    }

    public removePlayerExtension(player: string): void {
        this.chooseQueue.removePlayer(player, QueueTypes.EXTENSION)
    }

    public shuffleAndMerge(): void {
        this.chooseQueue.shuffle(QueueTypes.EXTENSION)
        this.chooseQueue.mergeQueues()
    }
}
