"use strict";

function randomDirection() {
  const res = Math.floor(Math.random() * 2);
  
  if (res < 1) return 0;

  return 1;
}

function graph(count, height, width, size) {
  return [...Array(count).keys()].map(() => {
    return {
      color: `rgba(
        ${Math.random() * 256},
        ${Math.random() * 256},
        ${Math.random() * 256},
        1
      )`,
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
  const { color, position } = node;
  const [currentX, currentY] = position;

  context.beginPath();
  context.fillStyle = color;
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

function moveNode(nodes, iter, size, distancePerFrame, dimensions) {
  const {
    direction,
    position: nodePosition
  } = nodes[iter];

  // right
  if (direction[0] === 1
    && nodePosition[0] + distancePerFrame <= dimensions[0] - size
  ) nodes[iter].position[0] = nodePosition[0] + Math.abs(distancePerFrame);
  // left
  if (direction[0] === 0
    && nodePosition[0] - distancePerFrame >= 0 + size
  ) nodes[iter].position[0] = nodePosition[0] - Math.abs(distancePerFrame);
  // up
  if (direction[1] === 1
    && nodePosition[1] - distancePerFrame >= 0 + size
  ) nodes[iter].position[1] = nodePosition[1] - distancePerFrame;
  // down
  if (direction[1] === 0
    && nodePosition[1] + distancePerFrame <= dimensions[1] - size
  ) nodes[iter].position[1] = nodePosition[1] + distancePerFrame;
}

function updateDirection(nodes, iter, size, distancePerFrame, dimensions) {
  const {
    direction,
    position: nodePosition
  } = nodes[iter];

  // right to left
  if (direction[0] === 1
    && nodePosition[0] + distancePerFrame >= dimensions[0] - size
  ) {
    nodes[iter].direction[0] = 0;
  }
  // left to right
  if (direction[0] === 0
    && nodePosition[0] - distancePerFrame <= size
  ) {
    nodes[iter].direction[0] = 1;
  }
  // up to down
  if (direction[1] === 1
    && nodePosition[1] - distancePerFrame <= size
  ) {
    nodes[iter].direction[1] = 0;
  }
  // down to up
  if (direction[1] === 0
    && nodePosition[1] + distancePerFrame >= dimensions[1] - size
  ) {
    nodes[iter].direction[1] = 1;
  }
}

function updateNodePosition(nodes, iter, size, distancePerFrame, dimensions) {
  updateDirection(nodes, iter, size, distancePerFrame, dimensions);
  moveNode(nodes, iter, size, distancePerFrame, dimensions)
}

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  const documentClientRect =  document.documentElement.getBoundingClientRect();
  const { height, width } = documentClientRect;

  context.canvas.height = height;
  context.canvas.width = width;

  const config = {
    size: 5,
    color: 'rgba(255, 255, 255, 1)',
    distancePerFrame: 3,
  };
  const nodes = graph(
    10,
    context.canvas.height,
    context.canvas.width,
    config.size
  );

  let loop;
  const animation = () => {
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
        config.distancePerFrame,
        [
          width,
          height
        ]
      );
      drawNode(context, node);
    });

    loop = requestAnimationFrame(animation);
  }

  loop = requestAnimationFrame(animation);

  // stop after 5 seconds.
  // setTimeout(() => {
  //   cancelAnimationFrame(loop);
  //   console.log('stop');
  // }, 5000);
});
