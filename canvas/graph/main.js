"use strict";

function randomDirection() {
  const res = Math.floor(Math.random() * 2);
  
  if (res < 1) return 0;

  return 1;
}

function checkDistance(from, to) {
  return Math.sqrt(Math.pow(to[0] - from[0], 2) + Math.pow(to[1] - from[1], 2));
}

function graph(count, height, width, size, color) {
  return [...Array(count).keys()].map(() => {
    return {
      color: `rgba(
        ${color[0] * 255},
        ${color[1] * 255},
        ${color[2] * 255},
        ${color[3]}
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

function drawNode(context, nodes, iter) {
  const { color, position, size } = nodes[iter];
  const [currentX, currentY] = position;

  context.beginPath();
  context.fillStyle = color;
  context.moveTo(currentX, currentY);
  context.arc(
    currentX,
    currentY,
    size,
    0,
    2 * Math.PI
  );
  context.closePath();
  context.fill();
}

function drawLine(context, nodes, iter, config = {
  offsetRatio: 500,
  lineWidthRatio: 1,
  color: [1, 1, 1]
}) {
  const { position, size } = nodes[iter];
  const [currentX, currentY] = position;
  const { color, lineWidthRatio, offsetRatio } = config;

  nodes.map((sibilingNode) => {
    const { position: siblingPosition } = sibilingNode;
    const distance = checkDistance(position, siblingPosition);
    const offset = 1 - distance / offsetRatio;

    context.strokeStyle = `rgba(
      ${color[0] * 255},
      ${color[1] * 255},
      ${color[2] * 255},
      ${offset}
    )`;
    context.lineWidth = offset * lineWidthRatio;
    context.beginPath();
    context.moveTo(currentX, currentY);
    context.lineTo(
      siblingPosition[0] + size / Math.PI,
      siblingPosition[1] + size / Math.PI
    );
    context.closePath();
    context.stroke();
  });
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
  const height = documentClientRect.height * (
    documentClientRect.height >= documentClientRect.width
      ? 1.25
      : 0.5
  );
  const width = documentClientRect.width * (
    documentClientRect.height > documentClientRect.width
      ? 1.25
      : 0.5
  );

  context.canvas.height = height;
  context.canvas.width = width;

  const mainColor = [0.75, 0.25, 0.5, 0.1];
  const config = {
    size: 1,
    color: mainColor,
    distancePerFrame: 0.5,
    lines: {
      offsetRatio: 1000,
      lineWidthRatio: 0.25,
      color: mainColor,
    }
  };
  const nodes = graph(
    25,
    context.canvas.height,
    context.canvas.width,
    config.size,
    config.color
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
      drawNode(context, nodes, iter);
      drawLine(context, nodes, iter, config.lines);
    });

    loop = requestAnimationFrame(animation);
  }

  loop = requestAnimationFrame(animation);

  const button = document.querySelector('#stop');
  if (!button) return;

  button.addEventListener('click', () => {
    if (!loop) return;

    cancelAnimationFrame(loop);
    loop = null;
  });
});
