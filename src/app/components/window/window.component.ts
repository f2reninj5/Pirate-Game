import { AfterViewInit, ChangeDetectorRef, Component, Input, ViewChild, ViewContainerRef } from '@angular/core'
import { WindowContentsType, WindowService } from 'src/app/window.service'

@Component({
    selector: 'app-window',
    templateUrl: './window.component.html',
    styleUrls: ['./window.component.scss']
})
export class WindowComponent implements AfterViewInit {
    @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer!: ViewContainerRef
    @Input() contents!: string
    @Input() component!: Exclude<WindowContentsType, string>
    @Input() closeable: boolean = true

    constructor(private changeDetector: ChangeDetectorRef, private windowService: WindowService) {}

    ngAfterViewInit(): void {
        if (!this.component) { return }
        const innerComponentRef = this.componentContainer.createComponent(this.component)
        this.changeDetector.detectChanges()
    }

    closeWindow(): void {
        this.windowService.closeWindow()
    }
}
