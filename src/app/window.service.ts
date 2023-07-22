import { Injectable, Type } from '@angular/core'
import { Subject } from 'rxjs'
import { ChooseQueueMenuComponent } from './components/choose-queue-menu/choose-queue-menu.component'
import { FilesComponent } from './components/files/files.component'

export type WindowContentsType = string | Type<ChooseQueueMenuComponent | FilesComponent>

export interface WindowOptions {
    closeable?: boolean
}

export interface WindowParameters { contents: WindowContentsType | null, options?: WindowOptions }

@Injectable({
    providedIn: 'root'
})
export class WindowService {
    private windowContents: Subject<WindowParameters> = new Subject<WindowParameters>()
    windowContents$ = this.windowContents.asObservable()

    constructor() {}

    public createWindow(contents: WindowContentsType, options?: WindowOptions): void {
        this.windowContents.next({ contents, options })
    }

    public closeWindow(): void {
        this.windowContents.next({ contents: null })
    }
}
