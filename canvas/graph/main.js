"use strict";

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
    },
  ];

  let loop;

  function animation() {
    context.arc(nodes[0].position[0], nodes[0].position[1], config.size, 0, 2 * Math.PI);
    context.fill();

    const [previousX, previousY] = nodes[0].position;
    nodes[0].position[0] = previousX + 1;
    nodes[0].position[1] = previousY + 1;

    loop = requestAnimationFrame(animation);
  }

  context.fillStyle = config.color;
  loop = requestAnimationFrame(animation);

  setTimeout(() => {
    cancelAnimationFrame(loop);
    console.log('stop');
  }, 5000);
});
