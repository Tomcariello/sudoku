// Created entirely by ChatGPT. Thanks ChatGPT.
function createGame(difficulty) {
  // Step 1: Generate a solved Sudoku board
  const solvedBoard = generateSudoku();

  // Step 2: Set the number of holes based on the selected difficulty
  let holes = 40; // Default easy difficulty
  if (difficulty === "medium") holes = 50;
  if (difficulty === "hard") holes = 60;
  if (difficulty === "challenging") holes = 70;

  // Step 3: Create a puzzle by removing numbers based on difficulty
  const puzzleBoard = createPuzzle(solvedBoard, holes);

  // Step 4: Return the game object with the puzzle, solution, and difficulty
  return {
    game: flattenBoard(puzzleBoard),
    solution: flattenBoard(solvedBoard),
    difficulty: difficulty,
  };
}

function generateSudoku() {
  const board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));
  fillBoard(board);
  return board;
}

function fillBoard(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0; // Backtrack
          }
        }
        return false; // No valid number found
      }
    }
  }
  return true; // Puzzle filled
}

function isValid(board, row, col, num) {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) return false;
  }
  // Check column
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) return false;
  }
  // Check 3x3 subgrid
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) return false;
    }
  }
  return true;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createPuzzle(board, holes) {
  const puzzle = board.map((row) => row.slice()); // Deep copy
  while (holes > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0; // Remove number
      holes--;
    }
  }
  return puzzle;
}

// Helper to flatten the board for output format
function flattenBoard(board) {
  return board.reduce((acc, row) => acc.concat(row), []);
}
