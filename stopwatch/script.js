// script.js

let startTime;
let updatedTime;
let running = false;
let timerInterval;
let lapCount = 0;
let totalTime = 0;

const timeDisplay = document.getElementById("time-display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapList = document.getElementById("lap-list");

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - totalTime;
        timerInterval = setInterval(updateTime, 1);
        startStopBtn.innerText = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.innerText = "Resume";
        running = false;
        totalTime = updatedTime - startTime;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    let elapsedTime = updatedTime - startTime;
    
    let hours = Math.floor((elapsedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    
    timeDisplay.innerText = `${hours}:${minutes}:${seconds}`;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    running = false;
    totalTime = 0;
    timeDisplay.innerText = "00:00:00";
    startStopBtn.innerText = "Start";
    lapList.innerHTML = "";  // Clear lap times
}

function recordLap() {
    if (running) {
        lapCount++;
        let lapTime = updatedTime - startTime;
        
        let hours = Math.floor((lapTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((lapTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((lapTime % (1000 * 60)) / 1000);
        
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        
        const lapItem = document.createElement("li");
        lapItem.innerText = `Lap ${lapCount}: ${hours}:${minutes}:${seconds}`;
        lapList.appendChild(lapItem);
    }
}

// Event Listeners
startStopBtn.addEventListener("click", startStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);
