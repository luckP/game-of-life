import { drawMatrix } from './square.mjs';
import { fillPatter, drawShadow } from './patters-controller.mjs';

let ctx;
let refreshIntervalId = null;
``;
let matrix = [];
let gameState = 'start';
let numElements;
let speed;
let size;
let alpha;
let mouseTrail;
let mouseBrush;

function setParameters(
  _numElements,
  _speed,
  _size,
  _alpha,
  _mouseTrail,
  _mouseBrush
) {
  numElements = _numElements;
  speed = _speed;
  size = _size;
  alpha = _alpha;
  mouseTrail = _mouseTrail;
  mouseBrush = _mouseBrush;
  startMatrix();
}

function draw() {
  drawField();
  drawMatrix(ctx, matrix, size);
  drawShadow(ctx, size);
}

function nextFrame() {
  draw();
  matrix = updateMatrix(matrix);
}

function frame() {
  draw();
  if (gameState == 'play') matrix = updateMatrix(matrix);
}

function drawField() {
  var sizeWidth = ctx.canvas.clientWidth;
  var sizeHeight = ctx.canvas.clientHeight;
  ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
  ctx.fillRect(0, 0, sizeWidth, sizeHeight); //for white background
}

function startMatrix() {
  matrix = [];
  for (let i = 0; i < numElements; i++) {
    const row = [];
    for (let j = 0; j < numElements; j++) {
      row.push(0);
    }
    matrix.push(row);
  }
}

function start(_ctx) {
  if (gameState != 'start') return;
  gameState = 'pause';
  ctx = _ctx;
  startMatrix();
  refreshIntervalId = setInterval(frame, speed);
  document.querySelector('canvas').addEventListener('mousemove', (e) => {
    const { offsetX, offsetY } = e;
    const x = parseInt(offsetX / size);
    const y = parseInt(offsetY / size);

    if (!matrix || matrix.length == 0) return;

    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[x].length) return;
    if (!mouseTrail) return;

    matrix[x][y] = 1;
  });

  document.querySelector('canvas').addEventListener('click', (e) => {
    if (mouseTrail) {
      mouseTrail = false;
      setTimeout(() => (mouseTrail = true), 1000);
    }
    if (!matrix) return;
    const { offsetX, offsetY } = e;
    const x = parseInt(offsetX / size);
    const y = parseInt(offsetY / size);

    if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[x].length) return;

    fillPatter(matrix, x, y);
    draw();
  });
}

function pause() {
  gameState = 'pause';
  // if (refreshIntervalId) clearInterval(refreshIntervalId);
}

function play() {
  // if (gameState == 'play') return;
  gameState = 'play';
  // refreshIntervalId = setInterval(frame, speed);
}

function reset() {
  for (let i = 0; i < numElements; i++) {
    for (let j = 0; j < numElements; j++) {
      matrix[i][j] = 0;
    }
  }
  draw();
}

function updateMatrix(_matrix) {
  const oldMatrix = JSON.parse(JSON.stringify(_matrix));
  const newMatrix = [];
  for (let i = 0; i < oldMatrix.length; i++) {
    const row = [];
    for (let j = 0; j < oldMatrix[i].length; j++) {
      const count = countLiveNeighbors(oldMatrix, i, j);

      if (matrix[i][j] != 0 && (count == 2 || count == 3)) row.push(1);
      else if (matrix[i][j] == 0 && count == 3) row.push(2);
      else row.push(0);
    }
    newMatrix.push(row);
  }

  return newMatrix;
}

function countLiveNeighbors(_matrix, i, j) {
  let count = 0;
  for (let w = -1; w < 2; w++) {
    for (let k = -1; k < 2; k++) {
      const x = i + w;
      const y = j + k;
      if (
        x >= 0 &&
        x < _matrix.length &&
        y >= 0 &&
        y < _matrix[i].length &&
        (x != i || y != j)
      )
        count += _matrix[x][y] != 0 ? 1 : 0;
    }
  }

  return count;
}

function setAlpha(_alpha) {
  alpha = _alpha;
}

function setSpeed(_speed) {
  pause();
  speed = 150 - _speed;
  play();
}

function setMouseTrail(_mouseTrail) {
  console.log(_mouseTrail);
  mouseTrail = _mouseTrail;
}

function shuffleMatrix() {
  matrix = [];

  for (let i = 0; i < numElements; i++) {
    const row = [];
    for (let j = 0; j < numElements; j++) {
      row.push(parseInt(Math.random() * 100) < 30 ? 1 : 0);
    }
    matrix.push(row);
  }
}

export {
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
};
