import { DOMController } from "./dom_controller";
import { GameController } from "./game";
import { Player } from "./player";
import "./style.css";

const ui = new DOMController();

const resetButton = document.getElementById("restart-btn");
const enemyBoard = document.getElementById("enemy-board");

let controller;

resetButton.addEventListener("click", () => {
  init_game();
});

enemyBoard.addEventListener("click", (e) => {
  if (!controller) return;

  const cell = e.target.closest(".grid-cell");
  if (!cell) return;

  const row = cell.dataset.row;
  const col = cell.dataset.col;

  let result = controller.handleTurn(row, col);

  ui.renderBoard(controller.getPlayer().gameboard, false);
  ui.renderBoard(controller.getComputer().gameboard, true);

  if (result === "player-win") {
    ui.displayWin(controller.getPlayer().name);
  } else if (result === "computer-win") {
    ui.displayWin(controller.getComputer().name);
  }
});

function init_game() {
  ui.reset();
  const player = new Player("Player");

  controller = new GameController(player);

  ui.renderBoard(controller.getPlayer().gameboard, false);
  ui.renderBoard(controller.getComputer().gameboard, true);
}

init_game();
