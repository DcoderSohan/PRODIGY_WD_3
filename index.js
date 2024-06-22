const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restartButton');
const statusMessage = document.getElementById('statusMessage');
let currentPlayer = 'X';
let boardState = Array(9).fill(null);

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (boardState[cellIndex] !== null || checkWinner()) {
        return;
    }

    placeMark(cell, cellIndex);
    if (checkWinner()) {
        statusMessage.textContent = `${currentPlayer} Wins!`;
    } else if (boardState.every(cell => cell !== null)) {
        statusMessage.textContent = `It's a draw!`;
    } else {
        swapTurns();
    }
}

function placeMark(cell, index) {
    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function swapTurns() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return boardState[index] === currentPlayer;
        });
    });
}

function restartGame() {
    boardState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
statusMessage.textContent = `Player ${currentPlayer}'s turn`;
