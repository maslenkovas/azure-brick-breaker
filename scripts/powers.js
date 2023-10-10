var power;
var powers = []
class Power {
    constructor(brick) {
        this.x = brick.x + (Brick.width / 2);
        this.y = brick.y + (Brick.height / 2);
        this.type = brick.power
        this.isCaught = false
    }
}

// ------------------ draw powers-------------------//
function drawPower() {
    for (let i = 0; i < powers.length; i++) {

        if (powers[i].y <= canv.height && isPause && !powers[i].isCaught) {
            powers[i].y++;
        }

        switch (powers[i].type) {
            case 'paddle':
                drawLine(powers[i])
                break;
            case 'life':
                drawHeart(powers[i])
                break;
            case 'ball':
                drawPowerBall(powers[i]);
                break;
            default:
                break;
        }
        ctx.closePath()
        catchPower()
        if ((powers[i].isCaught && powers[i].y < canv.height) || powers[i].y === canv.height) {
            powers.splice(i, 1)
        }
    }
}
// ------------------  create powers-------------------//

function createPower(brick) {
    power = new Power(brick);
    switch (power.type) {
        case 'paddle':
            drawLine(power)
            break;
        case 'life':
            drawHeart(power);
            break;
        case 'ball':
            drawPowerBall(power);
            break;
        default:
            break;
    }
    powers.push(power)
}
// ------------------  assign Powers -------------------//
function assignPowers() {
    let countPowers = 0;
    while (countPowers < 5) { //create powers random
        let r1 = Math.floor(Math.random() * 6);
        let c1 = Math.floor(Math.random() * 16)
        let r2 = Math.floor(Math.random() * 6);
        let c2 = Math.floor(Math.random() * 16)
        let r3 = Math.floor(Math.random() * 6);
        let c3 = Math.floor(Math.random() * 16)
        if (brickArr[r1][c1].status > 0 && brickArr[r1][c1].power === '') {
            brickArr[r1][c1].power = 'life';
            countPowers++;
        }
        if (brickArr[r2][c2].status > 0 && brickArr[r2][c2].power === '') {
            brickArr[r2][c2].power = 'paddle';
            countPowers++;
        }
        if (brickArr[r3][c3].status > 0 && brickArr[r3][c3].power === '') {
            brickArr[r3][c3].power = 'ball';
            countPowers++;
        }
    }
}

// ------------------ extend paddle power -------------------//
var id;
function powerPaddle() {
    paddle.w = 0.2 * game_Width
    id = setTimeout(() => { paddle.w = 0.1 * game_Width }, 10000)
}
function drawLine(power) {
    ctx.beginPath()
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(power.x, power.y, 20, 5);
    ctx.stroke()
}
// ------------------ get more life power -------------------//

function powerLife() {
    console.log('life');
    lives++;
    document.querySelector('.lives span').innerHTML = lives;
    
}
// draw hearts
function drawHeart(power) {

    var x = power.x;
    var y = power.y;
    var width = 20;
    var height = 20;

    ctx.save();
    ctx.beginPath();
    var topCurveHeight = height * 0.3;
    ctx.moveTo(x, y + topCurveHeight);
    // top left curve
    ctx.bezierCurveTo(
        x, y,
        x - width / 2, y,
        x - width / 2, y + topCurveHeight
    );

    // bottom left curve
    ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2,
        x, y + (height + topCurveHeight) / 2,
        x, y + height
    );

    // bottom right curve
    ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2,
        x + width / 2, y + (height + topCurveHeight) / 2,
        x + width / 2, y + topCurveHeight
    );

    // top right curve
    ctx.bezierCurveTo(
        x + width / 2, y,
        x, y,
        x, y + topCurveHeight
    );

    ctx.closePath();
    ctx.fillStyle = '#ff0000';
    ctx.fill();
    ctx.restore();

}
// ------------------ Balls power -------------------//

function drawPowerBall(power) {
    ctx.beginPath()
    ctx.fillStyle = '#ff0000';
    ctx.arc(power.x, power.y, 10, 0, 2 * Math.PI);
    ctx.fill()
}

function powerBall() {
    for (let index = 0; index < 2; index++) {
        let currentBall = balls[0];
        // currentBall = balls[balls.length+index];
        let NewBall = new Ball();
        NewBall.y = currentBall.y;
        NewBall.x = currentBall.x;
        NewBall.spd = currentBall.spd;
        NewBall.dx = Math.ceil(Math.random() * 7);
        NewBall.dy = -Math.ceil(Math.random() * 7);
        balls.push(NewBall);
    }
}

//-------------------------- catch powers ----------------//
function determineY(power) {
    let begin_y;
    let end_y;
    switch (power.type) {
        case 'paddle':
            begin_y = paddle.y - paddle.h / 2 - 5;
            end_y = paddle.y + paddle.h / 2 - 5;
            break;
        case 'life':
            begin_y = paddle.y - 20;
            end_y = paddle.y;
            break;
        case 'ball':
            begin_y = paddle.y - 20;
            end_y = paddle.y + 10;
            break;
    }
    if (Math.ceil(power.y) > Math.ceil(begin_y) &&
        Math.ceil(power.y) < Math.ceil(end_y)) {
        return true
    } else {
        return false;
    }
}
function catchPower() {
    let begin_x = paddle.x - (paddle.w / 2)
    let end_x = paddle.x + (paddle.w / 2)

    for (var i = 0; i < powers.length; i++) {
        if (powers[i].x > begin_x &&
            powers[i].x < end_x &&
            determineY(powers[i]) &&
            !powers[i].isCaught) {
            aud.src = "media/gain power.wav";
            aud.play().catch((err) => { console.log(err); });
            powers[i].isCaught = true;
            if (powers[i].type === 'paddle') {
                clearTimeout(id);
                powerPaddle()
            } else if (powers[i].type === 'life') {
                powerLife()
            }
            else if (powers[i].type === 'ball') {
                powerBall()
            }
        }
    }
}
