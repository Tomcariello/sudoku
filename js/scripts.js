//On page load functions
 $(document).ready(function () {
     $(".node").forceNumeric();
     $.fn.startGame();
     $.fn.clearArrays(arrayNames, arrayValues);
     $.fn.printArrays(optionNames, arrayNames);
     $.fn.colorArrays(nodeNames);
 });

//Variable Declarations
 var nodeNames = ['#node-111', '#node-121', '#node-131', '#node-142', '#node-152', '#node-162', '#node-173', '#node-183', '#node-193', '#node-211', '#node-221', '#node-231', '#node-242', '#node-252', '#node-262', '#node-273', '#node-283', '#node-293', '#node-311', '#node-321', '#node-331', '#node-342', '#node-352', '#node-362', '#node-373', '#node-383', '#node-393', '#node-414', '#node-424', '#node-434', '#node-445', '#node-455', '#node-465', '#node-476', '#node-486', '#node-496', '#node-514', '#node-524', '#node-534', '#node-545', '#node-555', '#node-565', '#node-576', '#node-586', '#node-596', '#node-614', '#node-624', '#node-634', '#node-645', '#node-655', '#node-665', '#node-676', '#node-686', '#node-696', '#node-717', '#node-727', '#node-737', '#node-748', '#node-758', '#node-768', '#node-779', '#node-789', '#node-799', '#node-817', '#node-827', '#node-837', '#node-848', '#node-858', '#node-868', '#node-879', '#node-889', '#node-899', '#node-917', '#node-927', '#node-937', '#node-948', '#node-958', '#node-968', '#node-979', '#node-989', '#node-999',];
 var arrayNames = ['array111', 'array121', 'array131', 'array142', 'array152', 'array162', 'array173', 'array183', 'array193', 'array211', 'array221', 'array231', 'array242', 'array252', 'array262', 'array273', 'array283', 'array293', 'array311', 'array321', 'array331', 'array342', 'array352', 'array362', 'array373', 'array383', 'array393', 'array414', 'array424', 'array434', 'array445', 'array455', 'array465', 'array476', 'array486', 'array496', 'array514', 'array524', 'array534', 'array545', 'array555', 'array565', 'array576', 'array586', 'array596', 'array614', 'array624', 'array634', 'array645', 'array655', 'array665', 'array676', 'array686', 'array696', 'array717', 'array727', 'array737', 'array748', 'array758', 'array768', 'array779', 'array789', 'array799', 'array817', 'array827', 'array837', 'array848', 'array858', 'array868', 'array879', 'array889', 'array899', 'array917', 'array927', 'array937', 'array948', 'array958', 'array968', 'array979', 'array989', 'array999'];
 var arrayValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
 var optionNames = ['#options111', '#options121', '#options131', '#options142', '#options152', '#options162', '#options173', '#options183', '#options193', '#options211', '#options221', '#options231', '#options242', '#options252', '#options262', '#options273', '#options283', '#options293', '#options311', '#options321', '#options331', '#options342', '#options352', '#options362', '#options373', '#options383', '#options393', '#options414', '#options424', '#options434', '#options445', '#options455', '#options465', '#options476', '#options486', '#options496', '#options514', '#options524', '#options534', '#options545', '#options555', '#options565', '#options576', '#options586', '#options596', '#options614', '#options624', '#options634', '#options645', '#options655', '#options665', '#options676', '#options686', '#options696', '#options717', '#options727', '#options737', '#options748', '#options758', '#options768', '#options779', '#options789', '#options799', '#options817', '#options827', '#options837', '#options848', '#options858', '#options868', '#options879', '#options889', '#options899', '#options917', '#options927', '#options937', '#options948', '#options958', '#options968', '#options979', '#options989', '#options999'];

 // force numeric values in grid (copied from the web)
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
 $.fn.startGame = function () {
     $("#node-111").val("5");
     $("#node-121").val("");
     $("#node-131").val("");
     $("#node-142").val("1");
     $("#node-152").val("");
     $("#node-162").val("");
     $("#node-173").val("");
     $("#node-183").val("");
     $("#node-193").val("");

     $("#node-211").val("");
     $("#node-221").val("9");
     $("#node-231").val("6");
     $("#node-242").val("");
     $("#node-252").val("");
     $("#node-262").val("");
     $("#node-273").val("8");
     $("#node-283").val("2");
     $("#node-293").val("");

     $("#node-311").val("");
     $("#node-321").val("");
     $("#node-331").val("");
     $("#node-342").val("");
     $("#node-352").val("");
     $("#node-362").val("7");
     $("#node-373").val("");
     $("#node-383").val("");
     $("#node-393").val("9");
   
    $("#node-414").val("");
    $("#node-424").val("");
    $("#node-434").val("");
    $("#node-445").val("");
    $("#node-455").val("");
    $("#node-465").val("3");
    $("#node-476").val("");
    $("#node-486").val("");
    $("#node-496").val("6");
    
    $("#node-514").val("");
    $("#node-524").val("7");
    $("#node-534").val("4");
    $("#node-545").val("");
    $("#node-555").val("");
    $("#node-565").val("");
    $("#node-576").val("9");
    $("#node-586").val("1");
    $("#node-596").val("");

    $("#node-614").val("2");
    $("#node-624").val("");
    $("#node-634").val("");
    $("#node-645").val("5");
    $("#node-655").val("");
    $("#node-665").val("");
    $("#node-676").val("");
    $("#node-686").val("");
    $("#node-696").val("");

    $("#node-717").val("7");
    $("#node-727").val("");
    $("#node-737").val("");
    $("#node-748").val("6");
    $("#node-758").val("");
    $("#node-768").val("");
    $("#node-779").val("");
    $("#node-789").val("");
    $("#node-799").val("");

    $("#node-817").val("");
    $("#node-827").val("8");
    $("#node-837").val("3");
    $("#node-848").val("");
    $("#node-858").val("");
    $("#node-868").val("");
    $("#node-879").val("5");
    $("#node-889").val("7");
    $("#node-899").val("");
    
    $("#node-917").val("");
    $("#node-927").val("");
    $("#node-937").val("");
    $("#node-948").val("");
    $("#node-958").val("");
    $("#node-968").val("4");
    $("#node-979").val("");
    $("#node-989").val("");
    $("#node-999").val("1");
 }

//Set all nodes to blank
 $.fn.clearGame = function (nodeNames) {
     for (var i = 0; i < 82; i += 1) {
         $(String(nodeNames[i])).val("");
     }
 }

//Set all array values to the default 1-9
 $.fn.clearArrays = function (arrayNames, arrayValues) {
     for (var i = 0; i < arrayNames.length; i += 1) {
         window[arrayNames[i]] = arrayValues.slice();
     }
 }

//Print contents of all of the arrays into the boxes
 $.fn.printArrays = function (optionNames, arrayNames) {
     for (var i = 0; i < 82; i += 1) {
         $(String(optionNames[i])).val(String(window[arrayNames[i]]));
     }
 }
         
//assign color to grid if value in node
 $.fn.colorArrays = function (nodeNames) {
     for (var i = 0; i < nodeNames.length; i += 1) {
          if (parseInt(String($(String(nodeNames[i])).val())) > 0) {
               $(nodeNames[i]).addClass("red");
         } else { $(nodeNames[i]).removeClass("red"); }
     }
 }

//onclick of clear button
$("#clear").click(function () {
    $.fn.clearGame(nodeNames);
    $.fn.clearArrays(arrayNames, arrayValues);
    $.fn.printArrays(optionNames, arrayNames);
    $.fn.colorArrays(nodeNames);
})

//onclick of Reset button
$("#reset").click(function () {
    $.fn.startGame();
    $.fn.clearArrays(arrayNames, arrayValues);
    $.fn.printArrays(optionNames, arrayNames);
    $.fn.colorArrays(nodeNames);
})

//onclick of solve button 
$("#solve").click(function () {
    $.fn.solve();
})

$.fn.solve = function () {
    // Check each node for value and process accordingly
    //Process Node Horizontally
    for (var i = 0; i < nodeNames.length; i += 1) {
        //If value is found in a node, proceed:
        if (parseInt($(String(nodeNames[i])).val()) > 0) {
            //Determine ROW/COLUMN/SQUARE to process
            var currentNode = nodeNames[i].slice(-3); //obtain nodename (3 digits)
            var currentRow = currentNode.slice(0,1); //obtain ROW
            var currentColumn = currentNode.slice(1, 2); //obtain COL
            //Store current value to process
            var lookupValue = parseInt($(String(nodeNames[i])).val());

            //for (var x = ((currentRow - 1) * 9) ; x < (currentRow * 9) ; x++) {
            for (var x = 1; x < 10; x++) {
                if (x != currentColumn) {
                    var nodeToUpdate = nodeNames[(currentRow - 1) * 9 - 1 + x].slice(-3);
                    var arrayToLookup = eval("array" + nodeToUpdate);
                    var splicePosition = $.inArray(lookupValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }
        }
        
    }
    //Process Node Vertically
    for (var i = 0; i < nodeNames.length; i += 1) {
        //If value is found in a node, proceed:
        if (parseInt($(String(nodeNames[i])).val()) > 0) {
            //Determine ROW/COLUMN/SQUARE to process
            var currentNode = nodeNames[i].slice(-3); //obtain nodename (3 digits)
            var currentRow = currentNode.slice(0,1); //obtain ROW
            var currentColumn = currentNode.slice(1, 2); //obtain COL
            //Store current value to process
            var lookupValue = parseInt($(String(nodeNames[i])).val());
            //Process Node Vertically
            for (var x = 1; x < 10; x++) {
                if (x != currentRow) {
                    var nodeToUpdate = nodeNames[(currentColumn - 1) + 9 * (x - 1)].slice(-3);
                    var arrayToLookup = eval("array" + nodeToUpdate);
                    var splicePosition = $.inArray(lookupValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }
        }
    }

    //Process Boxes

    //create arrays per box
    var box1 = ['111', '121', '131', '211', '221', '231','311', '321', '331'];
    var box2 = ['142', '152', '162', '242', '252', '262','342', '352', '362'];
    var box3 = ['173', '183', '193', '273', '283', '293','373', '383', '393'];
    var box4 = ['414', '424', '434', '514', '524', '534','614', '624', '634'];
    var box5 = ['445', '455', '465', '545', '555', '565','645', '655', '665'];
    var box6 = ['476', '486', '496', '576', '586', '596','676', '686', '696'];
    var box7 = ['717', '727', '737', '817', '827', '837','917', '927', '937'];
    var box8 = ['748', '758', '768', '848', '858', '868','948', '958', '968'];
    var box9 = ['779', '789', '799', '879', '889', '899','979', '989', '999'];
    
    for (var i = 0; i < nodeNames.length; i += 1) {
        //If value is found in a node, proceed:
        if (parseInt($(String(nodeNames[i])).val()) > 0) {
            //Determine ROW/COLUMN/SQUARE to process
            var currentNode = nodeNames[i].slice(-3); //obtain nodename (3 digits)
            var currentRow = currentNode.slice(0,1); //obtain ROW
            var currentColumn = currentNode.slice(1, 2); //obtain COL
            var currentSquare = currentNode.slice(2); //obtain SQUARE
            //Store current value to process
            var lookupValue = parseInt($(String(nodeNames[i])).val());
            //Process Node Vertically
            for (var x = 0; x < 9; x++) {
                var boxArrayToLookup = eval("box" + currentSquare);

                if (boxArrayToLookup[x] != currentNode) {
                    var nodeToUpdate = nodeNames[i].slice(-3);
                    var arrayToLookup = eval("array" + boxArrayToLookup[x]);
                    var splicePosition = $.inArray(lookupValue, arrayToLookup);

                    if (splicePosition > -1) {
                        arrayToLookup.splice(splicePosition, 1);
                    }
                }
            }
        }
    }


    $.fn.printArrays(optionNames, arrayNames);
}