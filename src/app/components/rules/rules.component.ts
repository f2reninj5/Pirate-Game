import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { Rule, RuleTypes } from 'src/app/models/Rules'
import { WindowService } from 'src/app/window.service'

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss']
})
export class RulesComponent {
    private ruleType: RuleTypes = RuleTypes.CHAOS

    constructor(private gameControlService: GameControlService, private windowService: WindowService) {}

    get rules() {
        return this.gameControlService.rules[this.ruleType]
    }

    public createRuleWindow(rule: Rule): void {
        this.windowService.createWindow(`${rule.tile.name}: ${rule.tile.summary}`, { closeable: true })
    }
}
