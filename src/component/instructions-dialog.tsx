"use client";

import * as Accordion from "@/component/accordion";
import Dialog from "@/component/dialog";
import Tiles from "@/component/tiles";

export default function InstructionsDialog() {
  return (
    <Dialog trigger="Instructions" title="Instructions">
      <article className="prose prose-invert h-screen">
        <h1 id="pirate-game">Pirate Game</h1>

        <p>
          This web application serves as a tool for someone who wants to host a
          traditional pen-and-paper version of the Pirate Game.
        </p>
        <p>
          You will want to share your screen with all the players via a
          classroom projector, TV, or by screen sharing if playing remotely.
        </p>

        <Accordion.Root type="single" collapsible={true}>
          <Accordion.Item value="setup">
            <Accordion.Trigger>
              <span className="text-xl font-bold">Setting up the game</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <ol>
                <li>
                  Each player must have a printed game sheet from the{" "}
                  <em>Sheets</em> window (which sheet to print is indicated by
                  how many players there are).
                </li>
                <li>
                  Each player should fill their grid with the different tiles
                  listed on the right-hand side. The numbers in brackets
                  indicate how many of each tile should be placed in the grid.
                </li>
                <li>
                  Each player begins with 0 cash and 0 money in their bank.
                </li>
              </ol>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="gameplay">
            <Accordion.Trigger>
              <span className="text-xl font-bold">Playing the game</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <ol>
                <li>
                  The host will click the <em>Random Cell</em> button and each
                  player will cross off the grid square selected.
                </li>
                <li>
                  For each of the non-cash tiles, the host will ask the players
                  if any of them landed on that tile.
                  <ol>
                    <li>
                      If one player has landed on the named tile, then they
                      should do whatever the tile's rule says (the tiles on the
                      host's screen also display these rules).
                    </li>
                    <li>
                      If multiple players have landed on the named tile, the{" "}
                      <em>Player Shuffler</em> is to be used to create a random
                      order - the host will enter all the player names and then
                      click <em>Shuffle</em>.
                    </li>
                  </ol>
                </li>
                <li>
                  If there are players who have landed on the <em>Choose</em>{" "}
                  tile, the host will open the <em>Choose Queue</em> window and
                  enter the player names, then add them to the queue using the{" "}
                  <em>Shuffle and Merge</em> button.
                </li>
                <li>
                  If the choose queue has players in it, then the player at the
                  top of the choose queue should choose which grid square to
                  select next.
                  <ol>
                    <li>
                      The host should click on the grid square to select it.
                    </li>
                    <li>
                      The player at the top of the queue will automatically be
                      removed from the queue.
                    </li>
                    <li>Continue to step 2.</li>
                  </ol>
                </li>
                <li>
                  If there are no players in the choose queue, then continue to
                  step 1.
                </li>
              </ol>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="winning">
            <Accordion.Trigger>
              <span className="text-xl font-bold">Winning the game</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <p>
                The winner of the game is the player who has the most money
                (cash and bank combined) after the grid has been completed or
                after a set period of time, e.g. 1 hour, has passed.
              </p>
            </Accordion.Content>
          </Accordion.Item>

          <Accordion.Item value="tiles">
            <Accordion.Trigger>
              <span className="text-xl font-bold">Tiles</span>
            </Accordion.Trigger>
            <Accordion.Content>
              <Tiles />
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </article>
    </Dialog>
  );
}
