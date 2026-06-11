import { Computer } from "./computer";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export class GameController {
  constructor(player) {
    this.player = player;
    this.computer = new Computer();
    this.isGameOver = false;
    this.turn = true;
    this.initializeShips();
  }

  initializeShips() {
    this.computer.placeRandomly();
  }

  getPlayer() {
    return this.player;
  }

  getComputer() {
    return this.computer;
  }

  checkWin() {
    if (this.player.checkState()) {
      this.isGameOver = true;
      return "computer-win";
    } else if (this.computer.checkState()) {
      this.isGameOver = true;
      return "player-win";
    } else {
      return "continue";
    }
  }

  async handleTurn(row, col, renderCallback) {
    if (this.isGameOver) {
      return "game-over";
    }

    let result = this.player.attack(this.computer, row, col);

    if (result == -1) {
      return -1;
    } else if (result == 0) {
      renderCallback();

      await sleep(500);

      let computerResult = this.computer.attack(this.player);
      renderCallback();

      while (computerResult == 1) {
        await sleep(500);
        computerResult = this.computer.attack(this.player);
        renderCallback();
      }

      return this.checkWin();
    } else if (result == 1) {
      renderCallback();
      return this.checkWin();
    }
  }
}
