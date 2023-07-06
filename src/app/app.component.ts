import { Component, ViewChild, ViewContainerRef } from '@angular/core'
import { WindowService } from './window.service'
import { WindowComponent } from './components/window/window.component'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainerRef!: ViewContainerRef

    constructor(private windowService: WindowService) {
        this.windowService.windowContents$.subscribe((contents) => {
            if (!contents) {
                return this.removeWindow()
            }

            this.createWindow(contents)
        })
    }

    private createWindow(contents: string): void {
        this.windowContainerRef.clear()
        const windowComponentRef = this.windowContainerRef.createComponent(WindowComponent)
        windowComponentRef.setInput('contents', contents)
    }

    private removeWindow(): void {
        this.windowContainerRef.clear()
    }
}
