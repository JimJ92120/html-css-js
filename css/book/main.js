window.addEventListener('load', () => {
  const classNames = {
    current: 'book__page--current',
    read: 'book__page--read',
  };

  const previousButton = document.querySelector('#previous');
  const nextButton = document.querySelector('#next');
  const pages = document.querySelectorAll('.book__page');
  const pageCount = pages.length;

  let currentPage = 0;
  const updatePage = (toShow) => {

    if ((toShow !== 'next' && toShow !== 'previous')
      || (toShow === 'next' && currentPage === pageCount - 1)
      || (toShow === 'previous' && currentPage === 0)
    ) return;

    if (toShow === 'previous') {
      pages[currentPage].classList.remove(classNames.current);

      --currentPage;

      pages[currentPage].classList.remove(classNames.read);
    } else {
      pages[currentPage].classList.replace(
        classNames.current,
        classNames.read
      );

      ++currentPage;
    }

    pages[currentPage].classList.add(classNames.current);
  };

  previousButton.addEventListener('click', () => {
    updatePage('previous');
  });
  nextButton.addEventListener('click', () => {
    updatePage('next');
  })
});
