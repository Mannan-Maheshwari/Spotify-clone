let currentsong = new Audio();
let songs

function formatSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getSongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/");
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }

    return songs;
}

const playmusic = (track, pause = false ) =>{
    // let audio = new Audio("/songs/" + track)
    currentsong.src = "/songs/" + track
    if(!pause){
        currentsong.play()
        play.src = "pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track)
    document.querySelector(".songtime").innerHTML ="00:00/00:00"
}

async function main() {
    songs = await getSongs();
    console.log(songs);
    playmusic(songs[0],true)

    let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];

    for (const song of songs) {
        songUL.innerHTML = songUL.innerHTML + `
            <li> 
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                    ${song.replaceAll("%20", " ")}
                </div> 
                <img class="invert" src="play.svg" alt="">
            </li>`;
    }

    // Attaches an event listener to every song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").innerText);
            playmusic(e.querySelector(".info").innerText);
        });
    });

    //attach an event listen to play next and previous
    play.addEventListener("click", ()=>{
        if(currentsong.paused){
            currentsong.play()
            play.src = "pause.svg";
        }
        else{
            currentsong.pause()
            play.src = "play.svg";
        }
    })


    //listen for tume upate event 

    currentsong.addEventListener("timeupdate", ()=>{
        console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `${formatSeconds(currentsong.currentTime)}/${formatSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left =  (currentsong.currentTime/currentsong.duration)*100 + "%"
    });
    
    
    // Add an event listener to previous
    // previous.addEventListener("click", () => {
    //     currentsong.pause()
    //     console.log("Previous clicked")
    //     let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
    //     if ((index - 1) >= 0) {
    //         playMusic(songs[index - 1])
    //     }
    // })'

    // // Add an event listener to next
    // next.addEventListener("click", () => {
    //     currentSong.pause()
    //     console.log("Next clicked")

    //     let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
    //     if ((index + 1) < songs.length) {
    //         playMusic(songs[index + 1])
    //     }
    // }) 
    
    // Add seekbar click event listener only once
    document.querySelector(".seekbar").addEventListener("click", function() {
        alert("BUY PREMIUM");
    });
    // 📱 Toggle sidebar on hamburger click
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector(".left").classList.toggle("active");
});

const prevBtn = document.getElementById("pre");
const nextBtn = document.getElementById("next");

prevBtn.addEventListener("click", () => {
  let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
  if (index > 0) {
    playmusic(songs[index - 1]);
  } else {
    playmusic(songs[songs.length - 1]);
  }
});

nextBtn.addEventListener("click", () => {
  let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
  if (index < songs.length - 1) {
    playmusic(songs[index + 1]);
  } else {
    playmusic(songs[0]);
  }
});


}

main();
