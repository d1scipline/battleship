import { Ship } from "./ship";

test("Ship is constructed correctly", () => {
  const size = 3;
  const object = new Ship(size);
  expect(object).toBeInstanceOf(Ship);
  expect(object.size).toBe(size);
  expect(object.hits).toBe(0);
});

test("Ship gets hit", () => {
  const size = 3;
  const object = new Ship(size);
  object.hit();
  expect(object.hits).toBe(1);
});

test("Ship doesn't get hit more than it's size", () => {
  const size = 2;
  const object = new Ship(size);
  object.hit();
  object.hit();
  object.hit();
  expect(object.hits).toBe(2);
});

test("Ship calculates if it's sunk correctly", () => {
  const size = 3;
  const object = new Ship(size);
  object.hit();
  expect(object.isSunk()).toBe(false);
  object.hit();
  expect(object.isSunk()).toBe(false);
  object.hit();
  expect(object.isSunk()).toBe(true);
});
