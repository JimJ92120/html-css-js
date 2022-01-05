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
    'ArrowUp',
    'ArrowDown',
    'ArrowRight',
    'ArrowLeft'
  ];

  document.addEventListener('keydown', (e) => {
    const currentDirection = keyNames.indexOf(e.code);

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
  });
});
