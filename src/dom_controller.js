export class DOMController {
  reset() {
    const winDiv = document.getElementById("win-text");
    winDiv.innerHTML = "";
    const enemy = document.getElementById("enemy-board");
    enemy.innerHTML = "";
    const player = document.getElementById("player-board");
    player.innerHTML = "";
  }

  renderBoard(gameboardInstance, isEnemy) {
    if (isEnemy) {
      const boardDiv = document.getElementById("enemy-board");
      boardDiv.innerHTML = "";
      const board = gameboardInstance.getPublicBoard();
      for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
          const cell = document.createElement("div");
          cell.classList.add("grid-cell");
          cell.dataset.row = r;
          cell.dataset.col = c;
          if (board[r][c] == 0) {
            cell.classList.add("empty");
          } else if (board[r][c] == 1) {
            cell.classList.add("hit");
          } else if (board[r][c] == 2) {
            cell.classList.add("miss");
          } else if (board[r][c] == 4) {
            cell.classList.add("sunk");
          }
          boardDiv.appendChild(cell);
        }
      }
    } else {
      const boardDiv = document.getElementById("player-board");
      boardDiv.innerHTML = "";
      const board = gameboardInstance.getPrivateBoard();
      for (let r = 0; r < 10; r++) {
        for (let c = 0; c < 10; c++) {
          const cell = document.createElement("div");
          cell.classList.add("grid-cell");
          cell.dataset.row = r;
          cell.dataset.col = c;
          if (board[r][c] == 0) {
            cell.classList.add("empty");
          } else if (board[r][c] == 1) {
            cell.classList.add("hit");
          } else if (board[r][c] == 2) {
            cell.classList.add("miss");
          } else if (board[r][c] == 3) {
            cell.classList.add("ship");
          } else if (board[r][c] == 4) {
            cell.classList.add("sunk");
          }
          boardDiv.appendChild(cell);
        }
      }
    }
  }

  displayWin(name) {
    const winText = name + " has won!";
    const winDiv = document.getElementById("win-text");
    winDiv.innerHTML = "";
    winDiv.innerHTML = winText;
  }
}
