const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

// Global varialbes...
let streamObject;
let videoRecorder;

const handleVideoData = event => {
  // download videa with link data.
  // Blob data -> It is made by 0 and 1.
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
};

const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  // videoRecorder.ondataavailable = handleVideoData;
  // Once video is stopped, it fired event for dataavailabe.
  // setTimeout(() => videoRecorder.stop(), 5000);
  recordBtn.addEventListener("click", stopRecording);
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
