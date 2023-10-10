let brickArr = [];
class Brick {
    static cols = 16;
    static rows = 6;
    static marginTop = 30;
    static width = (canv.width / 16) - 32;
    static height = 20;
    static offsetTop = 20;
    static offsetLeft = 30;
    constructor(x, y, l, p = '') {
        this.x = x;
        this.y = y;
        this.status = l; //life 3,2,1,0
        this.power = p
    }
}
//------------------------- Draw Bricks--------------------//
function drawBricks() {
    switchLevel = true;
    for (let row = 0; row < Brick.rows; row++) {
        for (let c = 0; c < Brick.cols; c++) {
            let bk = brickArr[row][c];
            if (brickArr[row][c].status === 1) {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
                switchLevel = false;
            } else if (brickArr[row][c].status === 2) {
                ctx.fillStyle = '#33eecc';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
                switchLevel = false;
            } else if (brickArr[row][c].status === 3) {
                ctx.fillStyle = '#3322cc';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
                switchLevel = false;
            }
            else if (brickArr[row][c].status === -1) {
                ctx.fillStyle = '#808080';
                ctx.fillRect(bk.x, bk.y, Brick.width, Brick.height);
            }
        }
    }

}

