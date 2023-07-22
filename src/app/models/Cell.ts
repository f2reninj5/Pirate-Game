import { Grid } from './Grid'

const LETTERS: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const wait = (duration: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, duration))
}

export class Cell {
    private grid: Grid
    public index: number
    public name: string
    public selected: boolean = false
    public glanced: boolean = false

    constructor(grid: Grid, index: number) {
        this.grid = grid
        this.index = index

        let row: number = Math.floor(index / grid.width)
        let column: number = index % grid.width

        this.name = `${LETTERS[column]}${row + 1}`
    }

    public toggleSelect(): void {
        this.selected = !this.selected
    }

    /**
     * @param duration The duration in milliseconds to highlight the cell for
     */
    public async glance(duration: number): Promise<void> {
        this.glanced = true
        await wait(duration)
        this.glanced = false
    }
}
