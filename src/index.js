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

  enemyBoard.addEventListener("click", async (e) => {
    if (!controller || controller.isGameOver) return;

    const cell = e.target.closest(".grid-cell");
    if (!cell) return;

    const row = cell.dataset.row;
    const col = cell.dataset.col;

    // Temporarily freeze the grid container pointer clicks so the player can't click during the pause
    enemyBoard.style.pointerEvents = "none";

    // Pass a inline arrow function as the renderCallback argument
    let result = await controller.handleTurn(row, col, () => {
      ui.renderBoard(controller.getPlayer().gameboard, false);
      ui.renderBoard(controller.getComputer().gameboard, true);
    });

    if (result === "player-win") {
      ui.displayWin(controller.getPlayer().name);
    } else if (result === "computer-win") {
      ui.displayWin(controller.getComputer().name);
    } else if (result !== -1) {
      enemyBoard.style.pointerEvents = "auto";
    } else {
      enemyBoard.style.pointerEvents = "auto";
    }
  });

  ui.renderBoard(controller.getPlayer().gameboard, false);
  ui.renderBoard(controller.getComputer().gameboard, true);
}

start_game();
