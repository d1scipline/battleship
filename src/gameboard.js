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

  placeShip(ship, row, col, direction) {
    if (direction == "V") {
      for (let i = 0; i < ship.size; i++) {
        this.grid[row + i][col] = ship;
      }
      return true;
    }
  }
}
