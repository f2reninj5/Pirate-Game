import { Injectable } from '@angular/core'
import { Grid } from './models/Grid'
import { PlayerSuggester } from './models/PlayerSuggester'
import { PlayerOrderer } from './models/PlayerOrderer'
import { ChooseQueue } from './models/ChooseQueue'
import { Rule, RuleTypes, rules } from './models/Rules'

@Injectable({
    providedIn: 'root'
})
export class GameControlService {
    public grid!: Grid
    private playerSuggester!: PlayerSuggester
    public playerOrderer!: PlayerOrderer
    public chooseQueue!: ChooseQueue
    public rules: { [key in RuleTypes]: Rule[] } = rules

    constructor() {
        this.resetGame()
    }

    public resetGame(): void {
        this.grid = new Grid(7, 7)
        this.playerSuggester = new PlayerSuggester()
        this.playerOrderer = new PlayerOrderer(this.playerSuggester)
        this.chooseQueue = new ChooseQueue(this.playerSuggester)
    }

    public toggleCellSelect(index: number): void {
        this.grid.cells[index].toggleSelect()
    }
}
