const objectNode = {
  volumeIcon: document.querySelector("#volume-icon"),
  video: document.querySelector(".video"),
  volumeOn: document.querySelector("#play-video"),
  volumeOff: document.querySelector("#stop-video"),
};
const svgVolumePath = {
  off: "../assets/icon/sound-off.svg",
  on: "../assets/icon/sound-high.svg",
};

document.addEventListener("DOMContentLoaded", () => {
  load_volume_icone();
  objectNode.video.volume = 0;
  objectNode.video.ended = ended_video;
});

const load_volume_icone = async (e) => {
  const icon = new Image();
  icon.src = svgVolumePath.off;
  objectNode.volumeIcon.append(icon);
  objectNode.volumeOff.classList.add("volume-selected");
  objectNode.volumeOn.onclick = play_video;
  objectNode.volumeOff.onclick = stop_video;
};

const play_video = async (e) => {
  const icon = new Image();
  icon.src = svgVolumePath.on;
  objectNode.volumeOff.classList.remove("volume-selected");
  objectNode.volumeOn.classList.add("volume-selected");
  objectNode.volumeIcon.replaceChildren(icon);
  objectNode.video.volume = 0.5;
  if (objectNode.video.paused || objectNode.video.ended) {
    objectNode.video.play();
  }
};

const stop_video = async () => {
  const icon = new Image();
  icon.src = svgVolumePath.off;
  objectNode.volumeOn.classList.remove("volume-selected");
  objectNode.volumeOff.classList.add("volume-selected");
  objectNode.volumeIcon.replaceChildren(icon);
  objectNode.video.volume = 0;
};

const ended_video = (e) => {
  const icon = new Image();
  icon.src = svgVolumePath.off;
  objectNode.volumeIcon.replaceChildren(icon);
  objectNode.video.currentTime = 0;
};
