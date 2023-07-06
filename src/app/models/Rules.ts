
export interface Tile {
    name: string
    summary: string
    description: string
    icon: string
}

export interface Rule {
    tile: Tile
    numberAllowed: number
}

let tiles: { [index: string]: Tile } = {
    SHIP: {
        name: 'Pirate Ship',
        summary: 'Steal someone\'s cash',
        description: '',
        icon: ''
    },
    PARROT: {
        name: 'Parrot',
        summary: 'Copy someone\'s cash',
        description: '',
        icon: ''
    },
    DAGGER: {
        name: 'Dagger',
        summary: 'Reset someone\'s cash',
        description: '',
        icon: ''
    },
    PRESENT: {
        name: 'Present',
        summary: 'Pick someone to receive 5,000 cash',
        description: '',
        icon: ''
    },
    SWAP: {
        name: 'Swap',
        summary: 'Swap cash with someone',
        description: '',
        icon: ''
    },
    BLACKBEARD: {
        name: 'Blackbeard',
        summary: 'Rob someone\'s bank',
        description: '',
        icon: ''
    },
    CHOOSE: {
        name: 'Choose',
        summary: 'Pick the square next round',
        description: '',
        icon: ''
    },
    SHIELD: {
        name: 'Shield',
        summary: 'Block an attack',
        description: '',
        icon: ''
    },
    MIRROR: {
        name: 'Mirror',
        summary: 'Reflect an attack',
        description: '',
        icon: ''
    },
    HOOK: {
        name: 'Hook',
        summary: 'Shift an attack to someone else',
        description: '',
        icon: ''
    },
    BOMB: {
        name: 'Bomb',
        summary: 'Reset your cash',
        description: '',
        icon: ''
    },
    DOUBLE: {
        name: 'Double',
        summary: 'Double your cash',
        description: '',
        icon: ''
    },
    BANK: {
        name: 'Bank',
        summary: 'Bank your cash',
        description: '',
        icon: ''
    },
    LARGEST_CASH: {
        name: '5,000 Cash',
        summary: '',
        description: '',
        icon: ''
    },
    LARGE_CASH: {
        name: '3,000 Cash',
        summary: '',
        description: '',
        icon: ''
    },
    MEDIUM_CASH: {
        name: '1,000 Cash',
        summary: '',
        description: '',
        icon: ''
    },
    SMALL_CASH: {
        name: '200 Cash',
        summary: '',
        description: '',
        icon: ''
    }
}

let standardRules: Rule[] = [
    { tile: tiles.SHIP, numberAllowed: 1 },
    { tile: tiles.PARROT, numberAllowed: 1 },
    { tile: tiles.DAGGER, numberAllowed: 1 },
    { tile: tiles.PRESENT, numberAllowed: 1 },
    { tile: tiles.SWAP, numberAllowed: 1 },
    { tile: tiles.BLACKBEARD, numberAllowed: 1 },
    { tile: tiles.CHOOSE, numberAllowed: 1 },
    { tile: tiles.SHIELD, numberAllowed: 1 },
    { tile: tiles.MIRROR, numberAllowed: 1 },
    { tile: tiles.HOOK, numberAllowed: 1 },
    { tile: tiles.BOMB, numberAllowed: 1 },
    { tile: tiles.DOUBLE, numberAllowed: 1 },
    { tile: tiles.BANK, numberAllowed: 2 },
    { tile: tiles.LARGEST_CASH, numberAllowed: 1 },
    { tile: tiles.LARGE_CASH, numberAllowed: 2 },
    { tile: tiles.MEDIUM_CASH, numberAllowed: 10 },
    { tile: tiles.SMALL_CASH, numberAllowed: 22 }
]

let chaosRules: Rule[] = [
    { tile: tiles.SHIP, numberAllowed: 2 },
    { tile: tiles.PARROT, numberAllowed: 2 },
    { tile: tiles.DAGGER, numberAllowed: 2 },
    { tile: tiles.PRESENT, numberAllowed: 2 },
    { tile: tiles.SWAP, numberAllowed: 2 },
    { tile: tiles.BLACKBEARD, numberAllowed: 2 },
    { tile: tiles.CHOOSE, numberAllowed: 2 },
    { tile: tiles.SHIELD, numberAllowed: 2 },
    { tile: tiles.MIRROR, numberAllowed: 2 },
    { tile: tiles.HOOK, numberAllowed: 2 },
    { tile: tiles.BOMB, numberAllowed: 2 },
    { tile: tiles.DOUBLE, numberAllowed: 2 },
    { tile: tiles.BANK, numberAllowed: 4 },
    { tile: tiles.LARGEST_CASH, numberAllowed: 1 },
    { tile: tiles.LARGE_CASH, numberAllowed: 2 },
    { tile: tiles.MEDIUM_CASH, numberAllowed: 10 },
    { tile: tiles.SMALL_CASH, numberAllowed: 8 }
]

export { tiles, standardRules, chaosRules }
