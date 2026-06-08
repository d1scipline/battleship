export class Gameboard {
  constructor() {
    this.grid = [];
    const gridSize = 10;
    for (let i = 0; i < gridSize; i++) {
      this.grid.push([]);
    }
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        this.grid[i].push(null);
      }
    }
  }

  //Checks if it overlaps with another ship
  checkOverlap(ship, row, col, direction) {
    let size = ship.size;
    if (direction == "V") {
      for (let i = 0; i < size; i++) {
        if (this.grid[row + i][col] != null) {
          return false;
        }
      }
      return true;
    } else {
      for (let i = 0; i < size; i++) {
        if (this.grid[row][col + i] != null) {
          return false;
        }
      }
      return true;
    }
  }

  //Checks borders and if the coords are valid
  checkBorders(ship, row, col, direction) {
    if (direction == "H") {
      if (col + ship.size > 10 || row < 0 || row > 9 || col < 0 || col > 9) {
        return false;
      } else {
        return true;
      }
    } else if (direction == "V") {
      if (row + ship.size > 10 || row < 0 || row > 9 || col < 0 || col > 9) {
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
        this.grid[row + i][col] = ship;
      }
      return true;
    } else if (direction == "H") {
      for (let i = 0; i < ship.size; i++) {
        this.grid[row][col + i] = ship;
      }
      return true;
    } else {
      return false;
    }
  }
}
