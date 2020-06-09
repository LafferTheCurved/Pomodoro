let playButton = document.querySelector(".fa-play");
let timer = document.querySelector(".time");
let backwardButton = document.querySelector(".fa-backward");
let stopCountdown = false;

function countdown(){
    playButton.removeEventListener('click', countdown);
    let seconds;
    let interval = setInterval(function(){
        if(stopCountdown === true){
            clearInterval(interval);
            playButton.addEventListener('click', countdown);
            stopCountdown = false;
            return;
        }
        seconds = minutesToSeconds();
        seconds--;
        timer.textContent = secondsToMinutes(seconds);
        if(seconds <= 0){
            clearInterval(interval);
        }
    }, 1000);
}

// setTimer(25)
// startTimer()
// pauseTimer()

function minutesToSeconds () {
    let arr = timer.textContent.split(":");
    return parseInt(arr[0])*60 + parseInt(arr[1]);
}

function secondsToMinutes(seconds){
    let m = Math.floor(seconds / 60);
    let s = seconds%60;
    if(m<10){
        m = `0${m}`;
    }
    if(s<10){
        s = `0${s}`;
    }
    return `${m}:${s}`;
}

function skipBack(s){
    stopCountdown = true;
    timer.textContent =  `${s}:00`;
}



playButton.addEventListener("click", countdown);
backwardButton.addEventListener("click", () => skipBack(25));

