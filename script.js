let currentPlayer = "X"; // Start with player X
let board = Array(9).fill(""); // Initialize empty board
const boxes = document.querySelectorAll(".box");
const playerText = document.getElementById("playerText");
const restartButton = document.querySelector(".retartButton");

// Winning combinations: rows, columns, diagonals
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Add click listeners to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleBoxClick(box, index));
});

// Handle box clicks
function handleBoxClick(box, index) {
    if (board[index] !== "" || checkWinner()) return; // Ignore if already filled or game is over

    board[index] = currentPlayer; // Update board
    box.textContent = currentPlayer; // Update UI

    if (checkWinner()) {
        playerText.textContent = `${currentPlayer} Wins!`; // Display winner
    } else if (board.every(cell => cell !== "")) {
        playerText.textContent = "It's a Draw!"; // Check for draw
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
        playerText.textContent = `Player ${currentPlayer}'s Turn`; // Update status
    }
}

// Check for a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

// Restart the game
restartButton.addEventListener("click", resetGame);

function resetGame() {
    board.fill(""); // Clear the board array
    boxes.forEach(box => (box.textContent = "")); // Clear UI
    currentPlayer = "X"; // Reset to player X
    playerText.textContent = "Player X's Turn"; // Reset status
}
