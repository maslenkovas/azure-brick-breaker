//------------------------------------------
canv.addEventListener("touchcancel", touchCancel);
canv.addEventListener("touchend", touchEnd);
canv.addEventListener("touchmove", touchMove);
canv.addEventListener("touchstart", touchStart);
//-----------------------------------------------------
const COLOR_PADDLE = "white";
const PADDLE_SPD = 0.009; // fraction of screen width per second
let PADDLE_W = 0.1; // paddle width as a fraction of screen width

// definitions
const Direction = {
    LEFT: 0,
    RIGHT: 1,
    STOP: 2
}

function Paddle() {
    this.w = PADDLE_W * game_Width;
    this.h = wall;
    this.x = game_Width / 2;
    this.y = height - this.h * 2;
    this.spd = PADDLE_SPD * (height > game_Width ? height : game_Width);
    this.dx = 0;
}
function drawPaddle() {
    ctx.fillStyle = COLOR_PADDLE;
    ctx.fillRect(paddle.x - paddle.w * 0.5, paddle.y - paddle.h * 0.5, paddle.w, paddle.h);
}

//---------------- keys movements ------------------ //
function keyDown(ev) {
    switch (ev.keyCode) {

        case 32: // space bar (serve the ball)
            serve();
            break;
        case 37: // left arrow (move paddle left)
            movePaddle(Direction.LEFT);
            break;
        case 39: // right arrow (move paddle right)
            movePaddle(Direction.RIGHT);
            break;
    }
}

function keyUp(ev) {
    switch (ev.keyCode) {
        case 37: // left arrow (stop moving)
        case 39: // right arrow (stop moving)
            movePaddle(Direction.STOP);
            break;
    }
}



// For Mobile screens
function touch(x) {
    if (!x) {
        movePaddle(Direction.STOP);
    } else if (x > paddle.x) {
        movePaddle(Direction.RIGHT);
    } else if (x < paddle.x) {
        movePaddle(Direction.LEFT);
    }
}

function touchCancel(ev) {
    touch(null);
}

function touchEnd(ev) {
    touch(null);
}

function touchMove(ev) {
    touch(ev.touches[0].clientX);
}

function touchStart(ev) {
    if (serve()) {
        return;
    }
    touch(ev.touches[0].clientX);
}


function movePaddle(direction) {
    switch (direction) {
        case Direction.LEFT:
            paddle.dx = -paddle.spd;
            break;
        case Direction.RIGHT:
            paddle.dx = paddle.spd;
            break;
        case Direction.STOP:
            paddle.dx = 0;
            break;
    }
}

function updatePaddle() {
    paddle.x += paddle.dx;

    // stop paddle at walls
    if (paddle.x < wall + paddle.w / 2) {
        paddle.x = wall + paddle.w / 2;
    } else if (paddle.x > game_Width - wall - paddle.w / 2) {
        paddle.x = game_Width - wall - paddle.w / 2;
    }
}
