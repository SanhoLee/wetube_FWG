const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

// streamObject는 전역변수로 선언
let streamObject;

const handleVideoData = event => {
  console.log(event);
};

const startRecording = () => {
  const videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  // videoRecorder.ondataavailable = handleVideoData;
  console.log(videoRecorder);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    // stream contents가 화면으로만 출력되고 있지만, 실제로 데이터로 전송하기 위해 아래 함수를 이용
    streamObject = stream;
    startRecording();
    recordBtn.innerHTML = "Stop Recording";
  } catch (error) {
    recordBtn.innerHTML = "😫 Cant Record";
    recordBtn.removeEventListener("click", getVideo);
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
