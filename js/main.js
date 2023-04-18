const objectNode = {
  volumeIcon: document.querySelector("#volume-icon"),
  video: document.querySelector(".video"),
  volumeOn: document.querySelector("#play-video"),
  volumeOff: document.querySelector("#stop-video"),
  volumeSoundBar: document.querySelector(".volume-sounBar-container"),
  volumeCursor: document.querySelector("#sound_cursor"),
  volumeLevel: document.querySelector("#volume-level"),
  audio: document.querySelector(".audio"),
  progressPercent: document.querySelector(".progress-percent"),
  progressBar: document.querySelector(".bar"),
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
  //Mouvemen du curseur bar de son
  objectNode.volumeSoundBar.addEventListener("mousedown", active_move);
  objectNode.volumeSoundBar.addEventListener("mouseup", leave_move);
  objectNode.volumeSoundBar.addEventListener("mouseleave", leave_move);
  objectNode.volumeSoundBar.addEventListener("mousemove", move_volume_cursor);
  //Handler Progress
  handlerProgress();
});

const load_volume_icone = async (e) => {
  const icon = new Image();
  icon.src = svgVolumePath.off;
  objectNode.volumeIcon.append(icon);
  objectNode.volumeOff.classList.add("volume-selected");
  objectNode.volumeOn.onclick = play_video;
  objectNode.volumeOff.onclick = stop_video;
  objectNode.audio.volume = 0;
};

const play_video = async (e) => {
  const icon = new Image();
  icon.src = svgVolumePath.on;
  const clientWidth = objectNode.volumeSoundBar.clientWidth;
  //positionCusorVol = clientWidth / 2;

  objectNode.volumeOff.classList.remove("volume-selected");
  objectNode.volumeOn.classList.add("volume-selected");
  objectNode.volumeIcon.replaceChildren(icon);

  objectNode.volumeLevel.textContent = `${volumeComplete}%`;
  objectNode.volumeCursor.style.transform = `translateX(${positionCusorVol}px)`;
  objectNode.audio.volume = volumeLevel;

  if (objectNode.video.paused || objectNode.video.ended) {
    objectNode.video.play();
  }
  if (objectNode.audio.paused || objectNode.audio.ended) {
    objectNode.audio.play();
  }
};

const stop_video = async () => {
  const icon = new Image();
  icon.src = svgVolumePath.off;
  objectNode.volumeOn.classList.remove("volume-selected");
  objectNode.volumeOff.classList.add("volume-selected");
  objectNode.volumeIcon.replaceChildren(icon);
  objectNode.audio.volume = 0;
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
  objectNode.volumeOff.classList.remove("volume-selected");
  objectNode.volumeOn.classList.add("volume-selected");
  const icon = new Image();
  icon.src = svgVolumePath.on;
  objectNode.volumeIcon.replaceChildren(icon);

  if (objectNode.audio.paused || objectNode.audio.ended) {
    objectNode.audio.play();
  }
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
  const limit = clientWidth - 8;
  let percent = Math.floor((mousePose * 100) / clientWidth);
  volumeLevel = percent * 0.01;
  volumeComplete = percent;

  if (mousePose > 1 && mousePose < limit) {
    positionCusorVol = mousePose;
    objectNode.volumeCursor.style.transform = `translateX(${
      positionCusorVol - 9
    }px)`;
    objectNode.audio.volume = volumeLevel;
    objectNode.volumeLevel.textContent = `${volumeComplete}%`;
  }
};

const handlerProgress = () => {
  var count = 0;
  var thisCount = 0;

  const handlers = {
    startInitFunctionOrder(data) {
      count = data.count;
    },

    initFunctionInvoking(data) {
      let progress = (data.idx / count) * 100 + "%";
      objectNode.progressPercent.textContent = progress;
      objectNode.progressBar.style.width = progress;
    },

    startDataFileEntries(data) {
      count = data.count;
    },

    performMapLoadFunction(data) {
      ++thisCount;

      let progress = (thisCount / count) * 100 + "%";

      objectNode.progressPercent.textContent = progress;
      objectNode.progressBar.style.width = progress;
    },
  };

  window.addEventListener("message", function (e) {
    (handlers[e.data.eventName] || function () {})(e.data);
  });
};
