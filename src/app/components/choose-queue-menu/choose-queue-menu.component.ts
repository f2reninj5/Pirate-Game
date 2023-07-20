import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { ChooseQueue, Direction } from 'src/app/models/ChooseQueue'
import { WindowService } from 'src/app/window.service'

@Component({
    selector: 'app-choose-queue-menu',
    templateUrl: './choose-queue-menu.component.html',
    styleUrls: ['./choose-queue-menu.component.scss']
})
export class ChooseQueueMenuComponent {
    public addQueue: string[] = []
    inputPlayer: string = ''

    constructor(private gameControlService: GameControlService, private windowService: WindowService) {}

    get queue(): ChooseQueue {
        return this.gameControlService.chooseQueue
    }

    public movePlayerUp(player: string): void {
        this.queue.movePlayer(player, Direction.UP)
    }

    public movePlayerDown(player: string): void {
        this.queue.movePlayer(player, Direction.DOWN)
    }

    public removePlayer(player: string): void {
        this.queue.removePlayer(player)
    }

    public addPlayer(): void {
        if (this.inputPlayer) {
            this.queue.addPlayer(this.inputPlayer)
            this.inputPlayer = ''
        }
    }
}
