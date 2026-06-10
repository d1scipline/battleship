import { DOMController } from "./dom_controller";
import { GameController } from "./game";
import { Player } from "./player";
import "./style.css";

const ui = new DOMController();
const player = new Player("Player");
const controller = new GameController(player);

ui.renderBoard(controller.getPlayer().gameboard, false);
ui.renderBoard(controller.getComputer().gameboard, true);

const enemyBoard = document.getElementById("enemy-board");
enemyBoard.addEventListener("click", (e) => {
  const cell = e.target.closest(".grid-cell");
  if (!cell) return;
  const row = cell.dataset.row;
  const col = cell.dataset.col;
  let result = controller.handleTurn(row, col);
  console.log(result);
  ui.renderBoard(controller.getPlayer().gameboard, false);
  ui.renderBoard(controller.getComputer().gameboard, true);
});
