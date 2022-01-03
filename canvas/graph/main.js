"use strict";

function randomDirection() {
  const res = Math.floor(Math.random() * 2);
  
  if (res < 1) return 0;

  return 1;
}

function graph(count, height, width, size) {
  return [...Array(count).keys()].map(() => {
    return {
      direction: [
        randomDirection(),
        randomDirection()
      ],
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

function moveNode(nodes, iter, size, offsets, dimensions) {
  const {
    direction,
    position: nodePosition
  } = nodes[iter];

  // right
  if (direction[0] === 1
    && nodePosition[0] + offsets[0] <= dimensions[0] - size
  ) nodes[iter].position[0] = nodePosition[0] + Math.abs(offsets[0]);
  // left
  if (direction[0] === 0
    && nodePosition[0] - offsets[0] >= 0 + size
  ) nodes[iter].position[0] = nodePosition[0] - Math.abs(offsets[0]);
  // up
  if (direction[1] === 1
    && nodePosition[1] - offsets[1] >= 0 + size
  ) nodes[iter].position[1] = nodePosition[1] - offsets[1];
  // down
  if (direction[1] === 0
    && nodePosition[1] + offsets[1] <= dimensions[1] - size
  ) nodes[iter].position[1] = nodePosition[1] + offsets[1];
}
function updateNodePosition(nodes, iter, size, offsets, dimensions) {
  moveNode(nodes, iter, size, offsets, dimensions)
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
    context.clearRect(
      0,
      0,
      context.canvas.width,
      context.canvas.height
    );
    nodes.forEach((node, iter) => {
      updateNodePosition(
        nodes,
        iter,
        config.size,
        [
          Math.random() * 2,
          Math.random() * 2
        ],
        [
          documentClientRect.width,
          documentClientRect.height
        ]
      );
      drawNode(context, node);
    });

    loop = requestAnimationFrame(animation);
  }

  context.fillStyle = config.color;
  loop = requestAnimationFrame(animation);

  setTimeout(() => {
    cancelAnimationFrame(loop);
    console.log('stop');
  }, 5000);
});
