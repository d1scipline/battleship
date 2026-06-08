export class Gameboard {
  constructor() {
    this.shipGrid = [];
    this.attackGrid = [];
    this.ships = [];
    this.gridSize = 10;
    for (let i = 0; i < this.gridSize; i++) {
      this.shipGrid.push([]);
      this.attackGrid.push([]);
    }
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        this.shipGrid[i].push(null);
        this.attackGrid[i].push(null);
      }
    }
  }

  //Checks if it overlaps with another ship
  checkOverlap(ship, row, col, direction) {
    let size = ship.size;
    if (direction == "V") {
      for (let i = 0; i < size; i++) {
        if (this.shipGrid[row + i][col] != null) {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < size; i++) {
        if (this.shipGrid[row][col + i] != null) {
          return false;
        }
      }
      return true;
    }
  }

  //Checks borders and if the coords are valid
  checkBorders(ship, row, col, direction) {
    if (direction == "H") {
      if (
        col + ship.size > this.gridSize ||
        row < 0 ||
        row > this.gridSize - 1 ||
        col < 0 ||
        col > this.gridSize - 1
      ) {
        return false;
      } else {
        return true;
      }
    } else if (direction == "V") {
      if (
        row + ship.size > this.gridSize ||
        row < 0 ||
        row > this.gridSize - 1 ||
        col < 0 ||
        col > this.gridSize - 1
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  placeShip(ship, row, col, direction) {
    if (!this.checkBorders(ship, row, col, direction)) {
      return false;
    }

    if (!this.checkOverlap(ship, row, col, direction)) {
      return false;
    }

    if (direction == "V") {
      for (let i = 0; i < ship.size; i++) {
        this.shipGrid[row + i][col] = ship;
      }
      this.ships.push(ship);
      return true;
    } else if (direction == "H") {
      for (let i = 0; i < ship.size; i++) {
        this.shipGrid[row][col + i] = ship;
      }
      this.ships.push(ship);
      return true;
    } else {
      return false;
    }
  }

  receiveAttack(row, col) {
    if (this.attackGrid[row][col] == 1 || this.attackGrid[row][col] == 0) {
      return false;
    } else {
      if (this.shipGrid[row][col] != null) {
        this.shipGrid[row][col].hit();
        this.attackGrid[row][col] = 1;
        return true;
      } else {
        this.attackGrid[row][col] = 0;
        return true;
      }
    }
  }

  allShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
