import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

describe("Gameboard Placement Logic", () => {
  let board;
  let ship;
  const size = 3;

  beforeEach(() => {
    board = new Gameboard();
    ship = new Ship(size);
  });

  test("Places a vertical ship successfully and returns true", () => {
    const success = board.placeShip(ship, 1, 4, "V");
    expect(success).toBe(true);
    expect(board.grid[1][4]).toBe(ship);
    expect(board.grid[2][4]).toBe(ship);
    expect(board.grid[3][4]).toBe(ship);
  });
});
