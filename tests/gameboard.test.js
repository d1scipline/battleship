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
    expect(board.shipGrid[1][4]).toBe(ship);
    expect(board.shipGrid[2][4]).toBe(ship);
    expect(board.shipGrid[3][4]).toBe(ship);
  });

  test("Places a horizontal ship successfully and returns true", () => {
    const success = board.placeShip(ship, 1, 4, "H");
    expect(success).toBe(true);
    expect(board.shipGrid[1][4]).toBe(ship);
    expect(board.shipGrid[1][5]).toBe(ship);
    expect(board.shipGrid[1][6]).toBe(ship);
  });

  test("Checks for boundaries", () => {
    let success = board.placeShip(ship, 1, 9, "H");
    expect(success).toBe(false);
    expect(board.shipGrid[1][9]).toBe(null);

    success = board.placeShip(ship, 9, 1, "V");
    expect(success).toBe(false);
    expect(board.shipGrid[9][1]).toBe(null);
  });

  test("Checks if there is overlapping", () => {
    let successFirst = board.placeShip(ship, 2, 2, "H");
    let successSecond = board.placeShip(ship, 1, 3, "V");
    expect(successFirst).toBe(true);
    expect(successSecond).toBe(false);
  });

  test("Receives attack", () => {
    board.placeShip(ship, 2, 2, "H");
    board.receiveAttack(2, 2);
    expect(ship.hits).toBe(1);
  });

  test("Doesn't receive attack on an already shot location", () => {
    board.placeShip(ship, 2, 2, "H");
    board.receiveAttack(2, 2);
    board.receiveAttack(2, 2);
    expect(ship.hits).toBe(1);
  });

  test("Keeps track of missed shots", () => {
    board.placeShip(ship, 2, 2, "V");
    board.receiveAttack(3, 3);
    expect(board.attackGrid[3][3]).toBe(0);
  });

  test("Tells if all the ships are sunk", () => {
    board.placeShip(ship, 0, 0, "H");
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    expect(board.allShipsSunk()).toBe(true);
  });
});
