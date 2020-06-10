//dom elements
let playButton = document.querySelector("#play");
let timer = document.querySelector(".time");
let backwardButton = document.querySelector(".fa-backward");
let forwardButton= document.querySelector('.fa-forward');
let circle = document.querySelector(".circle");
let sess = document.querySelector("#session");
let roundNumber = document.querySelector("#rounds");


let type = 'Work';
let isClockRunning = false;
let workRoundDuration = 25*60;
let breakRoundDuration = 5*60;
let timeLeft = workRoundDuration;
let numberOfBreaks = 0;
let roundsPerSession = 4;
let numberOfSessions = 2;
let totalRounds = roundsPerSession*numberOfSessions;

const toggleClock = (reset) => {
    if(reset){
       clearInterval(interval);
       timeLeft = workRoundDuration
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

function stepDown() {
    if(timeLeft === 0){
        if(type === "Work"){
            type = "Break";
            circle.style.borderColor = "#56f25a";
            sess.textContent = "Break";
            numberOfBreaks++;
            if(numberOfBreaks === 4){
                timeLeft = breakRoundDuration*2;
            }else{
                timeLeft = breakRoundDuration;
            }
        }else{
            type ="Work";
            timeLeft = workRoundDuration;
            if(numberOfBreaks === 4){
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