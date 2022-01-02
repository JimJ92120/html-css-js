"use strict";

function graph(count, height, width, size) {
  return [...Array(count).keys()].map(() => {
    return {
      position: [
        Math.random() * width,
        Math.random() * height
      ],
      size
    }
  });
}

function drawNode(context, node) {
  const [currentX, currentY] = node.position;

  context.beginPath();
  context.moveTo(currentX, currentY);
  context.arc(
    currentX,
    currentY,
    node.size,
    0,
    2 * Math.PI
  );
  context.closePath();
  context.fill();
}

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const documentClientRect =  document.documentElement.getBoundingClientRect();

  context.canvas.height = documentClientRect.height;
  context.canvas.width = documentClientRect.width;

  const config = {
    size: 2,
    color: 'rgba(255, 255, 255, 1)',
  };
  const nodes = graph(
    50,
    context.canvas.height,
    context.canvas.width,
    config.size
  );

  let loop;
  console.log(nodes);

  function animation() {
    nodes.forEach((node, index) => drawNode(context, node));

    loop = requestAnimationFrame(animation);
  }

  context.fillStyle = config.color;
  loop = requestAnimationFrame(animation);

  setTimeout(() => {
    cancelAnimationFrame(loop);
    console.log('stop');
  }, 5000);
});
