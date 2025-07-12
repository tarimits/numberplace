function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - row % 3, startCol = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function generateFullBoard() {
  let board = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillDiagonal(board);
  solveSudoku(board);
  return board;
}

function fillDiagonal(board) {
  for (let i = 0; i < 9; i += 3) {
    let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        board[i + row][i + col] = nums.pop();
      }
    }
  }
}

function removeCells(board, count) {
  const result = board.map(row => row.slice());
  const indices = [];
  for (let i = 0; i < 81; i++) indices.push(i);
  indices.sort(() => Math.random() - 0.5);
  let removed = 0;
  while (removed < count && indices.length) {
    const idx = indices.pop();
    const r = Math.floor(idx / 9);
    const c = idx % 9;
    if (result[r][c] !== 0) {
      result[r][c] = 0;
      removed++;
    }
  }
  return result;
}

function displayBoard(containerId, board, hideZeros = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  const table = document.createElement("table");
  board.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell === 0 && hideZeros ? "" : cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  container.appendChild(table);
}

function generateSudoku() {
  const emptyCount = parseInt(document.getElementById("emptyCount").value);
  const solution = generateFullBoard();
  const puzzle = removeCells(solution, emptyCount);
  displayBoard("puzzle", puzzle, true);
  displayBoard("solution", solution);
}

generateSudoku();
