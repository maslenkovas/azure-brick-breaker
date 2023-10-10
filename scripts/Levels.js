var switchLevel = false;
var createPattern = false;
const level1 = [
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]
];

const level2 = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2],
    [2, 2, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 2, 2],
    [2, 2, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 0, 0, 2, 2],
    [2, 2, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
];

const level3 = [
    [0, 0, 3, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 3, 0, 0],
    [0, 3, -1, 3, 0, 0, 0, 2, 2, 0, 0, 0, 3, -1, 3, 0],
    [0, 0, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


function createLevel(arr) {
    for (let row = 0; row < arr.length; row++) {
        brickArr[row] = [];
        for (let c = 0; c < arr[row].length; c++) {
            let x = (c * (Brick.offsetLeft + Brick.width) + Brick.offsetLeft);
            let y = ((row * (Brick.offsetTop + Brick.height) + Brick.offsetLeft) + Brick.marginTop);
            // let status = Math.ceil(Math.random() * 3);
            brickArr[row][c] = new Brick(x, y, arr[row][c]);
        }
    }
    switchLevel = false;
    createPattern = true
}