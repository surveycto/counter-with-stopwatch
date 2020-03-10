/*fieldProperties = {
    'PARAMETERS': [
        {
            'key': 'A',
            'value': 1000
        },
        {
            'key': 'B',
            'value': 's'
        }
    ],
    'CURRENT_ANSWER': '0 1000'
}// Above for testing only */

var swDisp = document.querySelector('#stopwatch');
var ssButton = document.querySelector('#startstop');
var countDisp = document.querySelector('#count');
var restartButtons = document.querySelector('#restartbuttons');
var confirmation = document.querySelector('#confirmation');

var parameters = fieldProperties.PARAMETERS
var numParam = parameters.length


var timeStart = 0;
var unit = 's'; //Default, may be changed
var round = 1000; //Default, may be changed
var timePassed = 0; //Time passed so far

switch (numParam) {
    case 1:
        unit = parameters[0].value;

        if (unit == 'ms') {
            unit = ' milliseconds'
            round = 1;
        }
        else if (unit == 'cs') {
            unit = ' centiseconds'
            round = 10;
        }
        else if (unit == 'ds') {
            unit = ' deciseconds'
            round = 100;
        }
        else {
            unit = ' seconds';
            round = 1000;
        }
}

var complete = false;
var counter = 0;

var timerRunning = false;

var startTime = 0; //This will get an actual value when the timer starts in startStopTimer();

if (fieldProperties.CURRENT_ANSWER != null) {
    let parts = fieldProperties.CURRENT_ANSWER.match(/[^ ]+/g);
    counter = parseInt(parts[0]);
    timePassed = parseInt(parts[1]);
    timerRunning = false;
}
countDisp.innerHTML = counter

setInterval(timer, 1);

function timer() {
    if (timerRunning) {
        timePassed = Date.now() - startTime;
    }

    swDisp.innerHTML = String(Math.floor(timePassed / round)) + unit;
}

function startStopTimer() {
    if (timerRunning) {
        restartButtons.style.display = ''; //Makes the other buttons appear
        timerRunning = false;
        ssButton.innerHTML = "Start";
        setAns();
    }
    else {
        restartButtons.style.display = 'none';
        confirmation.innerHTML = '';
        startTime = Date.now() - timePassed;
        timerRunning = true;
        ssButton.innerHTML = "Stop";
        setAnswer('');
    }
}

function countup() {
    counter++;
    countDisp.innerHTML = counter;
    if (!timerRunning) {
        setAns();
    }
}

function countdown() {
    counter--;
    if (counter < 0) {
        counter = 0;
    }
    countDisp.innerHTML = counter;

    if (!timerRunning) {
        setAns();
    }
}

function restartconf(restarter) {
    let warningMessage = "Are sure you would like to restart the " + restarter + "?";

    warningMessage += '<br><button id="yes" class="whitebutton">Yes</button><button id="no" class="bluebutton">No</button>'

    confirmation.innerHTML = warningMessage;

    document.querySelector('#yes').addEventListener('click', function () {
        if (restarter == 'timer') {
            swDisp.innerHTML = timeLeft = timeStart;
            timePassed = 0;
            ssButton.classList.remove('buttonstop');
            ssButton.innerHTML = "Start";
            ssButton.disabled = false;
            setAnswer()
        }
        else if (restarter == 'counter') {
            countDisp.innerHTML = counter = 0;
        }
        confirmation.innerHTML = null;
    });

    document.querySelector('#no').addEventListener('click', function () {
        confirmation.innerHTML = null;
    });
}

function setAns(){
    setAnswer(String(counter) + ' ' + String(timePassed));
}

function clearAnswer() {
    if (timerRunning) {
        startStopTimer();
    }
    setAnswer(null);
    timePassed = 0;
    counter = 0;
}