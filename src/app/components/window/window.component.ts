import { Component, Input } from '@angular/core'
import { WindowService } from 'src/app/window.service'

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent {
    @Input() contents!: string

    constructor(private windowService: WindowService) {}

    closeWindow(): void {
        this.windowService.closeWindow()
    }
}
