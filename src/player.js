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

  placeShip(size, row, col, aligment) {
    return this.gameboard.placeShip(new Ship(size), row, col, aligment);
  }

  placeRandomly() {
    let ships = [5, 4, 3, 3, 2];
    let alignments = ["V", "H"];
    let result;
    let row;
    let col;
    let alignment;
    for (const ship of ships) {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
      alignment = alignments[Math.round(Math.random())];
      result = this.placeShip(ship, row, col, alignment);
      while (result != true) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        alignment = alignments[Math.round(Math.random())];
        result = this.placeShip(ship, row, col, alignment);
      }
    }
    return true;
  }
}
