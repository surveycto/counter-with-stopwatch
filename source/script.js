// get the UI elements
var swDisp = document.querySelector('#stopwatch');
var unitDisp = document.querySelector('#unit');
var ssButton = document.querySelector('#startstop');
var countDisp = document.querySelector('#count');
var resetButtons = document.getElementsByClassName("restart-buttons");
var resetConfBox = document.getElementById('resetConfirmation');

// get parameters info
var timeUnit = getPluginParameter('time-unit');

// set up the timer and counter variables
var round = 1000; //Default, may be changed
var timePassed = 0; //Time passed so far
var counter = 0;
var timerRunning = false;
var startTime = 0; //This will get an actual value when the timer starts in startStopTimer();

//// START stopwatch functions

// Define what happens when the user resets the stopwatch
function resetStopwatch() {
    if (timerRunning) {
        startStopTimer();
        timePassed = 0;
        startStopTimer();
    } else {
        timePassed = 0;
    }
    swDisp.innerHTML = timePassed;
    setAns();
    resetConfBox.style.display = "none";
    showResetButtons();
}
// Set up the stopwatch
setInterval(timer, 1);
function timer() {
    if (timerRunning) {
        timePassed = Date.now() - startTime;
    }
    swDisp.innerHTML = Math.floor(timePassed / round);
}
// Defines what happens when the stopwatch button is pressed. This can function as either a 'start' button or a 'stop' button, depending on whether or not the stopwatch is currently running. 
function startStopTimer() {
    if (timerRunning) {
        timerRunning = false;
        ssButton.querySelector(".play-icon").style.display = "block";
        ssButton.querySelector(".pause-icon").style.display = "none";
        setAns();
    }
    else {
        startTime = Date.now() - timePassed;
        timerRunning = true;
        ssButton.querySelector(".play-icon").style.display = "none";
        ssButton.querySelector(".pause-icon").style.display = "block";
        setAns('');
    }
}

//// END stopwatch functions

//// START counter functions

// Define what happens when the user resets the counter
function resetCounter() {
    counter = 0;
    countDisp.innerHTML = counter;
    setAns();
    resetConfBox.style.display = "none";
    document.getElementById("counterdown").classList.add("btn-secondary");
    showResetButtons();
}
// Define what happens when the user cancels a reset
function cancelReset() {
    resetConfBox.style.display = "none";
    showResetButtons();
}
// Increase the current "count"
function countup() {
    counter++;
    countDisp.innerHTML = counter;
    if (!timerRunning) {
        setAns();
    }
    if (counter > 0) {
        document.getElementById("counterdown").classList.remove("btn-secondary");
    }
}
// Decrease the current "count"
function countdown() {
    if (counter > 0) {
        counter--;
    }
    if (counter == 0) {
        document.getElementById("counterdown").classList.add("btn-secondary");
    }
    countDisp.innerHTML = counter;
    if (!timerRunning) {
        setAns();
    }
}

//// END counter functions

//// START global functions

// define how to save the field's value in the form data
function setAns(){
    setAnswer(String(counter) + ' ' + String(timePassed));
}

// define what happens when the user attempts to clear the response 
function clearAnswer() {
    if (timerRunning) {
        startStopTimer();
    }
    resetStopwatch()
    resetCounter();
    setAns();
}

// Hide the reset buttons from the UI
function hideResetButtons() {
    for (var i = 0; i < resetButtons.length; i++) {
        resetButtons[i].style.display = "none";
    }
}
// Show the reset buttons in the UI
function showResetButtons() {
    for (var i = 0; i < resetButtons.length; i++) {
        resetButtons[i].style.display = "block";
    }
}
// Define the 'reset' function to allow either the stopwatch or the counter to use the same confirmation box
function restartconf(restarter) {
    let warningMessage = "Are sure you would like to reset the <strong>" + restarter + "</strong>?";
    document.getElementById("confirmationMessage").innerHTML = warningMessage;
    hideResetButtons();
    resetConfBox.style.display = "block";
    if (restarter == "timer") {
        document.getElementById("confirmReset").removeEventListener("click", resetCounter);
        document.getElementById("confirmReset").addEventListener("click", resetStopwatch);
    } else if (restarter == "counter") {
        document.getElementById("confirmReset").removeEventListener("click", resetStopwatch);
        document.getElementById("confirmReset").addEventListener("click", resetCounter);
    }
}

//// END global functions

//// START field setup/loading

// If the field label or hint contain any HTML that isn't in the form definition, then the < and > characters will have been replaced by their HTML character entities, and the HTML won't render. We need to turn those HTML entities back to actual < and > characters so that the HTML renders properly. This will allow you to render HTML from field references in your field label or hint.
function unEntity(str){
    return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}
if (fieldProperties.LABEL) {
    document.querySelector(".label").innerHTML = unEntity(fieldProperties.LABEL);
}
if (fieldProperties.HINT) {
    document.querySelector(".hint").innerHTML = unEntity(fieldProperties.HINT);
}

// If the 'time-unit' parameter was supplied, make the appropriate adjustments
if (timeUnit) {
    if (timeUnit == 'ms') {
        round = 1;
    } else if (timeUnit == 'cs') {
        round = 10;
    } else if (timeUnit == 'ds') {
        round = 100;
    } else {
        round = 1000;
    }
}

// When loading the field, check to see if there is already a stored value. If yes, update the appropriate variables.
if (fieldProperties.CURRENT_ANSWER != null) {
    let parts = fieldProperties.CURRENT_ANSWER.match(/[^ ]+/g);
    counter = parseInt(parts[0]);
    timePassed = parseInt(parts[1]);
    timerRunning = false;
}

// If the current value of 'count' is above 0 when the field loads, the 'decrease count' button should be blue 
if (counter > 0) {
    document.getElementById("counterdown").classList.remove("btn-secondary");
}

// Show the current counter value
countDisp.innerHTML = counter;

// Show the current stopwatch value
unitDisp.innerHTML = timeUnit;

//// END field setup/loading