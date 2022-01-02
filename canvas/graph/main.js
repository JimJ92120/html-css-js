"use strict";

function drawNode(context, node) {
  const [currentX, currentY] = node.position;
  console.log(node);
  context.arc(
    currentX,
    currentY,
    node.size,
    0,
    2 * Math.PI
  );
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
    size: 4,
    color: 'rgba(255, 255, 255, 1)',
  };
  const nodes = [
    {
      position: [200, 200],
      size: config.size,
    },
  ];

  let loop;

  function animation() {
    const [currentX, currentY] = nodes[0].position;

    // context.arc(
    //   currentX,
    //   currentY,
    //   config.size,
    //   0,
    //   2 * Math.PI
    // );
    drawNode(context, nodes[0]);
    nodes[0].position[0] = currentX + 1;
    nodes[0].position[1] = currentY + 1;

    context.fill();
    loop = requestAnimationFrame(animation);
  }

  context.fillStyle = config.color;
  loop = requestAnimationFrame(animation);

  setTimeout(() => {
    cancelAnimationFrame(loop);
    console.log('stop');
  }, 5000);
});
