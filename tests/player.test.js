import { Player } from "../src/player";

test("Player can attack", () => {
  const player1 = new Player();
  const player2 = new Player();
  const result = player1.attack(player2, 0, 0);
  expect(result).toBe(true);
});
