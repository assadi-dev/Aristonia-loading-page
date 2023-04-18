const objectNode = {
  volumeIcon: document.querySelector("#volume-icon"),
  video: document.querySelector(".video"),
  volumeOn: document.querySelector("#play-video"),
  volumeOff: document.querySelector("#stop-video"),
  volumeSoundBar: document.querySelector(".volume-sounBar-container"),
  volumeCursor: document.querySelector("#sound_cursor"),
  volumeLevel: document.querySelector("#volume-level"),
};
const svgVolumePath = {
  off: "../assets/icon/sound-off.svg",
  on: "../assets/icon/sound-high.svg",
};

let clicked = false;
let volumeLevel = 0.5;
let volumeComplete = 50;
let positionCusorVol = 293;

document.addEventListener("DOMContentLoaded", () => {
  load_volume_icone();
  objectNode.video.volume = 0;
  //Mouvemen du curseur bar de son
  objectNode.volumeSoundBar.addEventListener("mousedown", active_move);
  objectNode.volumeSoundBar.addEventListener("mouseup", leave_move);
  objectNode.volumeSoundBar.addEventListener("mouseleave", leave_move);
  objectNode.volumeSoundBar.addEventListener("mousemove", move_volume_cursor);
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
  const clientWidth = objectNode.volumeSoundBar.clientWidth;
  positionCusorVol = clientWidth / 2;

  objectNode.volumeOff.classList.remove("volume-selected");
  objectNode.volumeOn.classList.add("volume-selected");
  objectNode.volumeIcon.replaceChildren(icon);
  objectNode.video.volume = volumeLevel;
  objectNode.volumeLevel.textContent = `${volumeComplete}%`;
  objectNode.volumeCursor.style.transform = `translateX(${positionCusorVol}px)`;

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

const active_move = (e) => {
  e.stopPropagation();
  clicked = true;
};
const leave_move = (e) => {
  e.stopPropagation();
  clicked = false;
};
const move_volume_cursor = (e) => {
  if (!clicked) {
    return;
  }
  const mousePose = e.layerX;
  const clientWidth = objectNode.volumeSoundBar.clientWidth;
  const limit = clientWidth - 18;
  let percent = Math.floor((mousePose * 100) / clientWidth);
  volumeLevel = percent * 0.01;
  volumeComplete = Number(volumeLevel.toFixed(1)) * 100;

  if (mousePose > 1 && mousePose < limit) {
    positionCusorVol = mousePose;
    objectNode.volumeCursor.style.transform = `translateX(${positionCusorVol}px)`;
    objectNode.video.volume = volumeLevel;
    objectNode.volumeLevel.textContent = `${volumeComplete}%`;
  }
};
