import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { Cell } from 'src/app/models/Cell'

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

    constructor(private gameControlService: GameControlService) {}

    get history(): Cell[] {
        return this.gameControlService.grid.history
    }

    public getEndSlice(numberOfElements: number): Array<Cell | null> {
        let padding = new Array(Math.max(0, numberOfElements - this.history.length)).fill(null)
        let front = this.history.slice(-numberOfElements).reverse()
        return [...front, ...padding]
    }
}
