//On page load functions
$(document).ready(function () {
    $(".node").forceNumeric();
    startGame();
    clearArrays(arrayNames, arrayValues);
    printArrays(optionNames, arrayNames);
    // colorArrays(nodeNames);
});

//Variable Declarations
// IDs for each of the squares on the gameboard
var nodeNames = ['#node-111', '#node-121', '#node-131', '#node-142', '#node-152', '#node-162', '#node-173', '#node-183', '#node-193', '#node-211', '#node-221', '#node-231', '#node-242', '#node-252', '#node-262', '#node-273', '#node-283', '#node-293', '#node-311', '#node-321', '#node-331', '#node-342', '#node-352', '#node-362', '#node-373', '#node-383', '#node-393', '#node-414', '#node-424', '#node-434', '#node-445', '#node-455', '#node-465', '#node-476', '#node-486', '#node-496', '#node-514', '#node-524', '#node-534', '#node-545', '#node-555', '#node-565', '#node-576', '#node-586', '#node-596', '#node-614', '#node-624', '#node-634', '#node-645', '#node-655', '#node-665', '#node-676', '#node-686', '#node-696', '#node-717', '#node-727', '#node-737', '#node-748', '#node-758', '#node-768', '#node-779', '#node-789', '#node-799', '#node-817', '#node-827', '#node-837', '#node-848', '#node-858', '#node-868', '#node-879', '#node-889', '#node-899', '#node-917', '#node-927', '#node-937', '#node-948', '#node-958', '#node-968', '#node-979', '#node-989', '#node-999',];

// IDs for each input on the bottom display
var optionNames = ['#options111', '#options121', '#options131', '#options142', '#options152', '#options162', '#options173', '#options183', '#options193', '#options211', '#options221', '#options231', '#options242', '#options252', '#options262', '#options273', '#options283', '#options293', '#options311', '#options321', '#options331', '#options342', '#options352', '#options362', '#options373', '#options383', '#options393', '#options414', '#options424', '#options434', '#options445', '#options455', '#options465', '#options476', '#options486', '#options496', '#options514', '#options524', '#options534', '#options545', '#options555', '#options565', '#options576', '#options586', '#options596', '#options614', '#options624', '#options634', '#options645', '#options655', '#options665', '#options676', '#options686', '#options696', '#options717', '#options727', '#options737', '#options748', '#options758', '#options768', '#options779', '#options789', '#options799', '#options817', '#options827', '#options837', '#options848', '#options858', '#options868', '#options879', '#options889', '#options899', '#options917', '#options927', '#options937', '#options948', '#options958', '#options968', '#options979', '#options989', '#options999'];

// Determine color to highlight the helper boxes. Darker means more numbers left for that box. 0 index is null
var hexcolors = ["", "#ffffff","#E7FFBA", "#D2FF76", "#C9F374", "#B8DC70", "#B8DC6F", "#A4D146", "#A6C26E", "#A3D144"];

// Create arrays per box (for checking the boxed values when solving)
var box1 = ['111', '121', '131', '211', '221', '231', '311', '321', '331'];
var box2 = ['142', '152', '162', '242', '252', '262', '342', '352', '362'];
var box3 = ['173', '183', '193', '273', '283', '293', '373', '383', '393'];
var box4 = ['414', '424', '434', '514', '524', '534', '614', '624', '634'];
var box5 = ['445', '455', '465', '545', '555', '565', '645', '655', '665'];
var box6 = ['476', '486', '496', '576', '586', '596', '676', '686', '696'];
var box7 = ['717', '727', '737', '817', '827', '837', '917', '927', '937'];
var box8 = ['748', '758', '768', '848', '858', '868', '948', '958', '968'];
var box9 = ['779', '789', '799', '879', '889', '899', '979', '989', '999'];

// This will be used to track if the system adjusted the gameboard based on the computation
//var confirmedValueThisRound = false;

var arrayNames = ['array111', 'array121', 'array131', 'array142', 'array152', 'array162', 'array173', 'array183', 'array193', 'array211', 'array221', 'array231', 'array242', 'array252', 'array262', 'array273', 'array283', 'array293', 'array311', 'array321', 'array331', 'array342', 'array352', 'array362', 'array373', 'array383', 'array393', 'array414', 'array424', 'array434', 'array445', 'array455', 'array465', 'array476', 'array486', 'array496', 'array514', 'array524', 'array534', 'array545', 'array555', 'array565', 'array576', 'array586', 'array596', 'array614', 'array624', 'array634', 'array645', 'array655', 'array665', 'array676', 'array686', 'array696', 'array717', 'array727', 'array737', 'array748', 'array758', 'array768', 'array779', 'array789', 'array799', 'array817', 'array827', 'array837', 'array848', 'array858', 'array868', 'array879', 'array889', 'array899', 'array917', 'array927', 'array937', 'array948', 'array958', 'array968', 'array979', 'array989', 'array999'];
var arrayValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Save games for pre-loading
var game = [
    [5,0,0,1,0,0,0,0,0,0,9,6,0,0,0,8,2,0,0,0,0,0,0,7,0,0,9,0,0,0,0,0,3,0,0,6,0,7,4,0,0,0,9,1,0,2,0,0,5,0,0,0,0,0,7,0,0,6,0,0,0,0,0,0,8,3,0,0,0,5,7,0,0,0,0,0,0,4,0,0,1],
    [7,6,3,0,0,5,0,0,9,0,1,5,0,0,2,3,7,0,9,2,8,0,0,4,0,0,1,0,0,0,5,3,0,9,8,0,0,3,0,6,0,9,2,5,0,0,0,9,0,2,0,0,1,0,0,0,0,2,1,0,7,4,0,0,5,0,4,0,0,0,3,0,0,8,0,0,5,3,1,0,0], // easy
    [0,0,0,9,0,0,4,2,7,2,4,0,0,8,7,9,0,5,0,9,1,2,0,0,0,0,0,0,0,0,7,2,0,3,4,0,0,0,0,0,4,0,0,0,1,3,0,0,0,0,0,0,0,0,0,8,6,4,7,0,0,0,0,0,0,0,0,0,2,5,0,0,0,1,0,0,3,8,0,6,0], // medium
    [2,0,4,0,0,0,0,0,0,0,0,0,0,0,4,5,9,1,0,1,0,5,0,6,0,0,2,0,7,0,0,0,0,0,0,0,1,0,0,0,0,0,8,5,0,0,0,0,0,9,1,0,7,0,0,4,5,0,0,0,0,0,7,0,0,6,8,0,0,0,0,4,0,0,0,0,3,0,0,2,0], //hard
    [0,4,0,8,0,0,0,0,6,0,0,1,0,0,6,0,0,3,0,0,6,3,0,9,8,0,0,2,5,0,6,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,8,7,0,0,0,0,4,0,0,0,0,0,9,0,7,0,0,0,0,0,0,0,4,0,1,0,0,0,0,0,0,2,0,0,5], // expert
];


// Prevent user from entering invalid characters in the sudoku game grid
jQuery.fn.forceNumeric = function () {

    return this.each(function () {
        $(this).keydown(function (e) {
            var key = e.which || e.keyCode;

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

//Set default grid values (onload & reset)
function startGame() {
    for (var i = 0; i < nodeNames.length; i++) {
        // Enter values greater than 0
        if (game[3][i] > 0) {
            $(nodeNames[i]).val(game[3][i]);
        } else {
            // Clear the node
            $(nodeNames[i]).val("");
        }
        
    }
}

//Set all nodes to blank
function clearGame(nodeNames) {
    for (var i = 0; i < 82; i += 1) {
        $(String(nodeNames[i])).val("");
    }
}

//Set all array values to the default 1-9
function clearArrays(arrayNames, arrayValues) {
    for (var i = 0; i < arrayNames.length; i += 1) {
        window[arrayNames[i]] = arrayValues.slice();
    }
}

//Print contents of all of the arrays into the boxes
function printArrays(optionNames, arrayNames) {
    // Iterate through each box
    for (var i = 0; i < 81; i += 1) {
        // The box being processed
        var targetInput = optionNames[i];

        // The numbers still possible for this box
        var availableNumbers = window[arrayNames[i]];

        // Print available numbers into each hint box
        $(targetInput).val(availableNumbers);

        // If there is only 1 number in the hint box, move it into the gameboard
        if (availableNumbers.length == 1) {
            
            // Isolate on the number
            var nodeNumber = targetInput.split("#options")[1];

            // Create targeter to update the gameboard
            var gameBoardTarget = "#node-" + nodeNumber;

            // Update the gameboard
            $(gameBoardTarget).val(availableNumbers[0]);
        }

        // Set the color of the tip field accordingly.
        var nodeColor = hexcolors[availableNumbers.length];
        $(targetInput).css('background-color', nodeColor);
    }
}

//assign color to grid if value in node
// function colorArrays(nodeNames) {
//     for (var i = 0; i < nodeNames.length; i += 1) {
//         if (parseInt(String($(String(nodeNames[i])).val())) > 0) {
//             $(nodeNames[i]).addClass("preset_value");
//             $(nodeNames[i]).parent().addClass("preset_value");
//         } else { 
//             $(nodeNames[i]).removeClass("preset_value"); 
//             $(nodeNames[i]).parent().removeClass("preset_value"); 
//         }
//     }
// }

//onclick of clear button
$("#clear").click(function () {
    clearGame(nodeNames);
    clearArrays(arrayNames, arrayValues);
    printArrays(optionNames, arrayNames);
    // colorArrays(nodeNames);
})

//onclick of Reset button
$("#reset").click(function () {
    startGame();
    clearArrays(arrayNames, arrayValues);
    printArrays(optionNames, arrayNames);
    // colorArrays(nodeNames);
})

//onclick of solve button 
$("#solve").click(function () {
    solve();
})

//onclick of modal close button 
$("#close-button").click(function () {
    // Close the hint modal
    $( ".hint-container").css("display", "none");
})

//onclick of explain hints button 
$("#expain-hints").click(function () {
    // Show the hint modal
    $( ".hint-container").css("display", "inherit");
})




function solve() {
    // Check each node of the Gameboard for a value and process associated fields accordingly
    for (var i = 0; i < nodeNames.length; i += 1) {

        // Store current value to process
        var thisNodeValue = parseInt($(String(nodeNames[i])).val());

        // Level 1 Analysis: Proces all finalized numbers for each blank squares & show user user(JQuery)
        // If value is found in the Gameboard node, proceed:
        if (thisNodeValue > 0) {

            // Determine ROW/COLUMN/SQUARE to process horizontally
            var currentNodeNumber = nodeNames[i].slice(-3); //obtain nodename (3 digits)
            var currentNodeRow = currentNodeNumber.slice(0, 1); //obtain ROW
            var currentNodeColumn = currentNodeNumber.slice(1, 2); //obtain COL
            
            /*
            /* This will update the "hint" section to match the game board. This syncs the pre-loaded values
            /* and the values entered by the player. Anything on the gameboard is treated as correct.
            */

            // Target the node being processed (which already has a value entered)
            var gameBoardTarget = "#options" + currentNodeNumber;

            // Enter that value in the "hint" section
            $(gameBoardTarget).val(thisNodeValue);

            // Target array for the current node
            var thisNodeArray = eval("array" + currentNodeNumber);

            // Remove invalid numbers from the current node
            for (j = 9; j > 0; j--) {
                if (j != thisNodeValue) {
                    var toRemove = thisNodeArray.indexOf(j)
                    if (toRemove > -1) {
                        thisNodeArray.splice(toRemove, 1);
                    }
                }
            }

            /*
            /* End of Gameboard to hint section sync procedure
            */

            /*
            /* Process Node Horizontally
            */

            for (var x = 1; x < 10; x++) {
                if (x != currentNodeColumn) {
                    var nodeToUpdate = nodeNames[(currentNodeRow - 1) * 9 - 1 + x].slice(-3);
                    var arrayToLookup = eval("array" + nodeToUpdate);
                    var splicePosition = $.inArray(thisNodeValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }

            /*
            /* End Process Node Horizontally
            */

            /*
            /* Process Node Vertically
            */
            for (var x = 1; x < 10; x++) {
                if (x != currentNodeRow) {
                    var nodeToUpdate = nodeNames[(currentNodeColumn - 1) + 9 * (x - 1)].slice(-3);
                    var arrayToLookup = eval("array" + nodeToUpdate);
                    var splicePosition = $.inArray(thisNodeValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }
            /*
            /* End Process Node Vertically
            */

            /*
            /* Process Boxes
            */

            //Determine ROW/COLUMN/SQUARE to process
            var currentSquare = currentNodeNumber.slice(2); //obtain SQUARE

            //Process Boxes
            for (var x = 0; x < 9; x++) {
                var boxArrayToLookup = eval("box" + currentSquare);

                if (boxArrayToLookup[x] != currentNodeNumber) {
                    var nodeToUpdate = nodeNames[i].slice(-3);
                    var arrayToLookup = eval("array" + boxArrayToLookup[x]);
                    var splicePosition = $.inArray(thisNodeValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }
        }
    }

    // Level 2 Analysis: Process 2 digit arrays & process numbers of duplicated arrays
    
    // Get all nodes from gameboard
    var allOptions = $("input[id^='options']");

    $.each(allOptions, function( key, value) {
        // Store the current node number to process
        var numberToProcess = allOptions[key].id.split('options')[1];
        var firstArrToCheckLabel = "array" + numberToProcess;

        var thisNodeArray = eval(firstArrToCheckLabel);
        
        // Is this array a length of 2? If so, proceed, if not check the next node
        if (thisNodeArray.length == 2) {

            // Isolate the row & Col & Box numbers
            var thisRow = numberToProcess.toString().slice(0,1);
            var thisCol = numberToProcess.toString().slice(1,2);
            var thisBox = numberToProcess.toString().slice(2,3);

            // Flatten the current node array
            var nodeSourceArrayFlat = JSON.stringify(thisNodeArray);

            /*
            /* Process Node Horizontally for Level 2 analysis
            */

            // Check this node against the rest of the nodes in this row (moving forward) by incremeneting the col digit
            for (var p = parseInt(thisCol) + 1; p < 10; p++) {
                // Get the associated box number for this row/col pair
                var lookupBox = getBoxNumber(p, parseInt(thisRow));

                // Determine next node to check
                var ArrToCheckLabel = "array" + thisRow + p + lookupBox;
                var arrToCheck = eval(ArrToCheckLabel);
                
                // If the array to check is also length == 2, compare the arrays
                if (arrToCheck.length == 2) {
                    var flatArrToCheck = JSON.stringify(arrToCheck);

                    // If the arrays match, the 2 digits in the array should be eliminated from all other nodes in this row
                    if (flatArrToCheck == nodeSourceArrayFlat) {
                        // Store numbers of arrays that match. These will not be processed
                        var firstArrCol = thisCol;
                        var secondArrCol = p;

                        // Another for loop...
                        for (var col = 1; col< 10; col++) {
                            // Proceed if the current column number is not one of the 2 arrays that matched
                            if (col != firstArrCol && col != secondArrCol ) {
                                var boxToLookup = getBoxNumber(col, parseInt(thisRow));

                                // Determine next node to check
                                var arrayToLookup = "array" + thisRow + col + boxToLookup;
                                var arrToCheckAgainstPair = eval(arrayToLookup);

                                // Loop through the array to be compared to the matching pair
                                for (var j = 0; j < arrToCheckAgainstPair.length; j++) {
                                    // console.log("length of " + arrToCheck + " is " + arrToCheck.length);

                                    // For each entry in the array being checked, compare with both numbers in the 2 digit array pair
                                    for (var l = 0; l < arrToCheck.length; l++) {
                                        var indexToRemove = arrToCheckAgainstPair.indexOf(arrToCheck[l]);

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

            /*
            /* End Process Node Horizontally for Level 2 analysis
            */

            /*
            /* Process Node Vertically for Level 2 analysis
            */

            // Check this node against the rest of the nodes in this column (moving down) by incremeneting the row digit
            // Identify all of the boxes associated with the node being checked

            for (var i = parseInt(thisRow) + 1; i < 10; i++) {
                // Get the associated box number for this row/col pair
                var lookupBox = getBoxNumber( parseInt(thisCol), i );

                // Determine next node to check
                var levelTwoVertArrLabel = "array" + i + thisCol + lookupBox;
                var levelTwoVertArr = eval(levelTwoVertArrLabel);
                
                // If the array to check is also length == 2, compare the arrays
                if (levelTwoVertArr.length == 2) {
                    var levelTwoVertFlatArrToCheck = JSON.stringify(levelTwoVertArr);

                    // If the arrays match, the 2 digits in the array should be eliminated from all other nodes in this column
                    if (levelTwoVertFlatArrToCheck == nodeSourceArrayFlat) {
                        // Store numbers of arrays that match. These will not be processed
                        var secondArrRow = i;

                        // Another for loop...
                        for (var row = 1; row < 10; row ++) {
                            // Proceed if the current row number is not one of the 2 arrays that matched
                            if (row != thisRow && row != secondArrRow ) {

                                var boxToLookup = getBoxNumber( parseInt(thisCol), row );

                                // Determine next node to check
                                var arrayToLookup = "array" + row + thisCol + boxToLookup;
                                
                                var arrToCheckAgainstPair = eval(arrayToLookup);

                                // Loop through the array to be compared to the matching pair
                                for (var j = 0; j < arrToCheckAgainstPair.length; j++) {

                                    // For each entry in the array being checked, compare with both numbers in the 2 digit array pair
                                    for (var l = 0; l < levelTwoVertArr.length; l++) {
                                        var indexToRemove = arrToCheckAgainstPair.indexOf(levelTwoVertArr[l]);

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

            /*
            /* End Process Node Vertically for Level 2 analysis
            */

            /*
            /* Process Node Box for Level 2 analysis
            */

            // To Do 
            var allAssociatedBoxes = $("input[id^='options'][id$='" + thisBox + "']"); // starts with 'options', ends with box number
            
            // Iterate through each of the box nodes
            $.each(allAssociatedBoxes, function (k, v) {
                var thisId = this.id;

                // Iterate through these boxes, skipping **numberToProcess**, looking for a matching array with a length of 2
                if (thisId.slice(7) != numberToProcess) {
                    // Store value of the *parent* node being checked
                    var parentArrLabel = "array" + numberToProcess;
                    var parentArrToCheck = eval(parentArrLabel);

                    var childArrLabel = "array" + thisId.slice(7);
                    var childArrToCheck = eval(childArrLabel);

                    // Only process *other* arrays when the childArrToCheck.length = 2
                    if (thisId.slice(7) != numberToProcess && childArrToCheck.length == 2) {

                        var parentArrFlat = JSON.stringify(parentArrToCheck);
                        var arrToCheckFlat = JSON.stringify(childArrToCheck);

                        // If the arrays match, the 2 digits in the arrays should be eliminated from all *other* nodes in this column
                        if (parentArrFlat == arrToCheckFlat) {

                            // Loop through the boxes to process these values
                            $.each(allAssociatedBoxes, function (subkey, subvalue) {
                                // Only proceed for boxes that are not among the matching arrays
                                if (this.id.slice(7) != numberToProcess && this.id.slice(7) != thisId.slice(7)) {

                                    // Determine next node to check
                                    var arrayToProcessLabel = "array" + this.id.slice(7);
                                    var arrayToProcess = eval(arrayToProcessLabel);

                                    // Loop through the array to process
                                    for (var m = 0; m < arrayToProcess.length; m++) {

                                        // For each entry in the array being processed, compare with both numbers in the 2 digit array pair
                                        for (var n = 0; n < parentArrToCheck.length; n++) {
                                            var indexForRemoval = arrayToProcess.indexOf(parentArrToCheck[n]);

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
            /*
            /* End Process Node Box for Level 2 analysis
            */

        }
    });

    printArrays(optionNames, arrayNames);
}

// Determine the box number based on the row/column pair
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
// Highlight gameboard node when hovering over corresponding hint node
$(".hint-div").hover( function() {
        var nodeNumber = $(this).data("node-number");
        var target = "div > input[id='node-" + nodeNumber + "']";
        $( target ).css("background-color", "yellow");
    }, function() {
        var nodeNumber = $(this).data("node-number");
        var target = "div > input[id='node-" + nodeNumber + "']";
        $( target ).css("background-color", "white");
})

// Highlight associated gameboard nodes when hovering gameboard
$(".gb-input").hover( function() {
    // Highlight the node in focus
    var nodeNumber = $(this).data("node-number");
    var mainTarget = "#node-" + nodeNumber;
    $( mainTarget ).css("background-color", "blue");

    // Isolate the digits to determine the row/col/box
    var row = nodeNumber.toString().slice(0,1);
    var col = nodeNumber.toString().slice(1,2);
    var box = nodeNumber.toString().slice(2);

    // Highlight associated row
    var rowTarget = ".r" + row;
    $(rowTarget).each(function() {
        $(this).css("background-color", "aquamarine");
    })

    // Highlight associated col
    var colTarget = ".c" + col;
    $(colTarget).each(function() {
        $(this).css("background-color", "aquamarine");
    })
    // Highlight associated box
    var boxTarget = ".b" + box;
    $(boxTarget).each(function() {
        $(this).css("background-color", "aquamarine");
    })
}, function() {
    // Remove Highlight from all nodes
    $(".gb-input").each(function() {
        $(this).css("background-color", "white");
    })

})