// game variables
var level = 1;
var lives = 3;
const MAX_LEVEl = 3;
var balls, paddle;
//-------------------------------------------------//
document.querySelector('.level span').innerHTML = level;
window.addEventListener("resize", newGame);
//-------------------newGame--------------------//
function newGame() {
    paddle = new Paddle();
    balls = [new Ball()];
}
//----------------------- game loop--------------------//
function gameLoop() {

    // update
    if (!createPattern) {
        bricksHit=0;
        switch (level) {
            case 1:
                BALL_SPD = 0.005;
                createLevel(level1);
                break;
            case 2:
                BALL_SPD = 0.007;
                newGame();
                createLevel(level2);
                break;
            case 3:
                BALL_SPD = 0.009;
                newGame();
                createLevel(level3);
                break;
            default:
                switchLevel = false;
                isPause = false;
                break;
        }


    }

    if (switchLevel) {
        aud.src = "media/success-fanfare-trumpets-6185.mp3"
        aud.play();

        if (level == MAX_LEVEl)
            document.getElementById('next-level').style.display = 'none';
        document.getElementById('up-level').style.display = 'flex';
        document.querySelector('#up-level h1').textContent = `Congrats You Passed Level ${level}`;
        // isPause = false;
        level++;
        powers = []
        //display level
        document.querySelector('.level span').innerHTML = level;
        createPattern = false;
        document.removeEventListener("keydown", keyDown);
        document.removeEventListener("keyup", keyUp);
    }
    if (isPause === true) {

        updatePaddle();
        updateBall();
    }
    
    // draw
    drawBackground();
    drawWalls();
    drawPaddle();
    drawBall();
    drawBricks()
    drawPower()
    // call the next loop
    requestAnimationFrame(gameLoop);
}
//----------------------- Starter--------------------//
function start() {
    newGame();
    gameLoop();
}
start();
