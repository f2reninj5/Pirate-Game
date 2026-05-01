import Grid from "@/component/grid";

export default function Home() {
  return (
    <>
      <header className="flex flex-row justify-between items-center">
        <button type="button">Instructions</button>
        <button type="button">Feedback</button>
        <h1 className="font-pirate">Pirate Game</h1>
        <button type="button">Reset</button>
      </header>
      <main>
        <Grid></Grid>
      </main>
      <footer className="flex flex-row justify-center items-center">
        <span>
          Copyright © 2026 Maks Nowak. Licensed under the{" "}
          <a href="https://www.apache.org/licenses/LICENSE-2.0">
            Apache License, Version 2.0
          </a>
          .
        </span>
      </footer>
    </>
  );
}
