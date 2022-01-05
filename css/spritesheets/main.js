function removeClassNames(element, classNames) {
  classNames.map((className) => {
    if (!element.classList.contains(className)) return;

    element.classList.remove(className);
  });
}

window.addEventListener('load', () => {
  const character = document.querySelector('#character');
  const animationClassNames = [
    'to-top',
    'to-bottom',
    'to-right',
    'to-left'
  ];
  const keyNames = [
    'up',
    'down',
    'right',
    'left'
  ];
  const updateAnimation = (controlKey) => {
    if ('space' === controlKey) {
      removeClassNames(character, animationClassNames);

      return;
    }
  
    const currentDirection = keyNames.indexOf(controlKey);

    if (currentDirection < 0) return;

    const classNamesToRemove = animationClassNames
      .reduce((classNames, className, key) => {
        if (key !== currentDirection) {
          classNames.push(className);
        }

        return classNames;
      }, []);

    removeClassNames(character, classNamesToRemove);

    return character.classList.add(animationClassNames[currentDirection]);
  }

  document.addEventListener('keydown', (e) => {
    updateAnimation(e.code.replace('Arrow', '').toLowerCase());
  });

  document.querySelectorAll('.control').forEach((controlElement) => {
    controlElement.addEventListener('click', () => {
      updateAnimation(controlElement.getAttribute('data-control'));
    });
  });
});
