const musicPlayer = document.querySelector('.music-player');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('.fa-backward').parentElement;
const nextBtn = document.querySelector('.fa-forward').parentElement;
const audio = document.querySelector('#main-audio');
const progressArea = document.querySelector('.progress-area');
const progressBar = document.querySelector('.progress-bar');
const musicList = document.querySelector('.music-list');
const showMoreBtn = document.querySelector('.fa-bars').parentElement;
const hideMusicBtn = document.querySelector('.header .fa-times');

let musicIndex = 1;

// Sample music list - Replace with actual Tollywood songs
const allMusic = [
    {
        name: "Sample Telugu Song 1",
        artist: "Artist 1",
        src: "music/song1.mp3"
    },
    {
        name: "Sample Telugu Song 2",
        artist: "Artist 2",
        src: "music/song2.mp3"
    },
    // Add more songs here
];

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingSong();
});

function loadMusic(indexNumb) {
    const music = allMusic[indexNumb - 1];
    audio.src = music.src;
    document.querySelector('h1').innerText = music.name;
    document.querySelector('p').innerText = music.artist;
}

function playMusic() {
    musicPlayer.classList.add("paused");
    playBtn.querySelector("i").classList.remove("fa-play");
    playBtn.querySelector("i").classList.add("fa-pause");
    audio.play();
}

function pauseMusic() {
    musicPlayer.classList.remove("paused");
    playBtn.querySelector("i").classList.remove("fa-pause");
    playBtn.querySelector("i").classList.add("fa-play");
    audio.pause();
}

function prevMusic() {
    musicIndex--;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function nextMusic() {
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

playBtn.addEventListener("click", () => {
    const isMusicPlay = musicPlayer.classList.contains("paused");
    isMusicPlay ? pauseMusic() : playMusic();
    playingSong();
});

prevBtn.addEventListener("click", () => {
    prevMusic();
});

nextBtn.addEventListener("click", () => {
    nextMusic();
});

audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = document.querySelector(".current-time");
    let musicDuration = document.querySelector(".max-duration");

    audio.addEventListener("loadeddata", () => {
        let mainAdDuration = audio.duration;
        let totalMin = Math.floor(mainAdDuration / 60);
        let totalSec = Math.floor(mainAdDuration % 60);
        if (totalSec < 10) totalSec = `0${totalSec}`;
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) currentSec = `0${currentSec}`;
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
    let progressWidth = progressArea.clientWidth;
    let clickedOffsetX = e.offsetX;
    let songDuration = audio.duration;
    audio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
    playMusic();
});

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});

hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

function playingSong() {
    const allLiTags = document.querySelectorAll(".music-list ul li");
    for (let j = 0; j < allLiTags.length; j++) {
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
        }
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
        }
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

function clicked(element) {
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}