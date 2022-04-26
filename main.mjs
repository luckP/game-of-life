import { create } from './module/canvas.mjs';
import {
  start,
  pause,
  play,
  nextFrame,
  reset,
  setAlpha,
  setSpeed,
  setMouseTrail,
  setParameters,
  shuffleMatrix,
} from './module/game.mjs';

import {
  setPattersOptions,
  setMouseBrush,
  setMouseBrushRotate,
  setMouseBrushReverse,
  setMouseBrushFlipVertical,
  setMouseBrushFlipHorizontal,
} from './module/patters-controller.mjs';

const ctx = create();

const pauseBtn = document.querySelector('#pause-btn');
const playBtn = document.querySelector('#play-btn');
const nextFrameBtn = document.querySelector('#next-frame-btn');
const resetBtn = document.querySelector('#reset-btn');
const shuffleBtn = document.querySelector('#shuffle-btn');
const speedRange = document.querySelector('#range-speed');
const mouseTrail = document.querySelector('#mouse-trail');
const mouseBrush = document.querySelector('#mode-brush');
const mouseBrushRotate = document.querySelector('#mouse-brush-rotate');
const mouseBrushReverse = document.querySelector('#mouse-brush-reverse');
const alphaRange = document.querySelector('#range-alpha');
const rangeSize = document.querySelector('#range-size');
const mouseBrushFlipVertical = document.querySelector(
  '#mouse-brush-flip-vertical'
);
const mouseBrushFlipHorizontal = document.querySelector(
  '#mouse-brush-flip-horizontal'
);

pauseBtn.addEventListener('click', () => pause());
playBtn.addEventListener('click', () => play());
nextFrameBtn.addEventListener('click', () => nextFrame());
resetBtn.addEventListener('click', () => reset());
shuffleBtn.addEventListener('click', () => shuffleMatrix());
speedRange.addEventListener('input', () => setSpeed(speedRange.value));
alphaRange.addEventListener('input', () => setAlpha(alphaRange.value));
mouseTrail.addEventListener('change', () => setMouseTrail(mouseTrail.checked));
mouseBrush.addEventListener('change', () => setMouseBrush(mouseBrush.value));
mouseBrushRotate.addEventListener('change', () =>
  setMouseBrushRotate(mouseBrushRotate.value)
);
mouseBrushReverse.addEventListener('change', () =>
  setMouseBrushReverse(mouseBrushReverse.checked)
);

mouseBrushFlipVertical.addEventListener('change', () =>
  setMouseBrushFlipVertical(mouseBrushFlipVertical.checked)
);
mouseBrushFlipHorizontal.addEventListener('change', () =>
  setMouseBrushFlipHorizontal(mouseBrushFlipHorizontal.checked)
);

rangeSize.addEventListener('change', () => {
  Swal.fire({
    title: '<strong>Confirm <u>Resize</u></strong>',
    icon: 'info',
    html:
      'Would you like to change the <b>size</b>?, ' +
      'Resizing will erase the matrix ',
    showCloseButton: true,
    showCancelButton: false,
    showDenyButton: true,
    focusConfirm: false,
    confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
    confirmButtonAriaLabel: 'Thumbs up, great!',
    denyButtonText: '<i class="fa fa-thumbs-down"></i>',
    denyButtonAriaLabel: 'Thumbs down, =(!',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      sizeVal = rangeSize.value;
      startGame();
    } else if (result.isDenied) {
      rangeSize.value = sizeVal;
    }
  });
});
let sizeVal = rangeSize.value;

function calcElementNumbers() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const numElements = parseInt(Math.max(width, height) / sizeVal) + 1;
  return numElements;
}

window.addEventListener('resize', () => startGame());

setPattersOptions(mouseBrush);

function startGame() {
  setParameters(
    calcElementNumbers(),
    speedRange.value,
    sizeVal,
    alphaRange.value,
    mouseTrail.checked
  );
  mouseBrush.value = 'draw';
  setMouseBrush(mouseBrush.value);
  setMouseBrushRotate(mouseBrushRotate.value);
  start(ctx);
  play();
}

startGame();
