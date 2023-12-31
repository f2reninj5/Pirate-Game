import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { HeaderComponent } from './components/header/header.component'
import { ButtonComponent } from './components/button/button.component'
import { WindowComponent } from './components/window/window.component'
import { GridComponent } from './components/grid/grid.component'
import { CellComponent } from './components/cell/cell.component'
import { ChooseQueueComponent } from './components/choose-queue/choose-queue.component'
import { RulesComponent } from './components/rules/rules.component'
import { ChooseQueueMenuComponent } from './components/choose-queue-menu/choose-queue-menu.component'
import { FormsModule } from '@angular/forms';
import { FilesComponent } from './components/files/files.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FooterComponent } from './components/footer/footer.component';
import { PlayerShufflerComponent } from './components/player-shuffler/player-shuffler.component';
import { HistoryComponent } from './components/history/history.component';
import { InstructionsComponent } from './components/instructions/instructions.component'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ButtonComponent,
        WindowComponent,
        GridComponent,
        CellComponent,
        ChooseQueueComponent,
        RulesComponent,
        ChooseQueueMenuComponent,
        FilesComponent,
        FeedbackComponent,
        FooterComponent,
        PlayerShufflerComponent,
        HistoryComponent,
        InstructionsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
