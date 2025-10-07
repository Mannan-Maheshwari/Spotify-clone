let currentsong = new Audio();
let songs = ["Afreen_Afreen.mp3", "Dhun.mp3", "Dior.mp3", "Jhol.mp3","Laal Pari.mp3","Supreme.mp3","Tenu Sang Rakhna.mp3"]; // Hardcoded list

const songUL = document.querySelector(".songlist ul");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("pre");
const nextBtn = document.getElementById("next");
const seekCircle = document.querySelector(".circle");
const songtime = document.querySelector(".songtime");


function formatSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2,'0')}:${String(remainingSeconds).padStart(2,'0')}`;
}


const playmusic = (track, autoplay = true) => {
    currentsong.src = "songs/" + track; // relative path
    document.querySelector(".songinfo").innerHTML = track;
    songtime.innerHTML = "00:00/00:00";

    if (autoplay) {
        currentsong.play().catch(err => console.log("Playback error:", err));
        playBtn.src = "svgs/pause.svg";
    } else {
        playBtn.src = "svgs/play.svg";
    }
};


songs.forEach(song => {
    songUL.innerHTML += `
        <li>
            <img class="invert" src="svgs/music.svg" alt="">
            <div class="info">${song.replaceAll("%20", " ")}</div>
            <img class="invert" src="svgs/play.svg" alt="">
        </li>`;
});


Array.from(songUL.getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", () => {
        playmusic(e.querySelector(".info").innerText);
    });
});


playBtn.addEventListener("click", () => {
    if (currentsong.paused) {
        currentsong.play();
        playBtn.src = "svgs/pause.svg";
    } else {
        currentsong.pause();
        playBtn.src = "svgs/play.svg";
    }
});


prevBtn.addEventListener("click", () => {
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if (index > 0) playmusic(songs[index - 1]);
    else playmusic(songs[songs.length - 1]);
});


nextBtn.addEventListener("click", () => {
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if (index < songs.length - 1) playmusic(songs[index + 1]);
    else playmusic(songs[0]);
});


currentsong.addEventListener("timeupdate", () => {
    if (currentsong.duration) {
        songtime.innerHTML = `${formatSeconds(currentsong.currentTime)}/${formatSeconds(currentsong.duration)}`;
        seekCircle.style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    }
});

currentsong.addEventListener("loadedmetadata", () => {
    songtime.innerHTML = `00:00/${formatSeconds(currentsong.duration)}`;
});


document.querySelector(".seekbar").addEventListener("click", () => {
    alert("BUY PREMIUM");
});


document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").classList.toggle("active");
});

playmusic(songs[0], true);
