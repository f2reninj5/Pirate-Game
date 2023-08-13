import { Cell } from './Cell'

export class Grid {
    public width: number
    public height: number
    public cells: Cell[] = []
    public history: Cell[] = []

    constructor(width: number, height: number) {
        this.width = width
        this.height = height

        for (let i = 0; i < width * height; i++) {
            this.cells.push(new Cell(this, i))
        }
    }

    get unselectedCells(): Cell[] {
        return this.cells.filter(c => !c.selected)
    }

    public async selectRandomUnselectedCell(): Promise<void> {
        if (this.unselectedCells.length === 0) { return }

        const randomIndex: number = Math.floor(Math.random() * this.unselectedCells.length)

        if (this.unselectedCells.length > 2) {
            await this.playAnimationUpToCell(randomIndex)
        }

        this.unselectedCells[randomIndex].toggleSelect()
    }

    public async playAnimationUpToCell(index: number): Promise<void> {
        let cycles: number = Math.max(2, Math.ceil(this.unselectedCells.length ** 0.5))
        let animatable: Cell[] = this.unselectedCells
        animatable.sort(() => Math.random() - 0.5)
        let queue = animatable.slice(0, cycles)

        if (queue[-1] === this.cells[index]) {
            queue[-1] = animatable[cycles]
        }

        for (const cell of queue) {
            await cell.glance(200)
        }
    }

    public getMiddleCellIndex(): number {
        let x = Math.floor(this.width / 2)
        let y = Math.floor(this.height / 2)
        return x + (y * this.width)
    }
}
