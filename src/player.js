import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

export class Player {
  constructor(name = "Player") {
    this.name = name;
    this.gameboard = new Gameboard();
  }

  attack(otherPlayer, row, col) {
    return otherPlayer.gameboard.receiveAttack(row, col);
  }

  checkState() {
    return this.gameboard.allShipsSunk();
  }
}
