export const isValid = (board: number[], row: number, col: number, num: number) => {
    for (let x = 0; x < 9; x++) {
        if (board[row * 9 + x] === num || board[x * 9 + col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[(startRow + i) * 9 + (startCol + j)] === num) return false;
        }
    }
    return true;
};

export const solveSudoku = (board: number[]): boolean => {
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) {
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
            for (const num of nums) {
                const row = Math.floor(i / 9);
                const col = i % 9;
                if (isValid(board, row, col, num)) {
                    board[i] = num;
                    if (solveSudoku(board)) return true;
                    board[i] = 0;
                }
            }
            return false;
        }
    }
    return true;
};

export const generateSudoku = (): number[] => {
    const board = Array(81).fill(0);
    solveSudoku(board);
    return board;
};

export const createPuzzle = (solvedBoard: number[], clues: number = 35): number[] => {
    const puzzle = [...solvedBoard];
    let attempts = 81 - clues;
    
    // Simple removal strategy: remove random cells until we hit target count
    // A robust generator would check uniqueness, but for a casual game, 
    // simply removing numbers while keeping symmetry or random distribution is usually sufficient.
    const indices = Array.from({ length: 81 }, (_, i) => i).sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < attempts; i++) {
        puzzle[indices[i]] = 0;
    }
    
    return puzzle;
};