var score = 0;
var highScore = score
var bricksHit =0;
var BALL_SPD = 0.006; // starting ball speed as a fraction of screen height per second
const BALL_SPIN = 1; // ball deflection off the paddle (0 = no spin, 1 = high spin)
const COLOR_BALL = "white";
///--------------------------local storage -------------------------////
document.querySelector('.high-score span').innerHTML = localStorage.getItem("highScore", highScore)
class Ball {
    constructor() {
        this.radius = wall * 0.75;
        this.x = paddle.x;
        this.y = paddle.y - paddle.h / 2 - this.radius;
        this.spd = BALL_SPD * (height > game_Width ? height : game_Width);
        this.dx = 0;
        this.dy = 0;
    }
}
//------------------------- draw ball ---------------------//
function drawBall() {
    for (i = 0; i < balls.length; i++) {
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.closePath;
    }
}
//------------------------- serve ball ---------------------//

function serve() {

    // ball already in motion
    if (balls[0].dy != 0) {
        return false;
    }

    // random angle, between 45 and 135 degrees
    let angle = Math.random() * Math.PI / 2 + Math.PI / 4;
    applyBallSpeed(angle, 0);
    return true;
}
//------------------------- change angle of  ball ---------------------//

function applyBallSpeed(angle, i) {

    // keep the angle between 30 and 150 degrees
    if (angle < Math.PI / 6) {
        angle = Math.PI / 6;
    } else if (angle > Math.PI * 5 / 6) {
        angle = Math.PI * 5 / 6;
    }
    // update the x and y velocities of the ball
    balls[i].dx = balls[i].spd * Math.cos(angle);
    balls[i].dy = -balls[i].spd * Math.sin(angle);
}
//------------------------- ball & bricks collision ---------------------//

function ballBricksCollision() {
    for (i = 0; i < balls.length; i++) {
        for (let row = 0; row < Brick.rows; row++) {
            for (let c = 0; c < Brick.cols; c++) {
                let bk = brickArr[row][c];
                if (bk.status) {

                    if (bk.x < balls[i].x + balls[i].radius
                        && bk.x + Brick.width > balls[i].x - balls[i].radius
                        && balls[i].y + balls[i].radius > bk.y
                        && balls[i].y - balls[i].radius < bk.y + Brick.height) {
                        aud.src = " media/hit brick.wav";
                        aud.play().catch((err) => { console.log(err); });
                        if (bk.status > 0) {
                            score += bk.status; //score based on the bricks' status
                            bricksHit++;
                        }
                        if (bricksHit === 3) { 
                            assignPowers(); //assign powers to bricks after 3 bricks are hit
                        }
                        //high score
                        highScore = localStorage.getItem("highScore", highScore)
                        if (score > highScore) {
                            highScore = score
                            localStorage.setItem("highScore", highScore)
                            document.querySelector('.high-score span').innerHTML = highScore
                        }
                        document.querySelector('.score span').innerHTML = score

                        if (bk.power !== '') {
                            createPower(bk);
                            bk.power = '';
                        }

                        if (bk.status === 3 || bk.status === 2 || bk.status === 1) {
                            balls[i].dy = -balls[i].dy
                            bk.status--;
                        } else if (bk.status === 0) {
                            bk.status === false
                            bk.status--;
                        }
                        else if (bk.status === -1) {
                            balls[i].dy = -balls[i].dy
                            balls[i].dx = -balls[i].dx
                        }
                    }
                }
            }
        }
    }
}
//------------------------- Update ball movement ---------------------//

function updateBall() {
    for (let i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].dx;
        balls[i].y += balls[i].dy;
        // move the stationary ball with the paddle
        if (balls[i].dy == 0) {
            balls[i].x = paddle.x;
        }
        // bounce the ball off the walls
        if (balls[i].x < wall + balls[i].radius) {
            balls[i].x = wall + balls[i].radius;
            balls[i].dx = -balls[i].dx;
            aud.src = "media/wall.m4a";
            aud.play().catch((err) => { console.log(err); });
        } else if (balls[i].x > game_Width - wall - balls[i].radius) {
            balls[i].x = game_Width - wall - balls[i].radius;
            balls[i].dx = -balls[i].dx;
            aud.src = "media/wall.m4a";
            aud.play().catch((err) => { console.log(err); });
        } else if (balls[i].y < wall + balls[i].radius) {
            balls[i].y = wall + balls[i].radius;
            balls[i].dy = -balls[i].dy;
            aud.src = "media/wall.m4a";
            aud.play().catch((err) => { console.log(err); });
        }

        // bounce off the paddle
        if (balls[i].y > paddle.y - paddle.h * 0.5 - balls[i].radius
            && balls[i].y < paddle.y
            && balls[i].x > paddle.x - paddle.w * 0.5 - balls[i].radius
            && balls[i].x < paddle.x + paddle.w * 0.5 + balls[i].radius) {
            aud.src = "media/paddle.m4a";
            aud.play().catch((err) => { console.log(err); });
            balls[i].y = paddle.y - paddle.h * 0.5 - balls[i].radius;
            balls[i].dy = -balls[i].dy;

            // modify the angle based off ball spin
            let angle = Math.atan2(-balls[i].dy, balls[i].dx);
            angle += (Math.random() * Math.PI / 2 - Math.PI / 4) * BALL_SPIN;
            applyBallSpeed(angle, i);
        }

        // handle out of bounds
        if (balls[i].y > height) {
            balls.splice(i, 1);
            if (balls.length == 0)
                outOfBounds();
        }

        // ball brick collision
        ballBricksCollision();
    }
}
