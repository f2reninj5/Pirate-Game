import { Injectable } from '@angular/core'
import { Grid } from './models/Grid'
import { PlayerManager } from './models/PlayerManager'
import { PlayerOrderer } from './models/PlayerOrderer'
import { ChooseQueue } from './models/ChooseQueue'

@Injectable({
    providedIn: 'root'
})
export class GameControlService {
    public grid!: Grid
    private playerManager!: PlayerManager
    public playerOrderer!: PlayerOrderer
    public chooseQueue!: ChooseQueue

    constructor() {
        this.resetGame()
    }

    public resetGame(): void {
        this.grid = new Grid(7, 7)
        this.playerManager = new PlayerManager()
        this.playerOrderer = new PlayerOrderer(this.playerManager)
        this.chooseQueue = new ChooseQueue(this.playerManager)
    }

    public toggleCellSelect(index: number): void {
        this.grid.cells[index].toggleSelect()
    }
}
