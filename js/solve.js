
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

    printHintArrays(hintBoardNameArray, gameBoardNameArray, source);

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