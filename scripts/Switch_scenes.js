let isPause = true;
//------------------------------- Start Game ----------------------------------//
document.getElementById('start').addEventListener('click', () => {

    timeout();
    
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'none';
    section.style.visibility = 'visible'
    document.querySelector('canvas').style.display = 'none'
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

})

//------------------------------- next-level------------------------//

document.getElementById('restart-level').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('game-over').style.display = 'none';
    createPattern = false;
    lives = 3;
    // isPause = true
    powers = []
    document.querySelector('.lives span').innerHTML = lives
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    newGame();
    
})
//-------------------------------next-level------------------------//

document.getElementById('next-level').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('up-level').style.display = 'none';
    createPattern = false;
    // isPause = true
    powers = []
    document.querySelector('.lives span').innerHTML = lives
    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);
    newGame();
})

//------------------------------- how to play ------------------------------------//

document.getElementById('help').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'none';
    document.getElementById('help-menu').style.display = 'flex';
})

document.getElementById('exit-help').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('help-menu').style.display = 'none';
})

//------------------------------------ About us ------------------------------------//
document.getElementById('about').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'none';
    document.getElementById('about-us').style.display = 'flex';
})

document.getElementById('exit-about').addEventListener('click', () => {
    aud.src = "media/click.wav"
    aud.play();
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('about-us').style.display = 'none';
})


//-------------- ready steady gooo ---------------------//
const startShowDiv = document.getElementById("startshow")
function timeout() {
    isPause = false
    startShowDiv.style.display = 'flex';
    startShowDiv.textContent = 'Ready!';
    setTimeout(myGreeting3, 1000);
    
}

function myGreeting3() {
    
    startShowDiv.textContent = "Steady!";
    const myTimeout2 = () => {
        setTimeout(myGreeting2, 1000);
    };
    myTimeout2();
}

function myGreeting2() {
    startShowDiv.textContent = "Go!";
    const myTimeout1 = () => {
        setTimeout(myGreeting1, 1000);
    };
    myTimeout1();
}

function myGreeting1() {
    startShowDiv.style.display = "none";
    isPause = true
    document.querySelector('canvas').style.display = 'block'
    
    
}

//------------------------ Return to menu -------------------------///
document.getElementById('return-menu').addEventListener('click', returnMenu);
document.getElementById('return-menu-level').addEventListener('click', returnMenu);

function returnMenu() {
    createPattern = false;
    score=0;
    lives = 3;
    level = 1;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('up-level').style.display = 'none';
    document.getElementById('next-level').style.display = 'inline-block';
    document.getElementById('menu').style.display = 'flex';
    document.querySelector('.score span').innerHTML = score
    section.style.visibility = 'hidden'
    document.querySelector('canvas').style.display = 'none'
    document.querySelector('.level span').innerHTML = level;

    isPause = true
    powers = []
    document.querySelector('.lives span').innerHTML = lives
}

///------------------------ pause scene ----------------------//

document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        isPause = isPause === true ? false : true;
        console.log(isPause);
    }
})

//------------------------game over scence------------------//
function outOfBounds() {

    lives--;
    document.querySelector('.lives span').innerHTML = lives
    powers = [];
    newGame();
    if (lives === 0) {

        document.getElementById('game-over').style.display = 'flex';
        aud.src = "media/gameOver.wav";
        aud.play().catch((err) => { console.log(err); });

        // const { addUserScore } = require("./cosmosdb.js");
        // // Call this function when the game ends with the player's username and score
        // addUserScore(0, "username", score);

        score = 0;

        // isPause = false
        document.querySelector('.score span').innerHTML = score
        document.removeEventListener("keydown", keyDown);
        document.removeEventListener("keyup", keyUp);

    }

}
