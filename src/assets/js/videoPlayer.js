import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeBtn");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
const durationPos = document.getElementById("jsDurationPos");

// Function for API.
// In order to sending Video Id information to browser, information for javascript is needed.
// It is activated when Video is finished.
const registerView = () => {
  const viewId = window.location.href.split("/videos/")[1];
  fetch(`/api/${viewId}/view`, {
    method: "POST",
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolmeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
  fullScrnBtn.addEventListener("click", goFullScreen);
  if (document.exitFullScreen) {
    document.exitFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozExitFullScreen) {
    document.mozExitFullScreen();
  } else if (document.msExitFullScreen) {
    document.msExitFullScreen();
  }
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullScreen) {
    videoContainer.webkitRequestFullScreen();
  } else if (videoContainer.msRequestFullScreen) {
    videoContainer.msRequestFullScreen();
  }
  fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScrnBtn.removeEventListener("click", goFullScreen);
  fullScrnBtn.addEventListener("click", exitFullScreen);
}

const formatData = (seconds) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber % 3600) / 60);
  let totalSeconds = Math.floor(secondsNumber % 60);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }

  return `${hours}:${minutes}:${totalSeconds}`;
};

function setDurationTime() {
  durationPos.value = videoPlayer.currentTime;
}

function getCurrentTime() {
  currentTime.innerHTML = formatData(Math.floor(videoPlayer.currentTime));
}

// video duration bug fixed.
// video file의 소스를 가져온 후, 데이터 형태인 blob() 해준다.
// 그 후 생성된 blob을 get-blob-duration 해서 duration 정보를 가져온다.
// 단, 현재상태에서는, 로컬저장소? 에 저장하는것이 아니라, aws s3로 스토리지를 변경했기 때문에, 소스도 이곳에서 가져온다.
// 때문에, aws s3의 저장 버킷의 permission -> CORS(cross origin Resource Sharing) configuration 이 필요하다.
//  documentation example을 보고 적당히 설정했다. 단, Method : Get!!
async function setTotaltime() {
  try {
    const blob = await fetch(videoPlayer.src).then((reponse) => reponse.blob());
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatData(duration);
    durationPos.max = Math.floor(duration);
    totalTime.innerHTML = totalTimeString;
  } catch (error) {
    console.log(error);
  } finally {
    setInterval(getCurrentTime, 1000);
    setInterval(setDurationTime, 10);
  }
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function handleDurationTime(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.currentTime = value;
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  videoPlayer.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolmeClick);
  fullScrnBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotaltime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
  durationPos.addEventListener("input", handleDurationTime);
}

if (videoContainer) {
  init();
}
