import { Component, ViewChild, ViewContainerRef } from '@angular/core'
import { WindowContentsType, WindowOptions, WindowService } from './window.service'
import { WindowComponent } from './components/window/window.component'
import { FilesComponent } from './components/files/files.component'
import { GameControlService } from './game-control.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @ViewChild('windowContainer', { read: ViewContainerRef }) windowContainerRef!: ViewContainerRef

    constructor(private gameControlService: GameControlService, private windowService: WindowService) {
        this.windowService.windowContents$.subscribe(({ contents, options }) => {
            if (!contents) {
                return this.removeWindow()
            }

            this.createWindow(contents, options)
        })
    }

    private createWindow(contents: WindowContentsType, options?: WindowOptions): void {
        this.windowContainerRef.clear()
        const windowComponentRef = this.windowContainerRef.createComponent(WindowComponent)

        if (typeof contents === 'string') {
            windowComponentRef.setInput('contents', contents)
        } else {
            windowComponentRef.setInput('component', contents)
        }

        if (options?.closeable) {
            windowComponentRef.setInput('closeable', options.closeable)
        }
    }

    private removeWindow(): void {
        this.windowContainerRef.clear()
    }

    public createFilesWindow(): void {
        this.windowService.createWindow(FilesComponent)
    }

    public selectRandomUnselectedCell(): void {
        this.gameControlService.grid.selectRandomUnselectedCell()
    }
}
