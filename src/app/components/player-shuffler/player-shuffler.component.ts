import { Component } from '@angular/core'
import { GameControlService } from 'src/app/game-control.service'
import { PlayerShuffler } from 'src/app/models/PlayerShuffler'

@Component({
    selector: 'app-player-shuffler',
    templateUrl: './player-shuffler.component.html',
    styleUrls: ['./player-shuffler.component.scss']
})
export class PlayerShufflerComponent {
    public inputPlayerRaw: string = ''

    constructor(private gameControlService: GameControlService) {}

    get playerShuffler(): PlayerShuffler {
        return this.gameControlService.playerShuffler
    }

    get suggestions(): string[] {
        return this.playerShuffler.getSuggestions()
    }

    get queue(): string[] {
        return this.playerShuffler.getQueue()
    }

    get inputPlayer(): string {
        return this.inputPlayerRaw.trim().toLowerCase()
    }

    public addPlayer(): void {
        if (this.inputPlayer) {
            this.playerShuffler.addPlayer(this.inputPlayer)
            this.inputPlayerRaw = ''
        }
    }

    public removePlayer(player: string): void {
        this.playerShuffler.removePlayer(player)
    }

    public shuffle(): void {
        this.playerShuffler.randomiseOrder()
        this.playShuffleAnimation()
    }

    public async playShuffleAnimation(): Promise<void> {
        let i = 0
        const iterations = Math.floor(Math.random() * 2) + 4
        const interval = setInterval(() => {
            this.playerShuffler.randomiseOrder()
            i++
            if (i > iterations) {
                clearInterval(interval)
            }
        }, 100)
    }

    public removeSuggestion(player: string): void {
        this.playerShuffler.removeSuggestion(player)
    }

    public addPlayerFromSuggestion(player: string): void {
        this.playerShuffler.addPlayer(player)
    }

    public nameCase(player: string): string {
        return player.split(' ').map(p => p[0].toUpperCase() + p.slice(1)).join(' ')
    }

    public clear(): void {
        for (const player of this.queue) {
            this.playerShuffler.removePlayer(player)
        }
    }
}
