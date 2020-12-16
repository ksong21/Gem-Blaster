// Constants
const STARTING_SCORE = 0;
const YELLOW_ADD_SCORE = 100;
const YELLOW_RESPAWN_TIMER = 2000;
const GREEN_ADD_SCORE = 100;
const GREEN_RESPAWN_TIMER = 2000;
const X_ADJUSTMENT = 260;
const Y_ADJUSTMENT = 290;
const Y_RESTRICTION = window.innerHeight * 0.16;
const AUDIO_RESTRICTION = 600;
const NUM0 = 0;
const NUM1 = 1;
const NUM2 = 2;
const NUM50 = 50;
const NUM100 = 100;
const NUM250 = 250;

// Global variables
let explodeSound = document.createElement("AUDIO");
let endButton = document.getElementById("end");
let score = STARTING_SCORE;
let isExplodingYellow = false;
let target1 = document.createElement('img');
let startTimerYellow;
let timerYellow;
let isExplodingGreen = false;
let target2 = document.createElement('img');
let startTimerGreen;
let timerGreen;

// Create audio object
explodeSound.setAttribute("src", "src/explosion.mp3");

// Start game function
function start() {
    // Create yellow object
    clearInterval(startTimerYellow);
    clearInterval(timerYellow);
    isExplodingYellow = false;
    target1.setAttribute("style", "width:200px;position:absolute");
    target1.setAttribute("src", "images/gemyellow.gif");
    target1.setAttribute("id", "yellow");
    target1.style.left = window.innerWidth / NUM2 - NUM250 + "px";
    target1.style.top = window.innerHeight / NUM2 - NUM100 + "px";
    document.body.appendChild(target1);
    startTimerYellow = setInterval(function(){repositionYellow();}, YELLOW_RESPAWN_TIMER);

    // Create green object
    clearInterval(startTimerGreen);
    clearInterval(timerGreen);
    isExplodingGreen = false;
    target2.setAttribute("style", "width:200px;position:absolute");
    target2.setAttribute("src", "images/gemgreen.gif");
    target2.setAttribute("id", "green");
    target2.style.left = window.innerWidth / NUM2 + NUM50 + "px";
    target2.style.top = window.innerHeight / NUM2 - NUM100 + "px";
    document.body.appendChild(target2);
    startTimerGreen = setInterval(function(){repositionGreen();}, GREEN_RESPAWN_TIMER);
}

// Click yellow object handler
target1.onclick = yellowHandler;
function yellowHandler() {
    if (isExplodingYellow) {
        return;
    }
    isExplodingYellow = true;
    clearInterval(startTimerYellow);
    clearInterval(timerYellow);
    explodeYellow();
    scoreYellow();
    timerYellow = setInterval(function(){repositionYellow();}, YELLOW_RESPAWN_TIMER);
}

// Click green object handler
target2.onclick = greenHandler;
function greenHandler() {
    if (isExplodingGreen) {
        return;
    }
    isExplodingGreen = true;
    clearInterval(startTimerGreen);
    clearInterval(timerGreen);
    explodeGreen();
    scoreGreen();
    timerGreen = setInterval(function(){repositionGreen();}, GREEN_RESPAWN_TIMER);
}

// Explode yellow object
function explodeYellow() {
    explodeSound.play();
    document.getElementById("yellow").setAttribute("src", "images/explode.gif");
    setTimeout(function(){document.getElementById("yellow").setAttribute("src", "");}, AUDIO_RESTRICTION);
}

// Explode green object
function explodeGreen() {
    explodeSound.play();
    document.getElementById("green").setAttribute("src", "images/explode.gif");
    setTimeout(function(){document.getElementById("green").setAttribute("src", "");}, AUDIO_RESTRICTION);
}

// Reposition yellow object
function repositionYellow() {
    document.getElementById("yellow").setAttribute("src", "images/gemyellow.gif");
    let xy1 = randomXY();
    target1.style.left = xy1[NUM0] + "px";
    target1.style.top = xy1[NUM1] + "px";
    isExplodingYellow = false;
}

// Reposition green object
function repositionGreen() {
    document.getElementById("green").setAttribute("src", "images/gemgreen.gif");
    let xy2 = randomXY();
    target2.style.left = xy2[NUM0] + "px";
    target2.style.top = xy2[NUM1] + "px";
    isExplodingGreen = false;
}

// Score yellow object
function scoreYellow() {
    score += YELLOW_ADD_SCORE;
    document.getElementById("score").innerHTML = "Score: " + score;
}

// Score green object
function scoreGreen() {
    score += GREEN_ADD_SCORE;
    document.getElementById("score").innerHTML = "Score: " + score;
}

// Random XY placement and restrictions
function randomXY() {
    let x;
    while (NUM0 == NUM0) {
        x = Math.floor(Math.random() * window.innerWidth) - X_ADJUSTMENT;
        if (x > NUM0) {
            break;
        }
    }
    let y;
    while (NUM0 == NUM0) {
        y = Math.floor(Math.random() * window.innerHeight) - Y_ADJUSTMENT;
        if (y > Y_RESTRICTION) {
            break;
        }
    }
    return [x, y];
}

// End game function
function end() {
    score = NUM0;
    document.getElementById("score").innerHTML = "Score: " + score;
}

// Click end game handler
endButton.onclick = endHandler;
function endHandler() {
    end();
    start();
}

start();