//dom elements
let playButton = document.querySelector("#play");
let timer = document.querySelector(".time");
let backwardButton = document.querySelector(".fa-backward");
let forwardButton= document.querySelector('.fa-forward');
let circle = document.querySelector(".circle");
let sess = document.querySelector("#session");
let roundNumber = document.querySelector("#rounds");
let bars = document.querySelector('#bars');
let settingsPage = document.querySelector('.settings-page');
let pointsRounds = document.querySelector("#points-rounds");
let pointsWork = document.querySelector('#points-work');
let pointsBreak = document.querySelector('#points-break');
let outputWork = document.querySelector('#output-work');
let outputBreak = document.querySelector('#output-break');
let outputRounds = document.querySelector('#output-rounds');
let resetSession = document.querySelector('#reset-session');

settingsPage.style.display = "none";
let type = 'Work';
let isClockRunning = false;
let workRoundDuration = 25*60;
let breakRoundDuration = 5*60;
let timeLeft = workRoundDuration;
let numberOfBreaks = 0;
let roundsPerSession = 4;

const toggleClock = (reset) => {
    if(reset){
       clearInterval(interval);
       if(type === "Break"){
           timeLeft = breakRoundDuration;
       }else{
           timeLeft = workRoundDuration;
       }
       timer.textContent = displayTime();
       if(isClockRunning === true){
           isClockRunning = false;
           togglePlayButton();
       }
    } else {
    if (isClockRunning === true){
       clearInterval(interval);
       isClockRunning = false;
    } else {
        isClockRunning = true;
        interval = setInterval(() => {
            stepDown();
            timer.textContent = displayTime();
        }, 1000);
    }
  }
}

function displayTime(){
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft%60;
    if(m<10){
        m = `0${m}`;
    }
    if(s<10){
        s = `0${s}`;
    }
    return `${m}:${s}`;
}

function togglePlayButton(){
    playButton.classList.toggle("fa-play");
    playButton.classList.toggle("fa-pause");
}

function toggleMenuButton(){
    bars.classList.toggle("fa-bars");
    bars.classList.toggle("fa-times");
}

function toggleDisplay(){
    if(settingsPage.style.display === "none"){
        settingsPage.style.display = "flex";
    }else{
        settingsPage.style.display = "none";
    }
}

function stepDown() {
    if(timeLeft === 0){
        if(type === "Work"){
            type = "Break";
            circle.style.borderColor = "#56f25a";
            sess.textContent = "Break";
            numberOfBreaks++;
            if(numberOfBreaks === roundsPerSession){
                timeLeft = breakRoundDuration*2;
            }else{
                timeLeft = breakRoundDuration;
            }
        }else{
            type ="Work";
            timeLeft = workRoundDuration;
            if(numberOfBreaks === roundsPerSession){
                clearInterval(interval);
                togglePlayButton();
                isClockRunning = false;
                numberOfBreaks = 0;
            }
            circle.style.borderColor= "#e7363e";
            sess.textContent = "Working";
            roundNumber.textContent = `${numberOfBreaks+1}/${roundsPerSession}`;
        }
    }else{
        timeLeft--;
    }
}

function newSettings(newType, newWork, newBreak, newRound){
    type = newType;
    workRoundDuration = parseInt(newWork)*60;
    breakRoundDuration = parseInt(newBreak)*60;
    roundsPerSession = newRound;
    timeLeft = workRoundDuration;
    isClockRunning = false;
    toggleDisplay();
    toggleMenuButton();
    timer.textContent = displayTime();
    roundNumber.textContent = `1/${roundsPerSession}`;
    console.log("hey");
}

//event listeners
playButton.addEventListener("click", () => {
    toggleClock();
    togglePlayButton();
});

backwardButton.addEventListener("click", () => {
    toggleClock(true);
});

forwardButton.addEventListener("click", () => {
    timeLeft = 0;
});

bars.addEventListener("click", () => {
    toggleDisplay();
    toggleMenuButton();
});

pointsWork.addEventListener("input", () => {
    let p = pointsWork.value;
    if(p<10){
        p = `0${p}`;
    }
    outputWork.textContent = `${p}:00`;
});

pointsRounds.addEventListener("input", () => {
    outputRounds.textContent = pointsRounds.value;
});

pointsBreak.addEventListener("input", () => {
    let p = pointsBreak.value;
    if(p<10){
        p = `0${p}`;
    }
    outputBreak.textContent = `${p}:00`;
});

resetSession.addEventListener("click", () => {
    newSettings("short", pointsWork.value, pointsBreak.value, pointsRounds.value);
});