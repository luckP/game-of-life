// const color1 = '#34495e';
const color1 = '#b03a2e';
const color2 = '#283747';
function drawMatrix(ctx, matrix, size) {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] == 0) continue;
      const color = matrix[x][y] == 1 ? color1 : color2;
      const x1 = x * size;
      const y1 = y * size;
      ctx.fillStyle = color;
      ctx.fillRect(x1, y1, size, size);
      ctx.stroke();
    }
  }
}

export { drawMatrix };
