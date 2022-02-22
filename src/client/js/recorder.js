import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDonwload = async () => {
  actionBtn.removeEventListener("click", handleDonwload);
  actionBtn.innerText = "Transcoding...";
  actionBtn.disabled = true;
  const ffmpeg = createFFmpeg({ log: true }); //무슨 일이 벌어지는지
  //콘솔에서 확인
  await ffmpeg.load(); //사용자가 소프트웨어를 사용할 것이기 때문
  //우리 웹사이트에서 다른 프로그램을 사용하기 때문

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));

  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  //recording이 mp4로 변형된다. -i -> input

  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumbnail
  );

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumbnail);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumbnail);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl); //객체를 메모리에서 지운다.
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record Again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDonwload);

  recorder.stop();
};

const handleStart = () => {
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart);
  actionBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data); //브라우저 메모리에서만 가능한 URL을 만들어준다.
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
    //단순히 브라우저의 메모리를 가리키기만 하고 있는 url일뿐이다.
    //그냥 파일을 가리키고 있는 URL
    //즉, 파일은 브라우저의 메모리 상에 있다!
  };

  recorder.start();
};

const init = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      width: 1024,
      height: 576,
    },
  });
  video.srcObject = stream; //video가 가질 수 있는 무언가!
  video.play();
};

init();

actionBtn.addEventListener("click", handleStart);
