import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class WindowService {
    private windowContents: Subject<string | null> = new Subject<string | null>()
    windowContents$ = this.windowContents.asObservable()

    constructor() {}

    public createWindow(contents: string): void {
        this.windowContents.next(contents)
    }

    public closeWindow(): void {
        this.windowContents.next(null)
    }
}
