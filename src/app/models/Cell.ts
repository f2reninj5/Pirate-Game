import { CellAnimator } from './CellAnimator'
import { Grid } from './Grid'

const LETTERS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export class Cell {
    private grid: Grid
    private animator: CellAnimator
    public index: number
    public name: string
    public selected: boolean = false

    constructor(grid: Grid, index: number) {
        this.grid = grid
        this.index = index

        let row: number = Math.floor(index / grid.width)
        let column: number = index % grid.width

        this.name = `${LETTERS[column]}${row + 1}`
        this.animator = new CellAnimator(this)
    }

    public toggleSelect(): void {
        this.selected = !this.selected
    }
}
