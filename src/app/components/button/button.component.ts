import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    @Input() backgroundColour: string = 'black'
    @Input() colour: string = 'white'
    @Input() icon?: string
    @Input() text?: string
    @Output() buttonClick = new EventEmitter()

    onClick() {
        this.buttonClick.emit()
    }
}
