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

function moveNode(nodes, iter) {
  const [currentX, currentY] = nodes[0].position;

  nodes[iter].position[0] = currentX + 1;
  nodes[iter].position[1] = currentY + 1;
}

function animateNode(context, nodes, iter) {
  drawNode(context, nodes[iter]);
  moveNode(nodes, iter);
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
    animateNode(context, nodes, 0);

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
