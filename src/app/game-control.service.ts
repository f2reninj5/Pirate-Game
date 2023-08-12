import { Injectable } from '@angular/core'
import { Grid } from './models/Grid'
import { PlayerSuggester } from './models/PlayerSuggester'
import { PlayerShuffler } from './models/PlayerShuffler'
import { ChooseQueue } from './models/ChooseQueue'
import { Rule, RuleTypes, rules } from './models/Rules'
import { Cell } from './models/Cell'

@Injectable({
    providedIn: 'root'
})
export class GameControlService {
    public grid!: Grid
    private playerSuggester!: PlayerSuggester
    public playerShuffler!: PlayerShuffler
    public chooseQueue!: ChooseQueue
    public rules: { [key in RuleTypes]: Rule[] } = rules

    constructor() {
        this.loadGame()
    }

    public resetGame(): void {
        this.grid = new Grid(7, 7)
        this.playerSuggester = new PlayerSuggester()
        this.playerShuffler = new PlayerShuffler(this.playerSuggester)
        this.chooseQueue = new ChooseQueue(this.playerSuggester)
    }

    public saveGame(): void {
        let grid = Object.assign(new Grid(7, 7), this.grid)

        grid.cells.map((cell) => {
            cell.grid = undefined
            return cell
        })

        localStorage.setItem('grid', JSON.stringify(grid))
        localStorage.setItem('playerSuggester', JSON.stringify(this.playerSuggester))
        localStorage.setItem('playerShuffler', JSON.stringify(this.playerShuffler))
        localStorage.setItem('chooseQueue', JSON.stringify(this.chooseQueue))
    }

    public loadGame(): void {
        const grid = localStorage.getItem('grid')
        const playerSuggester = localStorage.getItem('playerSuggester')
        const playerShuffler = localStorage.getItem('playerShuffler')
        const chooseQueue = localStorage.getItem('chooseQueue')

        this.grid = new Grid(7, 7)
        if (grid) {
            for (const cell of JSON.parse(grid).history) {
                this.toggleCellSelect(cell.index)
            }
        }

        if (playerSuggester) { this.playerSuggester = Object.assign(new PlayerSuggester(), JSON.parse(playerSuggester)) }
        else { this.playerSuggester = new PlayerSuggester() }

        if (playerShuffler) {
            this.playerShuffler = Object.assign(new PlayerShuffler(this.playerSuggester), JSON.parse(playerShuffler))
            this.playerShuffler.playerSuggester = this.playerSuggester
        }
        else { this.playerShuffler = new PlayerShuffler(this.playerSuggester) }

        if (chooseQueue) {
            this.chooseQueue = Object.assign(new ChooseQueue(this.playerSuggester), JSON.parse(chooseQueue))
            this.chooseQueue.playerSuggester = this.playerSuggester
        }
        else { this.chooseQueue = new ChooseQueue(this.playerSuggester) }
    }

    public toggleCellSelect(index: number): void {
        this.grid.cells[index].toggleSelect()
    }
}
