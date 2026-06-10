import { DOMController } from "./dom_controller";
import { GameController } from "./game";
import { Player } from "./player";
import "./style.css";

const ui = new DOMController();

function start_game() {
  ui.clearEverything();
  ui.startingScreen();
  let player;
  let shipsList = false;

  let replaceButton = document.getElementById("new-conf");
  let startButton = document.getElementById("start-button");

  replaceButton.addEventListener("click", () => {
    player = new Player();
    player.placeRandomly();
    ui.renderPlacement(player);
    shipsList = true;
  });

  startButton.addEventListener("click", () => {
    if (!shipsList) {
      return;
    } else {
      init_game(player);
    }
  });
}

function init_game(player) {
  ui.clearEverything();
  ui.initiateGame();
  const resetButton = document.getElementById("restart-btn");
  const enemyBoard = document.getElementById("enemy-board");

  let controller;

  controller = new GameController(player);

  resetButton.addEventListener("click", () => {
    start_game();
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

  ui.renderBoard(controller.getPlayer().gameboard, false);
  ui.renderBoard(controller.getComputer().gameboard, true);
}

start_game();
