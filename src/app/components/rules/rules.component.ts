import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { RuleTypes } from 'src/app/models/Rules'

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss']
})
export class RulesComponent {
    private ruleType: RuleTypes = RuleTypes.CHAOS

    constructor(private gameControlService: GameControlService) {}

    get rules() {
        return this.gameControlService.rules[this.ruleType]
    }
}
