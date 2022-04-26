function create() {
  const canvasElement = document.createElement('canvas');

  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  document.body.appendChild(canvasElement);

  window.addEventListener('resize', () => {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
  });

  let ctx = canvasElement.getContext('2d');
  return ctx;
}

export { create };
