import { Gameboard } from "../src/gameboard";
import { Ship } from "../src/ship";

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

  test("Places a horizontal ship successfully and returns true", () => {
    const success = board.placeShip(ship, 1, 4, "H");
    expect(success).toBe(true);
    expect(board.grid[1][4]).toBe(ship);
    expect(board.grid[1][5]).toBe(ship);
    expect(board.grid[1][6]).toBe(ship);
  });

  test("Checks for boundaries", () => {
    let success = board.placeShip(ship, 1, 9, "H");
    expect(success).toBe(false);
    expect(board.grid[1][9]).toBe(null);

    success = board.placeShip(ship, 9, 1, "V");
    expect(success).toBe(false);
    expect(board.grid[9][1]).toBe(null);
  });

  test("Checks if there is overlapping", () => {
    let successFirst = board.placeShip(ship, 2, 2, "H");
    let successSecond = board.placeShip(ship, 1, 3, "V");
    expect(successFirst).toBe(true);
    expect(successSecond).toBe(false);
  });
});
