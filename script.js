const image = document.querySelector(".img-container");
const sura = document.getElementById("sura");
const reciterName = document.getElementById("reciter-name");

const audio = document.getElementById("audio");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const playBtn = document.getElementById("play");

const allSuras = [
  {
    sura: "Al-Fatihah", // works for audio and image
    reciter: "Sheikh: Ahmad Talib bin Humaid",
  },
  {
    sura: "Al-Ikhlas", // works for audio and image
    reciter: "Sheikh: Ahmad Talib bin Humaid",
  },
  {
    sura: "Al-Falaq", // works for audio and image
    reciter: "Sheikh: Ahmad Talib bin Humaid",
  },
  {
    sura: "An-Nas", // works for audio and image
    reciter: "Sheikh: Ahmad Talib bin Humaid",
  },
];

let suraIndex = 0;

// change play-pause button icon
function setPlayIcon(type) {
  playBtn.classList.replace("fa-play", `fa-${type}`);
  playBtn.classList.replace("fa-pause", `fa-${type}`);
}

function startPlayingAudio() {
  audio.play();
  setPlayIcon("pause");
  playBtn.setAttribute("title", "pause");
}
function stopPlayingAudio() {
  audio.pause();
  setPlayIcon("play");
  playBtn.setAttribute("title", "play");
}
// function to play and stop audio
function toggleAudioState() {
  if (audio.paused) {
    startPlayingAudio();
  } else {
    stopPlayingAudio();
  }
}

function setTotalTimeDuration() {
  const duration = Math.round(audio.duration);
  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;
  const printedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  totalTime.innerText = `${minutes}:${printedSeconds}`;
}

// chenge the player to given sura (img, name, reciter, audio)
function loadAudio(suraObj) {
  image.style.backgroundImage = `url('img/${suraObj.sura}.png')`;
  sura.innerText = suraObj.sura;
  reciterName.innerText = suraObj.reciter;
  audio.src = `audio/${suraObj.sura}.mp3`;
  //* duration will be setted automaticlly after sura meta is loaded
}

function playNextAudio(direction) {
  const n = allSuras.length;
  suraIndex = (suraIndex + direction + n) % n;

  loadAudio(allSuras[suraIndex]);
  // start playing Audio as it will stop playing by default so ui will be different ||
  startPlayingAudio();
}

// Event Listeners
playBtn.addEventListener("click", toggleAudioState);
// change duration on loadMetaData
audio.addEventListener("loadedmetadata", setTotalTimeDuration);
nextBtn.addEventListener("click", () => playNextAudio(1));
prevBtn.addEventListener("click", () => playNextAudio(-1));
// onLoad
// load audio
loadAudio(allSuras[suraIndex]);
