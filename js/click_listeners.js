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

// Listen for user input from the keyboard
$(document).on('keypress', function (e) {
    var charCode = e.which || e.keyCode;
    
    // Check if the key is between 1 and 9
    if (charCode >= 49 && charCode <= 57) {
      var numberPressed = parseInt(String.fromCharCode(charCode), 10);
      processNumberInput(numberPressed);
    }
});

/* Handle button clicks */
$("#clear").click(function () {
    clearGameBoard(gameNodeNames);
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printHintArrays(hintBoardNameArray, gameBoardNameArray);
})

$("#reset").click(function () {
    const currentGame = $("#reset").data("game-number");
    startGame(currentGame);
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printHintArrays(hintBoardNameArray, gameBoardNameArray);
})

$("#new").click(function () {
    currentSudokuGame = getNewGame("medium")
    startGame();
    clearArrays(gameBoardNameArray, eligibleNumbersArray);
    printHintArrays(hintBoardNameArray, gameBoardNameArray);
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

$("#toggle-notes").click(function () {
    toggleNotesMode()
})

// Set keypad digit input
$("#keypad1").click(function () {
    processNumberInput(1)
})
$("#keypad2").click(function () {
    processNumberInput(2)
})
$("#keypad3").click(function () {
    processNumberInput(3)
})
$("#keypad4").click(function () {
    processNumberInput(4)
})
$("#keypad5").click(function () {
    processNumberInput(5)
})
$("#keypad6").click(function () {
    processNumberInput(6)
})
$("#keypad7").click(function () {
    processNumberInput(7)
})
$("#keypad8").click(function () {
    processNumberInput(8)
})
$("#keypad9").click(function () {
    processNumberInput(9)
})








