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

  //Checks if there is another ship next to it
  checkSpace(ship, row, col, direction) {
    const size = ship.size;
    if (direction === "H") {
      //Check beginning column
      for (let i = 0; i < 3; i++) {
        let object = this.shipGrid.at(row - 1 + i)?.at(col - 1) ?? null;
        if (object != null) {
          return false;
        }
      }
      //Check end column
      for (let i = 0; i < 3; i++) {
        let object = this.shipGrid.at(row - 1 + i)?.at(col + size) ?? null;
        if (object != null) {
          return false;
        }
      }
      //Check top row
      for (let i = 0; i < size; i++) {
        let object = this.shipGrid.at(row + 1)?.at(col + i) ?? null;
        if (object != null) {
          return false;
        }
      }
      //Check bottom row
      for (let i = 0; i < size; i++) {
        let object = this.shipGrid.at(row - 1)?.at(col + i) ?? null;
        if (object != null) {
          return false;
        }
      }
    } else if (direction === "V") {
      //Check top row
      for (let i = 0; i < 3; i++) {
        let object = this.shipGrid.at(row - 1)?.at(col - 1 + i) ?? null;
        if (object != null) {
          return false;
        }
      }
      //Check bottom row
      for (let i = 0; i < 3; i++) {
        let object = this.shipGrid.at(row + size)?.at(col - 1 + i) ?? null;
        if (object != null) {
          return false;
        }
      }
      //Check left column (Fixed: col - 1)
      for (let i = 0; i < size; i++) {
        let object = this.shipGrid.at(row + i)?.at(col - 1) ?? null;
        if (object != null) {
          return false;
        }
      }
      //Check right column (Fixed: row + i and col + 1)
      for (let i = 0; i < size; i++) {
        let object = this.shipGrid.at(row + i)?.at(col + 1) ?? null;
        if (object != null) {
          return false;
        }
      }
    }
    return true;
  }
  placeShip(ship, row, col, direction) {
    if (!this.checkBorders(ship, row, col, direction)) {
      return false;
    }

    if (!this.checkOverlap(ship, row, col, direction)) {
      return false;
    }

    if (!this.checkSpace(ship, row, col, direction)) {
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
      return -1;
    } else {
      if (this.shipGrid[row][col] != null) {
        this.shipGrid[row][col].hit();
        this.attackGrid[row][col] = 1;
        return 1;
      } else {
        this.attackGrid[row][col] = 0;
        return 0;
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

  getPublicBoard() {
    const board = [];
    for (let row = 0; row < this.gridSize; row++) {
      board.push([]);
      for (let col = 0; col < this.gridSize; col++) {
        if (this.attackGrid[row][col] == null) {
          //Empty
          board[row].push(0);
        } else if (this.attackGrid[row][col] == 0) {
          //Miss
          board[row].push(2);
        } else if (
          this.attackGrid[row][col] == 1 &&
          this.shipGrid[row][col].isSunk()
        ) {
          //Sunk
          board[row].push(4);
        } else if (
          this.attackGrid[row][col] == 1 &&
          !this.shipGrid[row][col].isSunk()
        ) {
          //Hit
          board[row].push(1);
        }
      }
    }
    return board;
  }

  getPrivateBoard() {
    const board = [];
    for (let row = 0; row < this.gridSize; row++) {
      board.push([]);
      for (let col = 0; col < this.gridSize; col++) {
        if (
          this.attackGrid[row][col] == null &&
          this.shipGrid[row][col] != null
        ) {
          //Ship
          board[row].push(3);
        } else if (this.attackGrid[row][col] == null) {
          //Empty
          board[row].push(0);
        } else if (this.attackGrid[row][col] == 0) {
          //Miss
          board[row].push(2);
        } else if (
          this.attackGrid[row][col] == 1 &&
          this.shipGrid[row][col].isSunk()
        ) {
          //Sunk
          board[row].push(4);
        } else if (
          this.attackGrid[row][col] == 1 &&
          !this.shipGrid[row][col].isSunk()
        ) {
          //Hit
          board[row].push(1);
        }
      }
    }
    return board;
  }
}
