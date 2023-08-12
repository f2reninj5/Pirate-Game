import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { WindowService } from 'src/app/window.service'
import { FeedbackComponent } from '../feedback/feedback.component'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    title: string = 'Pirate Game'

    constructor(private gameControlService: GameControlService, private windowService: WindowService) {}

    openFeedbackForm() {
        this.windowService.createWindow(FeedbackComponent)
    }

    resetGame() {
        this.gameControlService.resetGame()
    }
}
