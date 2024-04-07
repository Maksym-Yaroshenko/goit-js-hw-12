import getPixabay from './js/pixabay-api';
import renderInput from './js/render-functions';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = {
  form: document.querySelector('.search-form'),
  ul: document.querySelector('.flex-container'),
  load: document.querySelector('.loader'),
  btn: document.querySelector('.btn-load-more'),
};

let user;
let page = 1;
let maxPage = 0;
const pageSize = 15;

searchForm.form.addEventListener('submit', handleSubmit);
searchForm.btn.addEventListener('click', onLoadMoreClick);

async function handleSubmit(event) {
  event.preventDefault();
  user = event.target.query.value.trim();
  if (user) {
    try {
      page = 1;
      searchForm.ul.innerHTML = '';
      showLoader();
      hideBtnLadMore();
      const data = await getPixabay(user, page);

      if (data.hits.length !== 0) {
        maxPage = Math.ceil(data.totalHits / pageSize);

        const markup = renderInput(data.hits);

        searchForm.ul.insertAdjacentHTML('beforeend', markup);

        new SimpleLightbox('.flex-container a', {
          captionsData: 'alt',
          captionDelay: 250,
        }).refresh();
      } else {
        iziToastIcon(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        hideLoader();
        return searchForm.form.reset();
      }
    } catch (error) {
      iziToastIcon(`${error}`);
    }

    hideLoader();
    showBtnLadMore();
    return searchForm.form.reset();
  } else {
    iziToastIcon('Please enter the text');
    return searchForm.form.reset();
  }
}

async function onLoadMoreClick() {
  page += 1;
  hideBtnLadMore();
  showLoader();
  try {
    const data = await getPixabay(user, page);
    const markup = renderInput(data.hits);

    searchForm.ul.insertAdjacentHTML('beforeend', markup);

    new SimpleLightbox('.flex-container a', {
      captionsData: 'alt',
      captionDelay: 250,
    }).refresh();
  } catch (error) {
    iziToastIcon(`${error}`);
  }

  browserScroll();

  hideLoader();
  showBtnLadMore();
  checkBtnStatus();
}

// Винесення в окрему функцію виїджаючого попередження
function iziToastIcon(text) {
  return iziToast.show({
    backgroundColor: '#ef4040',
    messageColor: 'white',
    messageSize: '16px',
    position: 'topRight',
    message: text,
    close: false,
  });
}

function checkBtnStatus() {
  if (page >= maxPage) {
    hideBtnLadMore();
    iziToastIcon("We're sorry, but you've reached the end of search results.");
  } else {
    showBtnLadMore();
  }
}

function showLoader() {
  searchForm.load.classList.remove('hidden');
}

function hideLoader() {
  searchForm.load.classList.add('hidden');
}

function showBtnLadMore() {
  searchForm.btn.classList.remove('hidden');
}

function hideBtnLadMore() {
  searchForm.btn.classList.add('hidden');
}

function browserScroll() {
  const firstCard = searchForm.ul.querySelector('.retrieved-search-element');

  const height = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 2,
    behavior: 'smooth',
  });
}
