import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { Grid } from 'src/app/models/Grid'

@Component({
    selector: 'app-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss']
})
export class GridComponent {

    constructor(private gameControlService: GameControlService) {}

    public get grid(): Grid {
        return this.gameControlService.grid
    }

    public onCellClick(index: number): void {
        this.gameControlService.toggleCellSelect(index)

        if (!this.isChooseQueueEmpty()) {
            this.shiftChooseQueue()
        }
    }

    private isChooseQueueEmpty(): boolean {
        return this.gameControlService.chooseQueue.isMainQueueEmpty()
    }

    private shiftChooseQueue(): string {
        return this.gameControlService.chooseQueue.shiftMainQueue()
    }
}
