import changeDynamicWord from "./js/gui.js";
import { calculateNewCooldown } from "./js/cooldown.js";
import { getQueryParam } from "./js/queryHandler.js";


// GUI elem
const btnItemDrop = document.getElementById('btnItemDrop');
const btnCoolDown = document.getElementById('btnCoolDown');

// Entry Point
document.addEventListener("DOMContentLoaded", function (event) {

    changeDynamicWord();
    const calcType = getQueryParam("calc");
    console.log(calcType);
    handleQuery(calcType);

});

// Attach events to GUI
btnItemDrop.addEventListener('click', () => {
    calculateItemDrop();
});

btnCoolDown.addEventListener('click', () => {
    calculateCooldown();
})

// Handle query
function handleQuery(query) {
    if (query === "itemdrop") {
        const odds = parseFloat(getQueryParam("odds"));
        handleQueryItemDrop(odds);
    }
}

function handleQueryItemDrop(odds) {
    calculateItemDrop(odds);
}


function calculateItemDrop(odds = 0) {
    var itemDropRate;

    if (odds != 0) {
        itemDropRate = odds / 100;
        console.log(odds);
    } else {
        itemDropRate = parseFloat(document.getElementById("oddsItemDrop").value) / 100;
    }

    const numberOfEvents = calculateAttemptsForCertainty(itemDropRate);
    displayItemDrop(numberOfEvents);
}


function calculateProbability() {
    var oddsPercentage = parseFloat(document.getElementById("odds").value);
    var numberOfEvents = parseInt(document.getElementById("events").value);

    if (!isValidInput(oddsPercentage, numberOfEvents)) {
        return;
    }

    clearTable();

    var odds = oddsPercentage / 100;
    var probability = calculateEventProbability(odds, numberOfEvents);
    displayResult(probability);

    generateTableRows(oddsPercentage, odds, numberOfEvents);
}

function calculateCooldown() {
    var attackSpeed = parseFloat(document.getElementById("speed").value);
    var speedChange = parseFloat(document.getElementById("speedChange").value);

    // ToDo input validation
    var newAttackSpeed = calculateNewCooldown(attackSpeed, speedChange);
    displayNewCoolDown(newAttackSpeed);

    clearTable();
}

function isValidInput(oddsPercentage, numberOfEvents) {
    if (isNaN(oddsPercentage) || isNaN(numberOfEvents) || oddsPercentage < 0 || oddsPercentage > 100 || numberOfEvents < 1) {
        document.getElementById("result").innerHTML = "Please enter valid values.";
        return false;
    }
    return true;
}

/* Math functions */

function calculateAttemptsForCertainty(chance) {
    // Calculate the number of attempts needed for 99% certainty
    const attempts = Math.ceil(Math.log(1 - 0.99) / Math.log(1 - chance));
    return attempts;
}

function calculateEventProbability(odds, numberOfEvents) {
    return 1 - Math.pow(1 - odds, numberOfEvents);
}

/* Math helper functions */

/* Display functions */

function displayItemDrop(itemDrop) {
    let message = "";

    if (itemDrop < 10) {
        message = "You're almost there! Just a few more monster slayings or dungeon runs, around " + itemDrop + " times, and that epic item will be yours!";
    } else if (itemDrop < 50) {
        message = "You're making great progress! It looks like you'll need to keep at it, around " + itemDrop + " times more, to secure that epic item.";
    } else if (itemDrop >= 100) {
        message = "Adventure awaits! To grab that epic item, you've got an exciting journey of about " + itemDrop + " monster defeats or dungeon triumphs ahead. Keep your spirits high!";
    } else {
        message = "You're on a roll! It looks like you'll need to slay some more monsters or conquer dungeons around " + itemDrop + " times to snag that epic item. Keep up the adventure!";
    }

    document.getElementById("itemDropResult").innerHTML = message;
}


function displayResult(probability) {
    document.getElementById("result").innerHTML = "Probability: " + (probability * 100).toFixed(2) + "%";
}

function displayNewCoolDown(newAttackSpeed) {
    document.getElementById("resultCoolDown").innerHTML = "New cooldown: " + newAttackSpeed.toFixed(2) + " sec";
}
/*  Table functions */
function generateTableRows(oddsPercentage, odds, numberOfEvents) {
    var table = document.getElementById("probabilityTable");
    var eventCounts = [1, 2, 3, 4, 5, 10, 15];

    for (var i = 0; i < eventCounts.length; i++) {
        var count = eventCounts[i];
        var newRow = table.insertRow(-1);
        var newCell1 = newRow.insertCell(0);
        var newCell2 = newRow.insertCell(1);
        var newCell3 = newRow.insertCell(2);

        var eventProbability = calculateEventProbability(odds, count);
        newCell1.innerHTML = count;
        newCell2.innerHTML = oddsPercentage + "%";
        newCell3.innerHTML = (eventProbability * 100).toFixed(2) + "%";
    }
}

function clearTable() {
    var table = document.getElementById("probabilityTable");
    var rowCount = table.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}