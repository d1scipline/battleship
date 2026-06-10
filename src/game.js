import { Computer } from "./computer";
import { renderStuff } from "./dom_controller";
import { Player } from "./player";

export class GameController {
  constructor(player) {
    this.player = player;
    this.computer = new Computer();
    this.isGameOver = false;
    this.turn = true;
    this.initializeShips();
  }

  initializeShips() {
    this.player.placeShip(3, 1, 1, "H");
    this.player.placeShip(5, 4, 4, "V");
    this.computer.placeShip(5, 3, 3, "H");
    this.computer.placeShip(3, 6, 5, "V");
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

  handleTurn(row, col) {
    if (this.isGameOver) {
      return "game-over";
    }
    let result = this.player.attack(this.computer, row, col);
    if (result == -1) {
      return -1;
    } else if (result == 0) {
      this.computer.attack(this.player);
      return this.checkWin();
    } else if (result == 1) {
      return this.checkWin();
    }
  }
}
