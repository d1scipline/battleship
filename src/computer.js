import { Player } from "./player";

export class Computer extends Player {
  constructor() {
    super("Computer");
  }

  attack(player) {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let result = player.gameboard.receiveAttack(x, y);
    while (result == -1) {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      result = player.gameboard.receiveAttack(x, y);
    }
    return result;
  }
}
