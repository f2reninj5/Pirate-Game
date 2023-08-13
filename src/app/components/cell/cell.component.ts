import { Input, Component } from '@angular/core'
import { Cell } from 'src/app/models/Cell'

@Component({
    selector: 'app-cell',
    templateUrl: './cell.component.html',
    styleUrls: ['./cell.component.scss']
})
export class CellComponent {
    @Input() cell!: Cell

    public get isMiddleCell(): boolean {
        return this.cell.grid!.getMiddleCellIndex() === this.cell.index
    }
}
