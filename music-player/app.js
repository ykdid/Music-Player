const container = document.querySelector(".container");
const image = document.querySelector("#music-img");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const audio = document.querySelector("#music-audio");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector(".list-group");

const player = new musicPlayer(musicList);

window.addEventListener("load", () => {
  let music = player.getMusic();
  displayMusic(music);
  displayMusicList(player.musicList);
  isPlayingNow();
});

function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  image.src = "img/" + music.img;
  audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    play.querySelector("i").classList.remove("fa-play");
    play.querySelector("i").classList.add("fa-pause");
  } else {
    audio.pause();
    play.querySelector("i").classList.remove("fa-pause");
    play.querySelector("i").classList.add("fa-play");
  }
});

prev.addEventListener("click", () => {
  player.previous();
  let music = player.getMusic();
  displayMusic(music);
  if (audio.paused) {
    audio.play();
    play.querySelector("i").classList.remove("fa-play");
    play.querySelector("i").classList.add("fa-pause");
  } else {
    audio.pause();
    play.querySelector("i").classList.remove("fa-pause");
    play.querySelector("i").classList.add("fa-play");
  }
  isPlayingNow();
});

next.addEventListener("click", () => {
  player.next();
  let music = player.getMusic();
  displayMusic(music);
  if (audio.paused) {
    audio.play();
    play.querySelector("i").classList.remove("fa-play");
    play.querySelector("i").classList.add("fa-pause");
  } else {
    audio.pause();
    play.querySelector("i").classList.remove("fa-pause");
    play.querySelector("i").classList.add("fa-play");
  }
  isPlayingNow();
});
const calculateTime = (totalSeconds) => {
  const minute = Math.floor(totalSeconds / 60);
  const second = Math.floor(totalSeconds % 60);
  const updatedSecond = second < 10 ? `0${second}` : `${second}`;
  const result = `${minute}:${updatedSecond}`;
  return result;
};
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;

  if (value == 0) {
    audio.muted = true;
    volume.classList.remove("fa-volume-high");
    volume.classList.add("fa-volume-mute");
  } else {
    audio.muted = false;
    volume.classList.remove("fa-volume-mute");
    volume.classList.add("fa-volume-high");
    audio.volume = value / 100;
  }

  if (isMuted) {
    previousVolume = audio.volume;
    isMuted = false;
  }
});

let isMuted = false;
let previousVolume;
volume.addEventListener("click", () => {
  if (!isMuted) {
    previousVolume = audio.volume;
    audio.muted = true;
    volume.classList.remove("fa-volume-high");
    volume.classList.add("fa-volume-mute");
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    volume.classList.remove("fa-volume-mute");
    volume.classList.add("fa-volume-high");

    if (previousVolume !== undefined) {
      audio.volume = previousVolume;
      volumeBar.value = previousVolume * 100;
    }
  }

  isMuted = !isMuted;
});

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    togglePlayPause();
  } else if (event.key === "m" || event.key === "M") {
    event.preventDefault(); // Sayfanın scroll olmasını önlemek için
    toggleMute();
  } else if (event.key === "ArrowRight") {
    forwardFiveSeconds();
  } else if (event.key === "ArrowLeft") {
    rewindFiveSeconds();
  } else if (event.code === "ArrowUp") {
    increaseVolume();
  } else if (event.code === "ArrowDown") {
    decreaseVolume();
  }
});

function forwardFiveSeconds() {
  audio.currentTime += 5;
}

function rewindFiveSeconds() {
  audio.currentTime -= 5;
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    play.querySelector("i").classList.remove("fa-play");
    play.querySelector("i").classList.add("fa-pause");
  } else {
    audio.pause();
    play.querySelector("i").classList.remove("fa-pause");
    play.querySelector("i").classList.add("fa-play");
  }
}

function toggleMute() {
  if (!isMuted) {
    previousVolume = audio.volume;
    audio.muted = true;
    volume.classList.remove("fa-volume-high");
    volume.classList.add("fa-volume-mute");
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    volume.classList.remove("fa-volume-mute");
    volume.classList.add("fa-volume-high");

    if (previousVolume !== undefined) {
      audio.volume = previousVolume;
      volumeBar.value = previousVolume * 100;
    }
  }

  isMuted = !isMuted;
}
function increaseVolume() {
  let currentVolume = audio.volume;
  if (currentVolume < 1.0) {
    audio.volume = Math.min(currentVolume + 0.1, 1.0);
    updateVolumeUI();
  }
}

function decreaseVolume() {
  let currentVolume = audio.volume;
  if (currentVolume > 0.0) {
    audio.volume = Math.max(currentVolume - 0.1, 0.0);
    updateVolumeUI();
  }
}

function updateVolumeUI() {
  volumeBar.value = audio.volume * 100;
}

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `
            <li li-index='${i}' onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
                <span>${list[i].getName()}</span>
                <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
            </li>
        `;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);

    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  if (audio.paused) {
    audio.play();
    play.querySelector("i").classList.remove("fa-play");
    play.querySelector("i").classList.add("fa-pause");
  } else {
    audio.pause();
    play.querySelector("i").classList.remove("fa-pause");
    play.querySelector("i").classList.add("fa-play");
  }
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }

    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
});
