//On page load functions
$(document).ready(function () {
    $(".node").forceNumeric();
    currentSudokuGame = getNewGame("easy");
    startGame();
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printArrays(hintBoardNameArray, gameBoardNameArray);
});

let currentSudokuGame = {}
const gameNodeNames = []; // IDs for each of the squares on the gameboard
const gameBoardNameArray = []; // Names of the arrays associated with each game board node
const hintBoardNameArray = []; // Names of the arrays associated with each hint board node
const eligibleNumbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

/**
 * Request {{desiredDifficulty}} game
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
            $(gameNodeNames[i]).val(currentSudokuGame.game[i]);
        } else {
            $(gameNodeNames[i]).val("");
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
        // Iterate through each box
        for (let i = 0; i < 81; i += 1) {
            // The box being processed
            const thisNodeName = hintBoardNameArray[i];

            // The numbers still possible for this box
            const thisNodePossibilities = window[gameBoardNameArray[i]];

            // Print available numbers into each **hint** box
            $(thisNodeName).val(thisNodePossibilities);

            // Isolate on the number identifier
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

function solve(source) {
    // Take a snapshot of hint arrays before running procedure. This will be checked to know if anything changed
    let startingSnapshot;
    const joinedStartingArrays = [];
    for (let i = 0; i < gameBoardNameArray.length; i++) {
        let element = document.querySelector(gameBoardNameArray[i]);
        if (element) {
            joinedStartingArrays = joinedStartingArrays.concat(element.innerText || element.value || element.dataset.someValue);
        }
        // joinedStartingArrays = joinedStartingArrays.concat(eval(gameBoardNameArray[i]));
    }
    startingSnapshot = JSON.stringify(joinedStartingArrays);

    // Check each node of the Gameboard for a value and process associated fields accordingly
    for (let i = 0; i < gameNodeNames.length; i += 1) {

        // Store current value to process
        const thisNodeValue = parseInt($(String(gameNodeNames[i])).val());

        // Level 1 Analysis: Proces all finalized numbers for each blank squares & show user user(JQuery)
        // If value is found in the Gameboard node, proceed:
        if (thisNodeValue > 0) {

            // Determine ROW/COLUMN/SQUARE to process horizontally
            const currentNodeNumber = gameNodeNames[i].slice(-3); //obtain nodename (3 digits)
            const currentNodeRow = currentNodeNumber.slice(0, 1); //obtain ROW
            const currentNodeColumn = currentNodeNumber.slice(1, 2); //obtain COL
            
            /*
            /* This will update the "hint" section to match the game board. This syncs the pre-loaded values
            /* and the values entered by the player. Anything on the gameboard is treated as correct.
            */

            // Target the node being processed (which already has a value entered)
            const gameBoardTarget = "#options" + currentNodeNumber;

            // Enter the value in the "hint" section
            $(gameBoardTarget).val(thisNodeValue);

            // Target gameboard array for the current node
            const thisNodeArray = eval("array" + currentNodeNumber);

            // Remove invalid numbers from the current node
            for (j = 9; j > 0; j--) {
                if (j != thisNodeValue) {
                    const toRemove = thisNodeArray.indexOf(j)
                    if (toRemove > -1) {
                        thisNodeArray.splice(toRemove, 1);
                    }
                }
            }

            // Process Node Horizontally
            for (let x = 1; x < 10; x++) {
                if (x != currentNodeColumn) {
                    const nodeToUpdate = gameNodeNames[(currentNodeRow - 1) * 9 - 1 + x].slice(-3);
                    const arrayToLookup = eval("array" + nodeToUpdate);
                    const splicePosition = $.inArray(thisNodeValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }
            
            // Process Node Vertically
            for (let x = 1; x < 10; x++) {
                if (x != currentNodeRow) {
                    const nodeToUpdate = gameNodeNames[(currentNodeColumn - 1) + 9 * (x - 1)].slice(-3);
                    const arrayToLookup = eval("array" + nodeToUpdate);
                    const splicePosition = $.inArray(thisNodeValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }

            // Process Blocks
            const currentBlock = currentNodeNumber.slice(2); 
            for (let x = 0; x < 9; x++) {
                const blockArrayToLookup = eval("box" + currentBlock);

                if (blockArrayToLookup[x] != currentNodeNumber) {
                    const nodeToUpdate = gameNodeNames[i].slice(-3);
                    const arrayToLookup = eval("array" + blockArrayToLookup[x]);
                    const splicePosition = $.inArray(thisNodeValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }
        }
    }

    // Level 2 Analysis: Process 2 digit arrays & process numbers of duplicated arrays
    
    // Get all nodes from gameboard
    const allOptions = $("input[id^='options']");

    $.each(allOptions, function( key, value) {
        // Store the current node number to process
        const numberToProcess = allOptions[key].id.split('options')[1];
        const firstArrToCheckLabel = "array" + numberToProcess;

        const thisNodeArray = eval(firstArrToCheckLabel);
        
        // Is this array a length of 2? If so, proceed, if not check the next node
        if (thisNodeArray.length == 2) {

            // Isolate the row & Col & Box numbers
            const thisRow = numberToProcess.toString().slice(0,1);
            const thisCol = numberToProcess.toString().slice(1,2);
            const thisBox = numberToProcess.toString().slice(2,3);

            // Flatten the current node array
            const nodeSourceArrayFlat = JSON.stringify(thisNodeArray);

            // Process Node Horizontally for Level 2 analysis
            // Check this node against the rest of the nodes in this row (moving forward) by incremeneting the col digit
            for (let p = parseInt(thisCol) + 1; p < 10; p++) {
                // Get the associated box number for this row/col pair
                const lookupBox = getBoxNumber(p, parseInt(thisRow));

                // Determine next node to check
                const ArrToCheckLabel = "array" + thisRow + p + lookupBox;
                const arrToCheck = eval(ArrToCheckLabel);
                
                // If the array to check is also length == 2, compare the arrays
                if (arrToCheck.length == 2) {
                    const flatArrToCheck = JSON.stringify(arrToCheck);

                    // If the arrays match, the 2 digits in the array should be eliminated from all other nodes in this row
                    if (flatArrToCheck == nodeSourceArrayFlat) {
                        // Store numbers of arrays that match. These will not be processed
                        const firstArrCol = thisCol;
                        const secondArrCol = p;

                        // Another for loop...
                        for (let col = 1; col< 10; col++) {
                            // Proceed if the current column number is not one of the 2 arrays that matched
                            if (col != firstArrCol && col != secondArrCol ) {
                                const boxToLookup = getBoxNumber(col, parseInt(thisRow));

                                // Determine next node to check
                                const arrayToLookup = "array" + thisRow + col + boxToLookup;
                                const arrToCheckAgainstPair = eval(arrayToLookup);

                                // Loop through the array to be compared to the matching pair
                                for (let j = 0; j < arrToCheckAgainstPair.length; j++) {
                                    // For each entry in the array being checked, compare with both numbers in the 2 digit array pair
                                    for (let l = 0; l < arrToCheck.length; l++) {
                                        const indexToRemove = arrToCheckAgainstPair.indexOf(arrToCheck[l]);

                                        if (indexToRemove > -1) {
                                            arrToCheckAgainstPair.splice(indexToRemove, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Process Node Vertically for Level 2 analysis

            // Check this node against the rest of the nodes in this column (moving down) by incremeneting the row digit
            // Identify all of the boxes associated with the node being checked
            for (let i = parseInt(thisRow) + 1; i < 10; i++) {
                // Get the associated box number for this row/col pair
                const lookupBox = getBoxNumber( parseInt(thisCol), i );

                // Determine next node to check
                const levelTwoVertArrLabel = "array" + i + thisCol + lookupBox;
                const levelTwoVertArr = eval(levelTwoVertArrLabel);
                
                // If the array to check is also length == 2, compare the arrays
                if (levelTwoVertArr.length == 2) {
                    const levelTwoVertFlatArrToCheck = JSON.stringify(levelTwoVertArr);

                    // If the arrays match, the 2 digits in the array should be eliminated from all other nodes in this column
                    if (levelTwoVertFlatArrToCheck == nodeSourceArrayFlat) {
                        // Store numbers of arrays that match. These will not be processed
                        const secondArrRow = i;

                        // Another for loop...
                        for (let row = 1; row < 10; row ++) {
                            // Proceed if the current row number is not one of the 2 arrays that matched
                            if (row != thisRow && row != secondArrRow ) {

                                const boxToLookup = getBoxNumber( parseInt(thisCol), row );

                                // Determine next node to check
                                const arrayToLookup = "array" + row + thisCol + boxToLookup;
                                
                                const arrToCheckAgainstPair = eval(arrayToLookup);

                                // Loop through the array to be compared to the matching pair
                                for (let j = 0; j < arrToCheckAgainstPair.length; j++) {

                                    // For each entry in the array being checked, compare with both numbers in the 2 digit array pair
                                    for (let l = 0; l < levelTwoVertArr.length; l++) {
                                        const indexToRemove = arrToCheckAgainstPair.indexOf(levelTwoVertArr[l]);

                                        if (indexToRemove > -1) {
                                            arrToCheckAgainstPair.splice(indexToRemove, 1);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Process Node Box for Level 2 analysis
            const allAssociatedBoxes = $("input[id^='options'][id$='" + thisBox + "']"); // starts with 'options', ends with box number
            
            // Iterate through each of the box nodes
            $.each(allAssociatedBoxes, function (k, v) {
                const thisId = this.id;

                // Iterate through these boxes, skipping **numberToProcess**, looking for a matching array with a length of 2
                if (thisId.slice(7) != numberToProcess) {
                    // Store value of the *parent* node being checked
                    const parentArrLabel = "array" + numberToProcess;
                    const parentArrToCheck = eval(parentArrLabel);

                    const childArrLabel = "array" + thisId.slice(7);
                    const childArrToCheck = eval(childArrLabel);

                    // Only process *other* arrays when the childArrToCheck.length = 2
                    if (thisId.slice(7) != numberToProcess && childArrToCheck.length == 2) {

                        const parentArrFlat = JSON.stringify(parentArrToCheck);
                        const arrToCheckFlat = JSON.stringify(childArrToCheck);

                        // If the arrays match, the 2 digits in the arrays should be eliminated from all *other* nodes in this column
                        if (parentArrFlat == arrToCheckFlat) {

                            // Loop through the boxes to process these values
                            $.each(allAssociatedBoxes, function (subkey, subvalue) {
                                // Only proceed for boxes that are not among the matching arrays
                                if (this.id.slice(7) != numberToProcess && this.id.slice(7) != thisId.slice(7)) {

                                    // Determine next node to check
                                    const arrayToProcessLabel = "array" + this.id.slice(7);
                                    const arrayToProcess = eval(arrayToProcessLabel);

                                    // Loop through the array to process
                                    for (let m = 0; m < arrayToProcess.length; m++) {

                                        // For each entry in the array being processed, compare with both numbers in the 2 digit array pair
                                        for (let n = 0; n < parentArrToCheck.length; n++) {
                                            const indexForRemoval = arrayToProcess.indexOf(parentArrToCheck[n]);

                                            if (indexForRemoval > -1) {
                                                arrayToProcess.splice(indexForRemoval, 1);
                                            }
                                        }
                                    }

                                }
                            })
                        }

                    }
                }
            })
        }
    });

    printArrays(hintBoardNameArray, gameBoardNameArray, source);

    // Has anything changed?
    let endingSnapshot;
    let joinedEndingArrays = [];
    for (let i = 0; i < gameBoardNameArray.length; i++) {
        joinedEndingArrays = joinedEndingArrays.concat(eval(gameBoardNameArray[i]));
    }
    endingSnapshot = JSON.stringify(joinedEndingArrays);

    // If anything has changed and we're trying to solve, call recursively
    if ( startingSnapshot != endingSnapshot && source !="hint") {
        solve();
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
const inputs = document.querySelectorAll('.gb-input');

inputs.forEach(input => {
    input.addEventListener('input', function(event) {
        checkValueEntered(event)
    });
});

const checkValueEntered = function(event) {
    const inputId = `#${event.target.id}`
    $(inputId).css('color', 'black');
    let inputWrong = false
    const enteredValue = Number(event.target.value)
    if (enteredValue != '') {
        // Extract the node number & use the row/col to find the index in the solution array
        const nodeNumber = event.target.getAttribute('data-node-number');
        const rowNumber = Number(nodeNumber[0])
        const colNumber = Number(nodeNumber[1])
        const gameArrayPosition = (rowNumber -1) * 9 + colNumber -1
        const expectedValue = currentSudokuGame.solution[gameArrayPosition]

        if (enteredValue !== expectedValue) {
            inputWrong = true
        }
    }
           
    if (inputWrong) {
        $(inputId).css('color', 'red');
    }
}
/* Handle button clicks */
$("#clear").click(function () {
    clearGameBoard(gameNodeNames);
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printArrays(hintBoardNameArray, gameBoardNameArray);
})

$("#reset").click(function () {
    const currentGame = $("#reset").data("game-number");
    startGame(currentGame);
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printArrays(hintBoardNameArray, gameBoardNameArray);
})

$("#new").click(function () {
    currentSudokuGame = getNewGame("medium")
    startGame();
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printArrays(hintBoardNameArray, gameBoardNameArray);
})

$("#hint").click(function () {
    solve("hint");
})

$("#solve").click(function () {
    solve();
})

$("#close-button").click(function () {
    $( ".hint-container").css("display", "none");
})

$("#expain-hints").click(function () {
    $( ".hint-container").css("display", "inherit");
})

/* Handle UI Highlighting */
// Highlight gameboard node when hovering over corresponding hint node
$(".hint-div").hover( function() {
        const nodeNumber = $(this).data("node-number");
        const target = "div > input[id='node-" + nodeNumber + "']";
        $( target ).css("background-color", "yellow");
    }, function() {
        const nodeNumber = $(this).data("node-number");
        const target = "div > input[id='node-" + nodeNumber + "']";
        $( target ).css("background-color", "white");
})

// Highlight associated gameboard nodes when hovering gameboard
$(".gb-input").hover( function() {
    console.log('hover')
    const nodeNumber = $(this).data("node-number");
    const mainTarget = "#node-" + nodeNumber;
    const hoverValue = $(mainTarget).val() 
    
    if (hoverValue !== '') {
        // Highlight the value being hovered anywhere in the board
        for (let i = 0; i < gameNodeNames.length; i++) {
            const thisValue = $(gameNodeNames[i]).val()
            if (thisValue == hoverValue) {
                $( gameNodeNames[i] ).css("background-color", "aquamarine");
            }
        }
    }

    // Isolate the digits to determine the row/col/box
    const row = nodeNumber.toString().slice(0,1);
    const col = nodeNumber.toString().slice(1,2);
    const box = nodeNumber.toString().slice(2);

    // Highlight associated row
    const rowTarget = ".r" + row;
    $(rowTarget).each(function() {
        $(this).css("background-color", "aquamarine");
    })

    // Highlight associated col
    const colTarget = ".c" + col;
    $(colTarget).each(function() {
        $(this).css("background-color", "aquamarine");
    })
    // Highlight associated box
    const boxTarget = ".b" + box;
    $(boxTarget).each(function() {
        $(this).css("background-color", "aquamarine");
    })
}, function() {
    // Remove Highlight from all nodes
    $(".gb-input").each(function() {
        $(this).css("background-color", "white");
    })
})