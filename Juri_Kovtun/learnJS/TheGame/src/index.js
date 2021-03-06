const fillColor = '#00b894';
const strokeColor = '#55efc4';

let timerID;
let nextMove;
const parkmanSize = 20;
let parkman = [20, 40];

const ctx = document.getElementById('game').getContext('2d');

// define outer border
const areaSize = 360;
let restrictedArea = Array(areaSize / parkmanSize * 4).fill().map(el => Array(2).fill(0));
for (let i = 0, j = 0; i < areaSize; i += parkmanSize, j++) {
    restrictedArea[j][0] = i;
    restrictedArea[j][1] = 0;
    restrictedArea[areaSize / parkmanSize + j][0] = areaSize - parkmanSize;
    restrictedArea[areaSize / parkmanSize + j][1] = i;
    restrictedArea[areaSize / parkmanSize * 2 + j][0] = 0;
    restrictedArea[areaSize / parkmanSize * 2 + j][1] = i;
    restrictedArea[areaSize / parkmanSize * 3 + j][0] = i;
    restrictedArea[areaSize / parkmanSize * 3 + j][1] = areaSize - parkmanSize;
}

function clearCanvas() {
    ctx.clearRect(0, 0, 360, 360);
}

function drawParkman([x, y]) {
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, parkmanSize, parkmanSize);
    ctx.strokeRect(x, y, parkmanSize, parkmanSize);
}


// Stop interval function
function stopParkman() {
    clearInterval(timerID);
}

let stopParkmanButton = document.getElementsByClassName('stop--parkman');
stopParkmanButton[0].addEventListener('click', stopParkman);

function goParkman() {
    timerID = setInterval(function () {
        clearCanvas();
        drawParkman(parkman);
        nextMove = calculateNextPosition(parkman);
        if (checkTheMove(nextMove, restrictedArea) === false) {
            parkman = nextMove
        }
        console.log(parkman);
        console.log(checkTheMove(parkman, restrictedArea));
    }, 300);
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
goParkman();


// directional movement
let direction = "noMotion";

function calculateNextPosition([x, y]) {
    if (direction === "left") return [x - parkmanSize, y];
    if (direction === "up") return [x, y - parkmanSize];
    if (direction === "right") return [x + parkmanSize, y];
    if (direction === "down") return [x, y + parkmanSize];
    if (direction === "noMotion") return [x, y];
}


// getting direction
document.addEventListener('keydown', function (pressed) {
    if (pressed.key === 'ArrowLeft') {
        direction = "left";
        return direction
    }
    if (pressed.key === 'ArrowUp') {
        direction = "up";
        return direction
    }
    if (pressed.key === 'ArrowRight') {
        direction = "right";
        return direction
    }
    if (pressed.key === 'ArrowDown') {
        direction = "down";
        return direction
    }
    if (pressed.key === ' ') {
        direction = "noMotion";
        return direction
    }
});

// check if the move is allowed
function checkTheMove([x, y], array) {
    for (let i = 0; i < array.length; i++) {
        if (JSON.stringify([x, y]) === JSON.stringify(array[i])) return true
    }
    return false
}


// var eq = Object.toJSON(user1) == Object.toJSON(user2);
// alert(eq);
// JSON.stringify(obj1) === JSON.stringify(obj2)



















