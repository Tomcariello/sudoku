let currentSudokuGame = {}
const gameNodeNames = []; // IDs for each of the squares on the gameboard
const gameBoardNameArray = []; // Names of the arrays associated with each game board node
const hintBoardNameArray = []; // Names of the arrays associated with each hint board node
const eligibleNumbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Create arrays per box (for checking the boxed values when solving)
const box1 = ['111', '121', '131', '211', '221', '231', '311', '321', '331'];
const box2 = ['142', '152', '162', '242', '252', '262', '342', '352', '362'];
const box3 = ['173', '183', '193', '273', '283', '293', '373', '383', '393'];
const box4 = ['414', '424', '434', '514', '524', '534', '614', '624', '634'];
const box5 = ['445', '455', '465', '545', '555', '565', '645', '655', '665'];
const box6 = ['476', '486', '496', '576', '586', '596', '676', '686', '696'];
const box7 = ['717', '727', '737', '817', '827', '837', '917', '927', '937'];
const box8 = ['748', '758', '768', '848', '858', '868', '948', '958', '968'];
const box9 = ['779', '789', '799', '879', '889', '899', '979', '989', '999'];

// Determine color to highlight the helper boxes. Darker means more numbers left for that box. 0 index is null
const hexcolors = ["", "#ffffff","#E7FFBA", "#D2FF76", "#C9F374", "#B8DC70", "#B8DC6F", "#A4D146", "#A6C26E", "#A3D144"];

// Compute the node, options & array names
for (let row = 1; row <= 9; row++) {
    for (let col = 1; col <= 9; col++) {
        let box = Math.ceil(row / 3) * 3 + Math.ceil(col / 3) - 3;
        let id = `${row}${col}${box}`;
        gameNodeNames.push(`#node-${id}`);
        hintBoardNameArray.push(`#options${id}`);
        gameBoardNameArray.push(`array${id}`);
    }
}