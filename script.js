const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const audioEl = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music
const songs = [
  {
    name: "Burn-together",
    displayname: "Burn Together",
    artist: "Jamendo Music",
  },
  {
    name: "Beautiful",
    displayname: "Effortlessly Beautiful",
    artist: "Jamendo Music",
  },
  {
    name: "Keep-me-alive",
    displayname: "Keep Me Alive",
    artist: "Jamendo Music",
  },
  {
    name: "summer",
    displayname: "In the Summer",
    artist: "Jamendo Music",
  },
  {
    name: "so-it-goes",
    displayname: "So it Goes",
    artist: "Jamendo Music",
  },
  {
    name: "sandman",
    displayname: "Sandman",
    artist: "Jamendo Music",
  },
  {
    name: "song",
    displayname: "One Day We will be a Song",
    artist: "Jamendo Music",
  },
  {
    name: "one-day",
    displayname: "One Day",
    artist: "Jamendo Music",
  },
  {
    name: "Quatro Predes",
    displayname: "Quatro Paredes",
    artist: "Jamendo Music",
  },
  {
    name: "runaway",
    displayname: "Runaway Mustang",
    artist: "Jamendo Music",
  },
  {
    name: "star",
    displayname: "Star in the Sky",
    artist: "Jamendo Music",
  },
  {
    name: "island",
    displayname: "The Island",
    artist: "Jamendo Music",
  },
];

//check if Playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  audioEl.play();
}

//Pause

function pauseSong() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  isPlaying = false;
  audioEl.pause();
}
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
  title.textContent = song.displayname;
  artist.textContent = song.artist;
  audioEl.src = `Playlist/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//On Load-Select First Song
loadSong(songs[songIndex]);

//Update Progress Bar and Time

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    //Update the progress bar
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    console.log("minutes", durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    //Delay Switching duration Element to avoid Nan
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Calculate display for duration
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Set Progress Bar
function setProgressBar(e) {
  console.log(e);
  const width = this.clientWidth;
  console.log(width);
  const clickX = e.offsetX;
  console.log(clickX);
  const { duration } = audioEl;
  console.log(clickX / width);
  audioEl.currentTime = (clickX / width) * duration;
}
// Event Listener
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audioEl.addEventListener("ended", nextSong);
audioEl.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
