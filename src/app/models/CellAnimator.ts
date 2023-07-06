import { Cell } from './Cell'

export class CellAnimator {
    private cell: Cell
    public glanced: boolean = false

    constructor(cell: Cell) {
        this.cell = cell
    }

    public glance(): void {
        this.glanced = true
        setTimeout(() => { this.glanced = false }, 1000)
    }
}
