"use client";

import * as Accordion from "@/component/accordion";
import { Popover } from "@/component/popover";

export interface Tile {
  name: string;
  summary: string;
  description: string;
  icon: string;
}

export interface Rule {
  tile: Tile;
  numberAllowed: number;
}

export enum RuleTypes {
  STANDARD,
  CHAOS,
}

const tiles: { [index: string]: Tile } = {
  SHIP: {
    name: "Pirate Ship",
    summary: "Steal someone's cash",
    description: "",
    icon: "ship.svg",
  },
  PARROT: {
    name: "Parrot",
    summary: "Copy someone's cash",
    description: "",
    icon: "parrot.svg",
  },
  DAGGER: {
    name: "Dagger",
    summary: "Reset someone's cash",
    description: "",
    icon: "dagger.svg",
  },
  PRESENT: {
    name: "Present",
    summary: "Pick someone to receive 5,000 cash",
    description: "",
    icon: "present.svg",
  },
  SWAP: {
    name: "Swap",
    summary: "Swap cash with someone",
    description: "",
    icon: "swap.svg",
  },
  BLACKBEARD: {
    name: "Blackbeard",
    summary: "Rob someone's bank",
    description: "",
    icon: "blackbeard.svg",
  },
  CHOOSE: {
    name: "Choose",
    summary: "Pick the square next round",
    description: "",
    icon: "choose.svg",
  },
  SHIELD: {
    name: "Shield",
    summary: "Block an attack",
    description: "",
    icon: "shield.svg",
  },
  MIRROR: {
    name: "Mirror",
    summary: "Reflect an attack",
    description: "",
    icon: "mirror.svg",
  },
  HOOK: {
    name: "Hook",
    summary: "Shift an attack to someone else",
    description: "",
    icon: "hook.svg",
  },
  BOMB: {
    name: "Bomb",
    summary: "Reset your cash",
    description: "",
    icon: "bomb.svg",
  },
  DOUBLE: {
    name: "Double",
    summary: "Double your cash",
    description: "",
    icon: "double.svg",
  },
  BANK: {
    name: "Bank",
    summary: "Bank your cash",
    description: "",
    icon: "bank.svg",
  },
  LARGEST_CASH: {
    name: "5,000 Cash",
    summary: "Collect 5,000 cash",
    description: "",
    icon: "largest_cash.svg",
  },
  LARGE_CASH: {
    name: "3,000 Cash",
    summary: "Collect 3,000 cash",
    description: "",
    icon: "large_cash.svg",
  },
  MEDIUM_CASH: {
    name: "1,000 Cash",
    summary: "Collect 1,000 cash",
    description: "",
    icon: "medium_cash.svg",
  },
  SMALL_CASH: {
    name: "200 Cash",
    summary: "Collect 200 cash",
    description: "",
    icon: "small_cash.svg",
  },
};

const rules: { [key in RuleTypes]: Rule[] } = {
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
    { tile: tiles.SMALL_CASH, numberAllowed: 22 },
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
    { tile: tiles.SMALL_CASH, numberAllowed: 8 },
  ],
};

export { tiles, rules };

export default function Tiles() {
  return (
    <div className="not-prose flex justify-center flex-wrap gap-2">
      {Object.entries(tiles).map(([key, value]) => (
        <Popover
          className="w-20 h-20 bg-gray-500"
          trigger={value.name}
          key={key}
        >
          <h2>{value.name}</h2>
          {value.summary}
          <Accordion.Root type="single" collapsible={true}>
            <Accordion.Item value="details">
              <Accordion.Trigger>Details</Accordion.Trigger>
              <Accordion.Content>
                <p>pwafka</p>
                <p>fawefa</p>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Popover>
      ))}
    </div>
  );
}
