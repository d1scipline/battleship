import { Player } from "./player";

const EMPTY_SQUARE = 0;
const SUNK_SHIP = 4;

export class Computer extends Player {
  constructor() {
    super("Computer");
    this.mode = "hunt";
    this.first_hit = null;
    this.last_hit = null;
    this.direction_vector = null;
    this.attack_queue = [];
    this.neighbor_queue = [];
  }

  populateNeighborQueue(player, location) {
    let board = player.gameboard.getPublicBoard();
    let row = location.row;
    let col = location.col;
    if (this.checkValidity(player, row + 1, col)) {
      this.neighbor_queue.push({ row: row + 1, col });
    }
    if (this.checkValidity(player, row, col + 1)) {
      this.neighbor_queue.push({ row, col: col + 1 });
    }
    if (this.checkValidity(player, row - 1, col)) {
      this.neighbor_queue.push({ row: row - 1, col });
    }
    if (this.checkValidity(player, row, col - 1)) {
      this.neighbor_queue.push({ row, col: col - 1 });
    }
  }

  emptyNeighborQueue() {
    this.neighbor_queue = [];
  }

  checkValidity(player, row, col) {
    if (!this.checkDeadZone(player, row, col)) {
      return false;
    }
    if (row < 0 || row > 9 || col < 0 || col > 9) {
      return false;
    }
    if (player.gameboard.getPublicBoard()[row][col] != 0) {
      return false;
    }
    return true;
  }

  //Checks neighboring squares to see if there are any sunk ships
  checkDeadZone(player, row, col) {
    let board = player.gameboard.getPublicBoard();

    // Check top and bottom rows
    for (let i = 0; i < 3; i++) {
      let object1 = board[row - 1]?.[col - 1 + i] ?? null;
      let object2 = board[row + 1]?.[col - 1 + i] ?? null;
      if (object1 == SUNK_SHIP || object2 == SUNK_SHIP) {
        return false;
      }
    }

    // Check right and left columns
    let right = board[row]?.[col + 1] ?? null;
    let left = board[row]?.[col - 1] ?? null;

    if (right == SUNK_SHIP || left == SUNK_SHIP) {
      return false;
    }

    return true;
  }

  pickNewCoord(player) {
    let board = player.gameboard.getPublicBoard();
    let validMoves = [];

    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (
          board[row][col] === EMPTY_SQUARE &&
          this.checkDeadZone(player, row, col) &&
          (row + col) % 2 == 0
        ) {
          validMoves.push({ row, col });
        }
      }
    }

    if (validMoves.length === 0) {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (
            board[row][col] === EMPTY_SQUARE &&
            this.checkDeadZone(player, row, col)
          ) {
            validMoves.push({ row, col });
          }
        }
      }
    }

    if (validMoves.length === 0) {
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          if (board[row][col] === EMPTY_SQUARE) {
            validMoves.push({ row, col });
          }
        }
      }
    }

    if (validMoves.length === 0) {
      throw new Error("No valid moves remaining on the board!");
    }

    const randomIndex = Math.floor(Math.random() * validMoves.length);
    return validMoves[randomIndex];
  }

  attack(player) {
    if (this.mode == "hunt") {
      let coordinate = this.pickNewCoord(player);
      let row = coordinate.row;
      let col = coordinate.col;
      let result = player.gameboard.receiveAttack(row, col);
      if (result == 1) {
        this.mode = "target";
        this.first_hit = { row, col };
        this.last_hit = { row, col };
        this.populateNeighborQueue(player, this.first_hit);
      }
      return result;
    } else if (this.mode == "target") {
      console.log(this.neighbor_queue);
      let location = this.neighbor_queue.pop();
      let result = player.gameboard.receiveAttack(location.row, location.col);
      if (result == 1) {
        this.mode = "destroyer";
        this.emptyNeighborQueue();
        this.direction_vector = {
          row: location.row - this.first_hit.row,
          col: location.col - this.first_hit.col,
        };
        this.last_hit = location;
        if (
          player.gameboard.getPublicBoard()[location.row][location.col] ==
          SUNK_SHIP
        ) {
          this.resetToHuntMode();
        } else {
          if (
            this.checkValidity(
              player,
              location.row + this.direction_vector.row,
              location.col + this.direction_vector.col,
            )
          ) {
            this.attack_queue.push({
              row: location.row + this.direction_vector.row,
              col: location.col + this.direction_vector.col,
            });
          }
        }
      }
      return result;
    } else if (this.mode == "destroyer") {
      if (this.attack_queue.length != 0) {
        let target = this.attack_queue.pop();
        let result = player.gameboard.receiveAttack(target.row, target.col);
        this.last_hit = target;
        if (result == 1) {
          //Checks if sunk
          if (player.gameboard.getPublicBoard()[target.row][target.col] == 4) {
            this.resetToHuntMode();
            return result;
          } else {
            if (
              this.checkValidity(
                player,
                target.row + this.direction_vector.row,
                target.col + this.direction_vector.col,
              )
            ) {
              this.attack_queue.push({
                row: target.row + this.direction_vector.row,
                col: target.col + this.direction_vector.col,
              });
            }
            return result;
          }
        } else {
          return result;
        }
      } else {
        this.direction_vector = {
          row: this.direction_vector.row * -1,
          col: this.direction_vector.col * -1,
        };
        let target = {
          row: this.first_hit.row + this.direction_vector.row,
          col: this.first_hit.col + this.direction_vector.col,
        };
        let result = player.gameboard.receiveAttack(target.row, target.col);
        this.last_hit = target;
        if (
          player.gameboard.getPublicBoard()[target.row][target.col] == SUNK_SHIP
        ) {
          this.resetToHuntMode();
          return result;
        } else {
          this.attack_queue.push({
            row: target.row + this.direction_vector.row,
            col: target.col + this.direction_vector.col,
          });
          return result;
        }
      }
    }
  }

  resetToHuntMode() {
    this.mode = "hunt";
    this.first_hit = null;
    this.last_hit = null;
    this.direction_vector = null;
    this.attack_queue = [];
    this.neighbor_queue = [];
  }
}
