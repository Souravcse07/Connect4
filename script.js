const rows = 6;
const cols = 7;
let board = Array.from({ length: rows }, () => Array(cols).fill(null));
let currentPlayer = 'red';

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function createBoard() {
    boardElement.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", () => dropPiece(c));
            boardElement.appendChild(cell);
        }
    }
}

function dropPiece(col) {
    for (let r = rows - 1; r >= 0; r--) {
        if (!board[r][col]) {
            board[r][col] = currentPlayer;
            updateBoard();
            if (checkWin(r, col)) {
                statusElement.textContent = `Player ${currentPlayer === 'red' ? '1' : '2'} wins!`;
                boardElement.style.pointerEvents = 'none';
                return;
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            statusElement.textContent = `Player ${currentPlayer === 'red' ? '1' : '2'}'s turn (${currentPlayer})`;
            return;
        }
    }
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        const r = cell.dataset.row;
        const c = cell.dataset.col;
        cell.classList.remove("red", "yellow");
        if (board[r][c]) {
            cell.classList.add(board[r][c]);
        }
    });
}

function checkWin(row, col) {
    const directions = [
        [[-1, 0], [1, 0]], // Vertical
        [[0, -1], [0, 1]], // Horizontal
        [[-1, -1], [1, 1]], // Diagonal /
        [[-1, 1], [1, -1]]  // Diagonal \
    ];
    
    for (let [[dr1, dc1], [dr2, dc2]] of directions) {
        let count = 1;
        count += countConsecutive(row, col, dr1, dc1);
        count += countConsecutive(row, col, dr2, dc2);
        if (count >= 4) return true;
    }
    return false;
}

function countConsecutive(row, col, dr, dc) {
    let r = row + dr;
    let c = col + dc;
    let count = 0;
    while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
        count++;
        r += dr;
        c += dc;
    }
    return count;
}

createBoard();
