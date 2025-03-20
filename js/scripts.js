//On page load functions
$(document).ready(function () {
    currentSudokuGame = getNewGame("medium");
    startGame();
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    // printHintArrays(hintBoardNameArray, gameBoardNameArray);
});

let activeNode = null
let notesModeActive = false

/**
 * Request {{d
 * highlightesiredDifficulty}} game
 * @param {string} desiredDifficulty - "easy", "medium", "hard" or "challenging"
 * @returns {array} Formatted sudoku puzzle
 */
const getNewGame = function(desiredDifficulty) {
    return createGame(desiredDifficulty)
}

/**
 * Populate current game into grid
 * @param {Integer} gameNumber
 * @returns {array} Array formatted sudoku puzzle
 */
function startGame() {
    for (let i = 0; i < gameNodeNames.length; i++) {
        if (currentSudokuGame.game[i] > 0) {
            const targetId = gameNodeNames[i].split('#')[1]
            const targetElem = document.getElementById(targetId)
            targetElem.classList.add('providedValue');
            targetElem.textContent = currentSudokuGame.game[i];
            toggleSnyderNotes(gameNodeNames[i], 'off')
        } else {
            toggleSnyderNotes(gameNodeNames[i], 'on')
        }
    }
}

/**
 * Clears the game board
 * @returns null
 */
function clearGameBoard() {
    document.querySelectorAll('.node > input') .forEach(element => {
        $(element).val('')
    }); 
}

/**
 * Resets hint array to all possible numbers
 * @param {Integer} gameNumber
 * @param {Integer} eligibleNumbersArray
 * @returns null
 */
function clearArrays(gameBoardNameArray, eligibleNumbersArray) {
    for (let i = 0; i < gameBoardNameArray.length; i += 1) {
        window[gameBoardNameArray[i]] = eligibleNumbersArray.slice();
    }
}

/**
 * Print contents of all of the arrays into the hint boxes
 * @param {Array} hintBoardNameArray
 * @param {Array} gameBoardNameArray
 * @param {String} callSource (hint or solve)
 * @returns null
 */
// function printHintArrays(hintBoardNameArray, gameBoardNameArray, callSource) {
//     // Count the number of answers provided. This facilitates the HINT button
//     let numbersGiven = 0;

//     if (callSource != "hint" || numbersGiven == 0) {
//         for (let i = 0; i < 81; i += 1) {
//             console.log(hintBoardNameArray)
//             const thisNodeName = hintBoardNameArray[i];

//             // The number(s) still possible for this box
//             const thisNodePossibilities = window[gameBoardNameArray[i]];

//             // Print available numbers into each **hint** box
//             $(thisNodeName).val(thisNodePossibilities);

//             // Isolate the number identifier
//             console.log(`thisNodeName: ${thisNodeName}`)
//             const nodeNumber = thisNodeName.split("#options")[1];

//             // Create targeter for the node **on the gameboard**
//             const gameBoardTarget = "#node-" + nodeNumber;

//             // If there is only 1 number left in the hint array & it is not already on the gameboard insert it onto the gameboard
//             if (thisNodePossibilities.length == 1 && $(gameBoardTarget).val() == "") {
//                 if (callSource != "hint" || numbersGiven==0) {
//                     $(gameBoardTarget).textContent = (thisNodePossibilities[0]);
//                     numbersGiven++;
//                 }
//             }

//             // Set the color of the tip field accordingly.
//             const nodeColor = hexcolors[thisNodePossibilities.length];
//             $(thisNodeName).css('background-color', nodeColor);
//         }
//     }
// }

/**
 * Determine the box number based on the row/column pair
 * @param {Integer} col
 * @param {Integer} row
 * @returns {Integer} Box containing the specified column & row
 */
function getBoxNumber(col, row) {
    let box = 0;
    
    if ( row < 4 && col < 4) {
        box = 1;
    } else if ( row < 4 && col < 7) {
        box = 2;
    } else if ( row < 4 ) {
        box = 3;
    } else if ( row < 7 && col < 4) {
        box = 4;
    } else if ( row < 7 && col < 7) {
        box = 5;
    } else if ( row < 7 ) {
        box = 6;
    } else if ( row < 10 && col < 4) {
        box = 7;
    } else if ( row < 10 && col < 7) {
        box = 8;
    } else if ( row < 10 ) {
        box = 9;
    }
    return box;
}

/**
 * Process a user guess
 * 
 * If the currently active node was provided by the puzzle, the input is ignored.
 * Otherwise, the value is processed as a guess.
 * If the guess is incorrect, the text color of that node is set to red.
 * @param {String} value - the user's guess
 */
const processGuess = function(value) {
    if (!activeNode) return
    $(`#${activeNode}`).css('color', 'black');
    let inputWrong = false
    if (value != '') {
        // Extract the node number & use the row/col to find the index in the solution array
        // const nodeNumber = target.getAttribute('data-node-number'); // row, column, box
        const nodeNumber = activeNode.split('-')[1]; // row, column, box
        const rowNumber = Number(nodeNumber[0])
        const colNumber = Number(nodeNumber[1])
        const boxNumber = Number(nodeNumber[2])
        const gameArrayPosition = (rowNumber - 1) * 9 + colNumber -1
        const expectedValue = currentSudokuGame.solution[gameArrayPosition]
        document.getElementById(activeNode).textContent = value
        if (value !== expectedValue) {
            inputWrong = true
        }
        clearSnyderNotes(colNumber, rowNumber, boxNumber, value)
    }
           
    if (inputWrong) {
        $(`#${activeNode}`).css('color', 'red');
    }
    toggleSnyderNotes(`#${activeNode}`, 'off')
}

/**
 * Clear Snyder notes of a given value for a given direction and directionId
 * @param {string} colNumber - Column identifier, 1-9
 * @param {string} rowNumber - Row identifier, 1-9
 * @param {string} boxNumber - Box identifier, 1-9
 * @param {number} value - the number to remove from the Snyder notes
 */
const clearSnyderNotes = function(colNumber, rowNumber, boxNumber, value) {
    const affectedNodes = []

    // Identify affected nodes by column
    for (let i = 1; i <= 9; i++) {
        const boxNumber = getBoxNumber(colNumber, i)
        const targetNode = `notes-node-${i}${colNumber}${boxNumber}`
        affectedNodes.push(targetNode)
    }
    
    // Identify affected nodes by column
    for (let i = 1; i <= 9; i++) {
        const boxNumber = getBoxNumber(i, rowNumber)
        const targetNode = `notes-node-${rowNumber}${i}${boxNumber}`
        if (!affectedNodes.includes(targetNode)) {
            affectedNodes.push(targetNode)
        }
    }
    
    // Identify affected nodes by box
    let startRow = getFirstRowFromBox(boxNumber)
    let startCol = getFirstColFromBox(boxNumber)

    for (let i = 0; i <= 2; i++) {
       for (let j = 0; j <= 2; j++) {
            const targetNode = `notes-node-${startRow + j}${startCol + i}${boxNumber}`
            if (!affectedNodes.includes(targetNode)) {
                affectedNodes.push(targetNode)
            }
        }
    }

    // Loop through the possibly affected nodes and clear Snyder notes of the value provided
    affectedNodes.forEach(function(node) {
        const thisNode = document.getElementById(node)
        const childDivs = thisNode.children
        const targetDiv = childDivs[value - 1]

        if (targetDiv) {
            if (targetDiv.innerHTML.trim() == value) {
                targetDiv.innerHTML = ''
            }
        }
    });
}

/**
 * Given a box number, return the first row in that box
 * @param {number} boxNumber - the box number, 1-9
 * @returns {number} - the first row number in the box, 1-9
 */
const getFirstRowFromBox = function(boxNumber) {
    let firstRow
    if (boxNumber < 4) {
        firstRow = 1
    } else if (boxNumber < 7) {
        firstRow = 4
    } else {
        firstRow = 7
    }
    return firstRow
}

/**
 * Given a box number, return the first column in that box
 * @param {number} boxNumber - the box number, 1-9
 * @returns {number} - the first column number in the box, 1-9
 */

const getFirstColFromBox = function(boxNumber) {
    let firstCol
    if (boxNumber == 1 || boxNumber == 4 || boxNumber == 7) {
        firstCol = 1
    } else if (boxNumber == 2 || boxNumber == 5 || boxNumber == 8) {
        firstCol = 4
    } else {
        firstCol = 7
    }
    return firstCol
}

/**
 * Processes a Snyder note input for the currently active node. If the active
 * node is not set, the function returns immediately. For a given value, it
 * toggles the note in the corresponding position: if the note is empty, it
 * sets the note to the value; if the note already contains the value, it
 * clears the note.
 * @param {number} value - The note value to toggle, expected to be between 1 and 9.
 */

const processSnyderNote = function(value) {
    if (!activeNode) return
    if (value != '') {
        const notes = document.querySelectorAll(`#notes-${activeNode} .note`);

        let i = 1
        notes.forEach(function(note) {
            if (i == value) {
                if (note.innerHTML.trim() === '') {
                    note.innerHTML = value;
                } else {
                    note.innerHTML = '';
                }
            }
            i += 1
        });
    }
}

/**
 * Toggle the Snyder Notes & inputs for a given node (one is off, 1 is on)
 * @param {String} inputId
 * @param {String} desiredState - "on" or "off"
 */
const toggleSnyderNotes = function(inputId, desiredState) {
    const cleanId = inputId.split('#')[1]
    const notesTarget = `notes-${cleanId}`
    if (desiredState == 'on') {
        document.getElementById(cleanId).classList.add('hide-input')
        document.getElementById(notesTarget).classList.remove('hide-notes')
    } else {
        document.getElementById(cleanId).classList.remove('hide-input')
        document.getElementById(notesTarget).classList.add('hide-notes')
    }
}

/**
 * Toggle notes mode (either notes active or input active)
 */
const toggleNotesMode = function() {
    notesModeActive = !notesModeActive

    const grid = document.getElementById('grid')
    if (notesModeActive) {
        grid.classList.add('notes-mode')
    } else {
        grid.classList.remove('notes-mode')
    }
}

/**
 * Processes a value from the user. If the currently active node was
 * provided by the puzzle, the input is ignored. If the game is in notes mode, 
 * the value is processed as a snyder note. Otherwise, the value is processed as
 * a guess.
 * @param {String} value - the value from the user
 */
const processNumberInput = function(value) {
    const activeNodeElem = document.getElementById(activeNode)
    if (activeNodeElem.classList.contains('providedValue')) return
    if (notesModeActive) {
        processSnyderNote(value)
    } else {
        processGuess(value)
    }
}


/**
 * Highlights the currently active node on the board, as well as all other nodes 
 * that contain the same value. Additionally, highlights the row, column, and box
 * associated with the active node in a different color.
 */
const highlightBoard = function() {
    removeHighlighting()
    const activeValue = document.getElementById(activeNode).innerHTML

    // If the active node has a value, highlight all other instances of that value on the board
    if (activeValue !== '') {
        for (let i = 0; i < gameNodeNames.length; i++) {
            const nodeBeingChecked = gameNodeNames[i].split('#')[1]
            const thisValue = document.getElementById(nodeBeingChecked).innerHTML
            if (thisValue == activeValue) {
                document.getElementById(nodeBeingChecked).style.backgroundColor = '#5ec19f';
                document.getElementById(nodeBeingChecked).parentElement.style.backgroundColor = '#5ec19f';
            }
        }
    }
    const nodeNumber = activeNode.split('-')[1];
    // Isolate the digits to determine the row/col/box
    const row = nodeNumber.toString().slice(0,1);
    const col = nodeNumber.toString().slice(1,2);
    const box = nodeNumber.toString().slice(2);

    // Highlight associated row
    const rowTargetElements = document.querySelectorAll(`.r${row}`);
    rowTargetElements.forEach((row) => {
        row.style.backgroundColor = "aquamarine";
        row.parentElement.style.backgroundColor = 'aquamarine';
        // Get all siblings and apply the same CSS
        Array.from(row.parentElement.children).forEach((sibling) => {
            if (sibling !== row) {
                sibling.style.backgroundColor = "aquamarine";

            }
        });
    });
    
    // Highlight associated column
    const colTargetElements = document.querySelectorAll(`.c${col}`);
    colTargetElements.forEach((col) => {
        col.style.backgroundColor = "aquamarine";
        col.parentElement.style.backgroundColor = 'aquamarine';
        // Get all siblings and apply the same CSS
        Array.from(col.parentElement.children).forEach((sibling) => {
            if (sibling !== col) {
                sibling.style.backgroundColor = "aquamarine";
            }
        });
    });

    // Highlight associated box
    const boxTargetElements = document.querySelectorAll(`.b${box}`);
    boxTargetElements.forEach((box) => {
        box.style.backgroundColor = "aquamarine";
        box.parentElement.style.backgroundColor = 'aquamarine';
        // Get all siblings and apply the same CSS
        Array.from(box.parentElement.children).forEach((sibling) => {
            if (sibling !== box) {
                sibling.style.backgroundColor = "aquamarine";
            }
        });
    });

    //Highlight the active node in a different color
    document.getElementById(activeNode).style.backgroundColor = '#ffe15a';
    document.getElementById(activeNode).parentElement.style.backgroundColor = '#ffe15a';

}
const removeHighlighting = function() {
    // Remove Highlight from all nodes
    $(".gb-input").each(function() {
        $(this).css("background-color", "white");
    })
    $(".notes").each(function() {
        $(this).css("background-color", "white");
    })
    $(".node").each(function() {
        $(this).css("background-color", "white");
    })
}
