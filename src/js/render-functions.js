import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');
const onLoadMore = document.querySelector(".js-load-more");

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
    const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <ul class="info">
          <li><b>Likes:</b> ${likes}</li>
          <li><b>Views:</b> ${views}</li>
          <li><b>Comments:</b> ${comments}</li>
          <li><b>Downloads:</b> ${downloads}</li>
        </ul>
      </li>`
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  loaderEl.classList.add('is-hidden');
}

export function showLoadBtn() {
  onLoadMore.classList.remove('is-hidden');
}

export function hideLoadBtn() {
  onLoadMore.classList.add('is-hidden');
}
