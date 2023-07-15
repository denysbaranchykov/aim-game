const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeLeft = document.querySelector('#time');
const board = document.querySelector('#board');
const timeHeader = document.querySelector('#time-left');
const colors = ['#16d9e3', 'green', 'blue', 'red', 'yellow', 'orange', 'purple'];


let circles = [];


let time = 0;
let score = 0;

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
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    setTime(time);
    createRandomCircle();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        setTime(current);
    }
}

function setTime(timeValue) {
    if (timeValue < 10) {
        timeLeft.innerHTML = `00:0${timeValue}`
    } else {
        timeLeft.innerHTML = `00:${timeValue}`
    }
}

function finishGame() {
    timeHeader.classList.add('hide-with-opacity');
// to remove time we can use timeLeft.parentNode.remove(); --> parentNode to apply to a parent
// because timeList is a child to all header
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
    restartGame();
}

function createRandomCircle() {
//todo: restart button

    const circle = document.createElement('div');
    circles.push(circle);
    const size = getRandomCircleSize(10, 50);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomCircleSize(0, width - 1.5 * size);
    const y = getRandomCircleSize(0, height - 1.5 * size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = getRandomCircleColor();
    circle.style.boxShadow = `0 0 8px ${getRandomCircleColor()}, 0 0 8px ${getRandomCircleColor()}`
    board.append(circle);
}

function getRandomCircleSize(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomCircleColor() {
    if(circles.length === 1) {
        return colors[0]
    }
    return colors[Math.floor(Math.random() * colors.length)];
}

function restartGame() {
    const restartBtn = document.createElement('button');
    restartBtn.style.width = '100px';
    restartBtn.style.height = '50px';
    restartBtn.style.background = '#83dc6a';
    restartBtn.style.position = 'absolute';
    restartBtn.style.top = '280px';
    restartBtn.style.left = 'auto';
    restartBtn.textContent = 'Restart';
    restartBtn.style.fontSize = '20px';
    restartBtn.style.cursor = 'pointer';
    restartBtn.style.color = 'rgba(27,31,59,0.83)';
    restartBtn.style.borderRadius = '10px';
    restartBtn.style.border = '2px solid #5f5';
    restartBtn.style.boxShadow = `0 0 10px ${getRandomCircleColor()}`;
    board.append(restartBtn);
}




