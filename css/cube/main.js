window.addEventListener('load', () => {
  const shiftButtons = document.querySelectorAll('.shift');

  const classes = {
    front: 'face--front',
    bottom: 'face--bottom',
    top: 'face--top',
  };
  const cube = {
    front: document.querySelector(`.face-1`),
    bottom: document.querySelector(`.face-2`),
  };

  shiftButtons.forEach((button) => {
    button.addEventListener('click', () => {  
      if (cube.front.classList.contains(classes.front)) {
        cube.front.classList.remove(classes.front);
        cube.front.classList.add(classes.top);
  
        cube.bottom.classList.remove(classes.bottom);
        cube.bottom.classList.add(classes.front);
      } else {
        cube.bottom.classList.remove(classes.front);
        cube.bottom.classList.add(classes.bottom);
        cube.front.classList.remove(classes.top);
        cube.front.classList.add(classes.front);
      }
    });
  })
});
