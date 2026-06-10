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

  clearEverything() {
    const body = document.getElementsByTagName("body")[0];
    body.innerHTML = "";
  }

  startingScreen() {
    const body = document.getElementsByTagName("body")[0];
    const board = document.createElement("div");
    board.classList.add("board");
    body.appendChild(board);
    const newConfButton = document.createElement("button");
    newConfButton.id = "new-conf";
    newConfButton.innerText = "New Placement";
    const startGameButton = document.createElement("button");
    startGameButton.id = "start-button";
    startGameButton.innerText = "Start Game";
    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-div");
    buttonDiv.appendChild(newConfButton);
    buttonDiv.appendChild(startGameButton);
    body.appendChild(buttonDiv);

    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.classList.add("empty");
        cell.dataset.row = r;
        cell.dataset.col = c;
        board.appendChild(cell);
      }
    }
  }

  renderPlacement(player) {
    const board = player.gameboard.getPrivateBoard();
    const boardDiv = document.getElementsByClassName("board")[0];
    boardDiv.innerHTML = "";
    for (let r = 0; r < 10; r++) {
      for (let c = 0; c < 10; c++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.row = r;
        cell.dataset.col = c;
        if (board[r][c] == 0) {
          cell.classList.add("empty");
        } else if (board[r][c] == 3) {
          cell.classList.add("ship");
        }
        boardDiv.appendChild(cell);
      }
    }
  }

  initiateGame() {
    const container = document.body;
    container.innerHTML = `
  <div id="win-text"></div>
  <div class="boards-div">
    <div class="board" id="player-board"></div>
    <div class="board" id="enemy-board"></div>
  </div>
  <button id="restart-btn">Restart</button>
`;
  }
}
