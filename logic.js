const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeLeft = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 20;


startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current);
    }
}

function finishGame() {
    console.log(timeLeft.innerHTML);
    time = `Your score is: `
}

function setTime(timeValue) {
    timeLeft.innerHTML = `00:${timeValue}`
}