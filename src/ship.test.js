import { Ship } from "./ship";

test("Ship is constructed correctly", () => {
  var size = 3;
  const object = new Ship(size);
  expect(object).toBeInstanceOf(Ship);
  expect(object.size).toBe(size);
});
