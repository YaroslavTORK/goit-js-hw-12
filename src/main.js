import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader, hideLoadBtn, showLoadBtn } from './js/render-functions.js';

const formEl = document.querySelector('.form');
const onLoadMore = document.querySelector(".js-load-more");

let currentQuery = '';
let page = 1;
const PER_PAGE = 15;
let totalHits = 0;


formEl.addEventListener('submit', onSearchSubmit);
onLoadMore.addEventListener("click", loadMoreFn)

function loadMoreFn() {
  page += 1;
  
  fetchPage().then(() => {
    const firstCard = document.querySelector('.gallery-item');
    if (!firstCard) return;
    const { height } = firstCard.getBoundingClientRect();
    window.scrollBy({ top: height * 2, behavior: 'smooth' });
  });
}

function onSearchSubmit(e) {
  e.preventDefault();
  const query = formEl.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({ message: 'Please enter a search query.', position: 'topRight' });
    return;
  }

  currentQuery = query;
  page = 1;
  totalHits = 0;
  hideLoadBtn();
  clearGallery();
  fetchPage(); 
}

async function fetchPage() {
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, page);

    if (page === 1) totalHits = data.totalHits;

    if (!data.hits?.length) {
      if (page === 1) {
        iziToast.info({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight'
        });
      }
      hideLoadBtn();
      return;
    }
    createGallery(data.hits);

    const loadedSoFar = page * PER_PAGE;
    if (loadedSoFar < totalHits) {
      showLoadBtn();
    } else {
      hideLoadBtn();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
}
  

