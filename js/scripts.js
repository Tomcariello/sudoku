//On page load functions
$(document).ready(function () {
    $(".node").forceNumeric();
    currentSudokuGame = getNewGame("easy");
    startGame();
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printArrays(hintBoardNameArray, gameBoardNameArray);
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

// Prevent user from entering invalid characters in the sudoku game grid
jQuery.fn.forceNumeric = function () {
    return this.each(function () {
        $(this).keydown(function (e) {
            const key = e.which || e.keyCode;

            if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
                // numbers
                key >= 48 && key <= 57 ||
                // Numeric keypad
                key >= 96 && key <= 105 ||
                // comma, period and minus, . on keypad
                key == 190 || key == 188 || key == 109 || key == 110 ||
                // Backspace and Tab and Enter
                key == 8 || key == 9 || key == 13 ||
                // Home and End
                key == 35 || key == 36 ||
                // left and right arrows
                key == 37 || key == 39 ||
                // Del and Ins
                key == 46 || key == 45)
                return true;

            return false;
        });
    });
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

            $(gameNodeNames[i]).val(currentSudokuGame.game[i]);
            toggleSnyderNotes(gameNodeNames[i], 'off')
        } else {
            $(gameNodeNames[i]).val("");
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
function printArrays(hintBoardNameArray, gameBoardNameArray, callSource) {
    // Count the number of answers provided. This facilitates the HINT button
    let numbersGiven = 0;

    if (callSource != "hint" || numbersGiven == 0) {
        for (let i = 0; i < 81; i += 1) {
            const thisNodeName = hintBoardNameArray[i];

            // The number(s) still possible for this box
            const thisNodePossibilities = window[gameBoardNameArray[i]];

            // Print available numbers into each **hint** box
            $(thisNodeName).val(thisNodePossibilities);

            // Isolate the number identifier
            const nodeNumber = thisNodeName.split("#options")[1];

            // Create targeter for the node **on the gameboard**
            const gameBoardTarget = "#node-" + nodeNumber;

            // If there is only 1 number left in the hint array & it is not already on the gameboard insert it onto the gameboard
            if (thisNodePossibilities.length == 1 && $(gameBoardTarget).val() == "") {
                if (callSource != "hint" || numbersGiven==0) {
                    $(gameBoardTarget).val(thisNodePossibilities[0]);
                    numbersGiven++;
                }
            }

            // Set the color of the tip field accordingly.
            const nodeColor = hexcolors[thisNodePossibilities.length];
            $(thisNodeName).css('background-color', nodeColor);
        }
    }
}

/**
 * Determine the box number based on the row/column pair
 * @param {Integer} col
 * @param {Integer} row
 * @returns {Integer} Box containing the specified column & row
 */
function getBoxNumber(col, row) {
    var box = 0;
    
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

/* Add listeners for game node inputs */
// const inputs = document.querySelectorAll('.gb-input');

// inputs.forEach(input => {
//     input.addEventListener('input', function(event) {
//         processGuess(event)
//     });
// });

/* Add listeners for game node inputs */
const inputs = document.querySelectorAll('[id^="node-div-"]');


// Listen for clicks on a node to set that node ACTIVE
inputs.forEach(input => {
    input.addEventListener('click',(event) => {
        if (event?.target?.id) {
            activeNode = event.target.id;
        } else {
            const parentId = event.target.parentElement.id;
            activeNode = parentId.split('notes-')[1]
        }
        highlightBoard()
    },
    );
});

const processGuess = function(value) {
    $(`#${activeNode}`).css('color', 'black');
    let inputWrong = false
    if (value != '') {
        // Extract the node number & use the row/col to find the index in the solution array
        console.log(`activeNode is ${activeNode}`)
        // const nodeNumber = target.getAttribute('data-node-number'); // row, column, box
        const nodeNumber = activeNode.split('-')[1]; // row, column, box
        const rowNumber = Number(nodeNumber[0])
        const colNumber = Number(nodeNumber[1])
        const gameArrayPosition = (rowNumber - 1) * 9 + colNumber -1
        const expectedValue = currentSudokuGame.solution[gameArrayPosition]
        document.getElementById(activeNode).value = value
        if (value !== expectedValue) {
            inputWrong = true
        }
    }
           
    if (inputWrong) {
        $(`#${activeNode}`).css('color', 'red');
    }
    toggleSnyderNotes(`#${activeNode}`, 'off')
}


const processSnyderNote = function(value) {
    if (value != '') {
        console.log(`notesNode is notes-${activeNode}`)
        const parent = document.getElementById(`notes-${activeNode}`);
        const noteDiv = parent.children[value - 1]; 

        if (noteDiv) {
            if (noteDiv.textContent === '') {
                noteDiv.textContent = value;
            } else {
                noteDiv.textContent = '';
            }
        }
    }
}

/**
 * Toggle the Snyder Notes & inputs (one is off, 1 is on)
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

const processKeypadInput = function(value) {
    if (notesModeActive) {
        processSnyderNote(value)
    } else {
        processGuess(value)
    }
}

// Highlight nodes associated with activeNode
const highlightBoard = function() {
    removeHighlighting()
    const hoverValue = document.getElementById(activeNode).value
    console.log(hoverValue)
    if (hoverValue !== '') {
        for (let i = 0; i < gameNodeNames.length; i++) {
            const thisValue = $(gameNodeNames[i]).val()
            if (thisValue == hoverValue) {
                $( gameNodeNames[i] ).css("background-color", "aquamarine");
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
        // Get all siblings and apply the same CSS
        Array.from(box.parentElement.children).forEach((sibling) => {
            if (sibling !== box) {
                sibling.style.backgroundColor = "aquamarine";
            }
        });
    });

}
const removeHighlighting = function() {
    // Remove Highlight from all nodes
    $(".gb-input").each(function() {
        $(this).css("background-color", "white");
    })
    $(".notes").each(function() {
        $(this).css("background-color", "white");
    })
}
