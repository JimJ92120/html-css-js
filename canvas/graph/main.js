"use strict";

window.addEventListener('load', () => {
  const canvas = document.querySelector('#canvas');
  if (!canvas) return;

  const context = canvas.getContext('2d');
  if (!context) return;

  console.log(context);
  const documentClientRect =  document.documentElement.getBoundingClientRect();

  context.canvas.height = documentClientRect.height;
  context.canvas.width = documentClientRect.width;
});
