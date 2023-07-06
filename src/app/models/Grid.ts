import { Cell } from './Cell'

export class Grid {
    public width: number
    public height: number
    public cells: Cell[] = []

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        for (let i = 0; i < width * height; i++) {
            this.cells.push(new Cell(this, i))
        }
    }
}
