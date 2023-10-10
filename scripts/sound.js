var backgroundSound = new Audio("./media/backgroundSound.mp3")

let backgroundSoundIcon = document.getElementById("icon")

backgroundSoundIcon.style.textDecoration = "line-through";
let toggledIcon = false;

// backgroundSound.play();
backgroundSoundIcon.addEventListener("click", (e) => {
    if (!toggledIcon) {
        backgroundSoundIcon.style.textDecoration = "line-through";
        toggledIcon = true;
        backgroundSound.pause();
        // makeSomeNoise();
    } else {
        backgroundSoundIcon.style.textDecoration = "none";
        toggledIcon = false;
        backgroundSound.play();
    }
})

function makeSomeNoise() {
    backgroundSound.play();
}
console.log(backgroundSoundIcon)

// sounds src
let aud = document.createElement('AUDIO');
document.body.appendChild(aud);

aud.muted=false;
document.getElementById('mute').addEventListener('click',()=>{
    document.getElementById('mute').classList.toggle('fa-volume-high');
    document.getElementById('mute').classList.toggle('fa-volume-xmark');
    if (!aud.muted) {
        aud.muted = true;
    }else{
        aud.muted = false
    }
})