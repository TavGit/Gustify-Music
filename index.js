const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'bahan/DJ DOMBA KURING.mp3',
        displayName: 'DJ Domba Kuring X Saha Jaluna',
        cover: 'bahan/dj domba kuring.jpg',
        artist: 'Arjuna Present',
    },
    {
        path: 'bahan/Tak Segampang Itu.mp3',
        displayName: 'Tak Segampang Itu',
        cover: 'bahan/Tak segampang itu.jpg',
        artist: 'Anggi Marito',
    },
    {
        path: 'bahan/DUKA.mp3',
        displayName: 'Duka',
        cover: 'bahan/Duka.jpg',
        artist: 'Last Child',
    },
    {
        path: 'bahan/Tak kan hilang.mp3',
        displayName: 'Tak Kan Hilang ',
        cover: 'bahan/Tak kan hilang.jpg ',
        artist: 'Budi Doremi',
    },
    {
        path: 'bahan/lagu Komang.mp3',
        displayName: 'Komang ',
        cover: 'bahan/komang.jpg ',
        artist: 'Raim Laode',
    },
    {
        path: 'bahan/Laith speed up.mp3 ',
        displayName: 'Gabut Bersama LAITH Speed up ',
        cover: 'bahan/Laith.jpeg ',
        artist: 'Laith [GX]',
    },
    {
        path: 'bahan/kerosene.mp3 ',
        displayName: 'Kerosene (phonk) Speed up ',
        cover: 'bahan/phonk logo.jpg ',
        artist: '(PHONK)',
    },
    {
        path: 'bahan/lagu cupid.mp3 ',
        displayName: 'FIFTY FIFTY - Cupid (sped up)',
        cover: 'bahan/cupid.jpg ',
        artist: 'FIFTY FIFTY',
    }


];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);