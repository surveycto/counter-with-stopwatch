var stopwatchStart = 0; //Time limit on each field in milliseconds

var timerDisp = document.querySelector('#timer');
var changer = document.querySelector('#buttonsst');
var ssButton = document.querySelector('#startstop');
var countDisp = document.querySelector('#count');

var complete = false;
var timePassed = 0; //Time passed so far
var counter = 0;

var timerRunning = false;

var startTime = 0; //This will get an actual value when the timer starts in startStopTimer();

if (fieldProperties.CURRENT_ANSWER != null) {
    let answers = fieldProperties.CURRENT_ANSWER.match(/[^ ]+/g);

    if (answers.length != 2) {
        document.querySelector('.buttons').innerHTML = "There was a problem! " + fieldProperties.CURRENT_ANSWER + " is not a valid answer.<br>Make sure a contraint was setup where:<br>" +
        "count-selected(.) = 2";
    }
    else {
        timePassed = answers[0];
        counter = answers[1];
        countDisp.innerHTML = counter;
    }
}

setInterval(timer, 1);

function timer() {
    if (timerRunning) {
        timePassed = Date.now() - startTime;
    }
    timerDisp.innerHTML = timePassed + " ms";
}

function startStopTimer() {
    if (timerRunning) {
        timerRunning = false;
        ssButton.innerHTML = "Start"
        let answer = String(timePassed) + " " + counter;
        console.log(answer);
        setAnswer(answer);
    }
    else {
        startTime = Date.now() - timePassed;
        timerRunning = true;
        ssButton.innerHTML = "Stop";
        setAnswer()
    }
}

function countup() {
    counter++;
    countDisp.innerHTML = counter;

    if(!timerRunning){
        collectAnswer();
    }
}

function countdown() {
    counter--;
    if (counter < 0) {
        counter = 0;
    }
    countDisp.innerHTML = counter;
    if(!timerRunning){
        collectAnswer();
    }
}

function collectAnswer(){
    let answer = String(timePassed) + " " + counter;
    setAnswer(answer);
}

function clearAnswer() {
    if (timerRunning) {
        startStopTimer();
    }
    setAnswer();
    timePassed = 0;
    counter = 0;
}