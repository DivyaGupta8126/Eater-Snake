//Constants and Variables
let inputdir = { x: 0, y: 0 };
let speed = 6;
let lastPaintTime = 0;
let snakeArray = [
    { x: 10, y: 15 }
];
let food = { x: 12, y: 10 };
let score = 0, scoreEle;
scoreEle = document.getElementById("score");
scoreEle.innerText = "Score : " + score;
let prescore = 0;
let highscore=0;
let highscoreEle=document.getElementById('highscore');
highscoreEle.innerText="HighScore : "+JSON.parse(sessionStorage.getItem("HighScore"));
if(JSON.parse(sessionStorage.getItem("HighScore")===null))
highscoreEle.innerText="HighScore : "+"0";
let collideAudio=new Audio("collide.wav");
let eatingAudio=new Audio("eating.wav");


//Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide() {
    //Colliding with its body part
    for (i = 1; i < snakeArray.length; i++) {
        if ((snakeArray[i].x === snakeArray[0].x) && (snakeArray[i].y === snakeArray[0].y))
            return true;
    }
    //Colliding with the walls
    if (snakeArray[0].x >= 18 || snakeArray[0].x <= 0 || snakeArray[0].y >= 18 || snakeArray[0].y <= 0)
        return true;

    return false;

}

function gameEngine() {

    if (isCollide()) {
        collideAudio.play();
        alert("Oops! Game Over");
        inputdir = { x: 0, y: 0 };
        snakeArray = [
            { x: 10, y: 15 }
        ];
       sessionStorage.setItem("HighScore",JSON.stringify(highscore));
        if(score>highscore)
        {
            highscore=score;
            sessionStorage.setItem("HighScore",JSON.stringify(highscore));
            
        }
    
        highscoreEle.innerText="HighScore : "+JSON.parse(sessionStorage.getItem("HighScore"));

        score = 0;
        speed=6;
        scoreEle.innerText = "Score : " + score;
    }

    if (score - prescore >=10) {
        speed++;
        prescore = score;
    }

    //if snake have eaten the food
    if (snakeArray[0].x === food.x && snakeArray[0].y === food.y) {
        snakeArray.unshift({ x: snakeArray[0].x + inputdir.x, y: snakeArray[0].y + inputdir.y });
        score++;
        eatingAudio.play();


        scoreEle.innerText = "Score : " + score;
        let a = 2;
        let b = 15;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    //Moving the snake
    for (i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }
    }
    snakeArray[0].x = snakeArray[0].x + inputdir.x;
    snakeArray[0].y = snakeArray[0].y + inputdir.y;


    //Printing the snake 
    let board = document.getElementById("board");
    board.innerHTML = "";
    for (i = 0; i < snakeArray.length; i++) {
        let snakeEle = document.createElement('div');
        snakeEle.style.gridColumnStart = snakeArray[i].x;
        snakeEle.style.gridRowStart = snakeArray[i].y;
        if (i === 0) {
            snakeEle.className = "head";
        }
        else {
            snakeEle.className = "snake";
        }
        board.appendChild(snakeEle);

    }

    //Printing the food
    let foodEle = document.createElement('div');
    foodEle.style.gridColumnStart = food.x;
    foodEle.style.gridRowStart = food.y;
    foodEle.className = "food";
    board.appendChild(foodEle);
}



//Main code
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    switch (e.key) {
        case "ArrowUp":
            inputdir.x = 0;
            inputdir.y = -1;
            break;

        case "ArrowDown":
            inputdir.x = 0;
            inputdir.y = 1;
            break;

        case "ArrowLeft":
            inputdir.x = -1;
            inputdir.y = 0;
            break;

        case "ArrowRight":
            inputdir.x = 1;
            inputdir.y = 0;
            break;
    }
})
