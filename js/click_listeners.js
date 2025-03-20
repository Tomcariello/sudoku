
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
    processKeypadInput(1)
})
$("#keypad2").click(function () {
    processKeypadInput(2)
})
$("#keypad3").click(function () {
    processKeypadInput(3)
})
$("#keypad4").click(function () {
    processKeypadInput(4)
})
$("#keypad5").click(function () {
    processKeypadInput(5)
})
$("#keypad6").click(function () {
    processKeypadInput(6)
})
$("#keypad7").click(function () {
    processKeypadInput(7)
})
$("#keypad8").click(function () {
    processKeypadInput(8)
})
$("#keypad9").click(function () {
    processKeypadInput(9)
})








