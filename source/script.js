/* fieldProperties = {
  'PARAMETERS': [
    {
      'key': 'duration',
      'value': 10
    },
    {
      'key': 'time-unit',
      'value': 'ds'
    }
  ],
  'CURRENT_ANSWER': '10 1000',
  'METADATA': '10 1000' // ow much time was left last time
}

function getMetaData(){
  return fieldProperties.METADATA
}

function setMetaData(value){
  fieldProperties.METADATA = value
}

function getPluginParameter(param){
  for(let p of fieldProperties.PARAMETERS){
    let key = p.key
    if(key == param){
      return p.value
    }
  }
  return
}

function setAnswer(ans){
  console.log('Set answer to: ' + ans)
}

function goToNextField(){
  console.log('Moved to next field')
}

// Above for testing only */

/* global setAnswer, setMetaData, getMetaData, fieldProperties, getPluginParameter  */

// START stopwatch functions

// Define what happens when the user resets the stopwatch
function resetStopwatch () {
  startStopTimer(0)
  timePassed = 0
  swDisp.innerHTML = 0
  setAns()
  resetConfBox.style.display = 'none'
  showResetButtons()
}
// Set up the stopwatch
function timer () {
  if (timerRunning) {
    timePassed = Date.now() - startTime
    setMeta()
  }
  swDisp.innerHTML = Math.floor(timePassed / round)
}
// Defines what happens when the stopwatch button is pressed. This can function as either a 'start' button or a 'stop' button, depending on whether or not the stopwatch is currently running.
// If parameter is 0, then should stop no matter what
function startStopTimer (startOrStop) {
  if (timerRunning || (startOrStop === 0)) {
    timerRunning = false
    ssButton.querySelector('.play-icon').style.display = 'block'
    ssButton.querySelector('.pause-icon').style.display = 'none'
    setAns()
  } else {
    startTime = Date.now() - timePassed
    timerRunning = true
    ssButton.querySelector('.play-icon').style.display = 'none'
    ssButton.querySelector('.pause-icon').style.display = 'block'
    setAns('')
  }
}

//// END stopwatch functions

//// START counter functions

// Define what happens when the user resets the counter
function resetCounter () {
  counter = 0
  countDisp.innerHTML = counter
  setAns()
  resetConfBox.style.display = 'none'
  document.getElementById('counterdown').classList.add('btn-secondary')
  showResetButtons()
}
// Define what happens when the user cancels a reset
function cancelReset () {
  resetConfBox.style.display = 'none'
  showResetButtons()
}
// Increase the current 'count'
function countup () {
  counter++
  countDisp.innerHTML = counter
  if (!timerRunning) {
    setAns()
  }
  if (counter > 0) {
    document.getElementById('counterdown').classList.remove('btn-secondary')
  }
  setMeta()
}
// Decrease the current 'count'
function countdown () {
  if (counter > 0) {
    counter--
  }
  if (counter === 0) {
    document.getElementById('counterdown').classList.add('btn-secondary')
  }
  countDisp.innerHTML = counter
  if (!timerRunning) {
    setAns()
  }
  setMeta()
}

//// END counter functions

//// START global functions

// define how to save the field's value in the form data
function setAns () {
  const ans = String(counter) + ' ' + String(timePassed)
  setMetaData(ans)
  setAnswer(ans)
}

function setMeta () {
  const ans = String(counter) + ' ' + String(timePassed)
  setMetaData(ans)
}

// define what happens when the user attempts to clear the response
function clearAnswer () {
  resetStopwatch()
  resetCounter()
  setAnswer('')
}

// Hide the reset buttons from the UI
function hideResetButtons () {
  for (var i = 0; i < resetButtons.length; i++) {
    resetButtons[i].style.display = 'none'
  }
}
// Show the reset buttons in the UI
function showResetButtons () {
  for (var i = 0; i < resetButtons.length; i++) {
    resetButtons[i].style.display = 'block'
  }
}
// Define the 'reset' function to allow either the stopwatch or the counter to use the same confirmation box
function restartconf (restarter) {
  const warningMessage = 'Are sure you would like to reset the <strong>' + restarter + '</strong>?'
  document.getElementById('confirmationMessage').innerHTML = warningMessage
  hideResetButtons()
  resetConfBox.style.display = 'block'
  if (restarter === 'timer') {
    document.getElementById('confirmReset').removeEventListener('click', resetCounter)
    document.getElementById('confirmReset').addEventListener('click', resetStopwatch)
  } else if (restarter === 'counter') {
    document.getElementById('confirmReset').removeEventListener('click', resetStopwatch)
    document.getElementById('confirmReset').addEventListener('click', resetCounter)
  }
}

// If the field label or hint contain any HTML that isn't in the form definition, then the < and > characters will have been replaced by their HTML character entities, and the HTML won't render. We need to turn those HTML entities back to actual < and > characters so that the HTML renders properly. This will allow you to render HTML from field references in your field label or hint.
function unEntity (str) {
  return str.replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

//// END global functions

//// START field setup/loading

// get the UI elements
var swDisp = document.querySelector('#stopwatch')
var unitDisp = document.querySelector('#unit')
var ssButton = document.querySelector('#startstop')
var countDisp = document.querySelector('#count')
var resetButtons = document.getElementsByClassName('restart-buttons')
var resetConfBox = document.getElementById('resetConfirmation')

// get parameters info
var timeUnit = getPluginParameter('time-unit')

// set up the timer and counter variables
var round = 1000 // efault, may be changed
var timePassed // ime passed so far
var counter = 0
var timerRunning = false
var startTime = 0 // his will get an actual value when the timer starts in startStopTimer()

if (fieldProperties.LABEL) {
  document.querySelector('.label').innerHTML = unEntity(fieldProperties.LABEL)
}
if (fieldProperties.HINT) {
  document.querySelector('.hint').innerHTML = unEntity(fieldProperties.HINT)
}

var metadata = getMetaData()

if (metadata == null) {
  timePassed = 0
} else {
  const parts = metadata.match(/[^ ]+/g)
  counter = parseInt(parts[0])
  timePassed = parseInt(parts[1])
}

// If the 'time-unit' parameter was supplied, make the appropriate adjustments
if (timeUnit == null) {
  timeUnit = 's'
}
if (timeUnit === 'ms') {
  round = 1
} else if (timeUnit === 'cs') {
  round = 10
} else if (timeUnit === 'ds') {
  round = 100
} else {
  round = 1000
}

// If the current value of 'count' is above 0 when the field loads, the 'decrease count' button should be blue
if (counter > 0) {
  document.getElementById('counterdown').classList.remove('btn-secondary')
}

// Show the current counter value
countDisp.innerHTML = counter

// Show the current stopwatch value
unitDisp.innerHTML = timeUnit

setInterval(timer, 1)

//// END field setup/loading
