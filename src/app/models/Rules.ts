
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

export const enum RuleTypes {
    STANDARD,
    CHAOS
}

let tiles: { [index: string]: Tile } = {
    SHIP: {
        name: 'Pirate Ship',
        summary: 'Steal someone\'s cash',
        description: '',
        icon: '/assets/images/icons/ship.svg'
    },
    PARROT: {
        name: 'Parrot',
        summary: 'Copy someone\'s cash',
        description: '',
        icon: '/assets/images/icons/parrot.svg'
    },
    DAGGER: {
        name: 'Dagger',
        summary: 'Reset someone\'s cash',
        description: '',
        icon: '/assets/images/icons/dagger.svg'
    },
    PRESENT: {
        name: 'Present',
        summary: 'Pick someone to receive 5,000 cash',
        description: '',
        icon: '/assets/images/icons/present.svg'
    },
    SWAP: {
        name: 'Swap',
        summary: 'Swap cash with someone',
        description: '',
        icon: '/assets/images/icons/swap.svg'
    },
    BLACKBEARD: {
        name: 'Blackbeard',
        summary: 'Rob someone\'s bank',
        description: '',
        icon: '/assets/images/icons/blackbeard.svg'
    },
    CHOOSE: {
        name: 'Choose',
        summary: 'Pick the square next round',
        description: '',
        icon: '/assets/images/icons/choose.svg'
    },
    SHIELD: {
        name: 'Shield',
        summary: 'Block an attack',
        description: '',
        icon: '/assets/images/icons/shield.svg'
    },
    MIRROR: {
        name: 'Mirror',
        summary: 'Reflect an attack',
        description: '',
        icon: '/assets/images/icons/mirror.svg'
    },
    HOOK: {
        name: 'Hook',
        summary: 'Shift an attack to someone else',
        description: '',
        icon: '/assets/images/icons/hook.svg'
    },
    BOMB: {
        name: 'Bomb',
        summary: 'Reset your cash',
        description: '',
        icon: '/assets/images/icons/bomb.svg'
    },
    DOUBLE: {
        name: 'Double',
        summary: 'Double your cash',
        description: '',
        icon: '/assets/images/icons/double.svg'
    },
    BANK: {
        name: 'Bank',
        summary: 'Bank your cash',
        description: '',
        icon: '/assets/images/icons/bank.svg'
    },
    LARGEST_CASH: {
        name: '5,000 Cash',
        summary: 'Collect 5,000 cash',
        description: '',
        icon: '/assets/images/icons/largest_cash.svg'
    },
    LARGE_CASH: {
        name: '3,000 Cash',
        summary: 'Collect 3,000 cash',
        description: '',
        icon: '/assets/images/icons/large_cash.svg'
    },
    MEDIUM_CASH: {
        name: '1,000 Cash',
        summary: 'Collect 1,000 cash',
        description: '',
        icon: '/assets/images/icons/medium_cash.svg'
    },
    SMALL_CASH: {
        name: '200 Cash',
        summary: 'Collect 200 cash',
        description: '',
        icon: '/assets/images/icons/small_cash.svg'
    }
}

let rules: { [key in RuleTypes]: Rule[] } = {
    [RuleTypes.STANDARD]: [
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
    ],
    [RuleTypes.CHAOS]: [
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
}

export { tiles, rules }
