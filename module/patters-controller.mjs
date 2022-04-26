import { patters } from '../data/patters.mjs';
let mousePosition = { x: 0, y: 0 };
let mouseBrush = '';
let mouseBrushRotate = 0;
let mouseBrushReverse = 1;
let mouseBrushFlipVertical = false;
let mouseBrushFlipHorizontal = false;

document.body.addEventListener(
  'mousemove',
  ({ offsetX, offsetY }) =>
    (mousePosition = {
      x: offsetX,
      y: offsetY,
    })
);

function setPattersOptions(mouseBrushSelect) {
  mouseBrushSelect.innerHTML = '';

  for (let patterName in patters) {
    const option = document.createElement('option');
    option.value = patterName;
    option.innerHTML = patterName;

    mouseBrushSelect.appendChild(option);
  }
}

function transformPatter() {
  let patterMatrix = JSON.parse(JSON.stringify(patters[mouseBrush]));
  if (mouseBrushFlipVertical) {
    patterMatrix = patterMatrix.reverse();
  }
  if (mouseBrushFlipHorizontal) {
    patterMatrix = patterMatrix.map((row) => row.reverse());
  }

  return rotatePatter(patterMatrix);
}

function fillPatter(matrix, x, y) {
  const patterMatrix = patters[mouseBrush];
  const patter = transformPatter(patterMatrix);
  if (!patter) return;
  const { xHalf, yHalf } = cancHalf(patter);
  if (x - xHalf < 0 || x + patter.length - xHalf >= matrix.length) return;
  if (y - yHalf < 0 || y + patter[0].length - yHalf >= matrix[0].length) return;

  for (let i = 0; i < patter.length; i++) {
    for (let j = 0; j < patter[i].length; j++) {
      const _x = x + i - xHalf;
      const _y = y + j - yHalf;
      const value = patter[i][j] * mouseBrushReverse;

      if (value == -1) matrix[_x][_y] = matrix[_x][_y] == 0 ? 1 : 0;
      else matrix[_x][_y] = value;
    }
  }
}

function cancHalf(patter) {
  return {
    xHalf: parseInt(patter.length / 2),
    yHalf: parseInt(patter[0].length / 2),
  };
}

function drawShadow(ctx, size) {
  const patterMatrix = patters[mouseBrush];
  const patter = transformPatter(patterMatrix);
  if (!patter) return;

  const { xHalf, yHalf } = cancHalf(patter);
  const whiteColor = 'rgba(255, 255, 255, .3)';
  const darkColor = 'rgba(40, 55, 71, .3)';
  const x = parseInt(mousePosition.x / size);
  const y = parseInt(mousePosition.y / size);

  for (let i = 0; i < patter.length; i++) {
    for (let j = 0; j < patter[i].length; j++) {
      const _x = x + i - xHalf;
      const _y = y + j - yHalf;

      const color = patter[i][j] == 0 ? whiteColor : darkColor;
      const x1 = _x * size;
      const y1 = _y * size;
      ctx.fillStyle = color;
      ctx.fillRect(x1, y1, size, size);
      ctx.stroke();
    }
  }
}

function rotatePatter(patter) {
  let rotatedPatter = patter;
  //   console.log(mouseBrushRotate);

  for (let i = 0; i < parseInt(mouseBrushRotate); i++) {
    const _patter = Array(rotatedPatter[0].length)
      .fill()
      .map(() => Array(rotatedPatter.length).fill(0));
    for (let x = 0; x < rotatedPatter[0].length; x++) {
      for (let y = 0; y < rotatedPatter.length; y++) {
        _patter[x][y] = rotatedPatter[y][rotatedPatter[0].length - x - 1];
      }
    }
    rotatedPatter = _patter;
  }

  return rotatedPatter;
}

function setMouseBrush(_mouseBrush) {
  mouseBrush = _mouseBrush;
}
function setMouseBrushRotate(_mouseBrushRotate) {
  mouseBrushRotate = _mouseBrushRotate;
}
function setMouseBrushReverse(_mouseBrushReverse) {
  mouseBrushReverse = _mouseBrushReverse ? -1 : 1;
}
function setMouseBrushFlipVertical(_mouseBrushFlipVertical) {
  mouseBrushFlipVertical = _mouseBrushFlipVertical;
}
function setMouseBrushFlipHorizontal(_mouseBrushFlipHorizontal) {
  mouseBrushFlipHorizontal = _mouseBrushFlipHorizontal;
}

export {
  setPattersOptions,
  fillPatter,
  drawShadow,
  setMouseBrush,
  setMouseBrushRotate,
  setMouseBrushReverse,
  setMouseBrushFlipVertical,
  setMouseBrushFlipHorizontal,
};
