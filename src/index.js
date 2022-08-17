var throttle = require('lodash.throttle');
import API from './fetchImages';
import Notiflix from 'notiflix';
//import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
   searchForm: document.getElementById('search-form'),
   imageBox: document.querySelector('.gallery'),
   buttonMore: document.querySelector('.load-more'),
   imageTag: '',
   clickCount: 0,
}

refs.buttonMore.classList.remove('load-more');
refs.buttonMore.classList.add('hidden');

refs.searchForm.addEventListener('input', throttle(onFormInput, 500));

refs.searchForm.addEventListener('submit', throttle(onSearchButtonClick, 500));

refs.buttonMore.addEventListener('click', throttle(onButtonClick, 500))

function onFormInput(e) {
   e.preventDefault();
   console.log(e.target.value)
   refs.imageTag = e.target.value;
};

   function onSearchButtonClick(e) { 
   e.preventDefault();
   refs.clickCount = 0;
   refs.imageBox.innerHTML = '';
   const SearchTag = refs.imageTag;
   API.getTodoItems(SearchTag)
   .then(renderImageCard)
   .catch(catchError)
   }

function renderImageCard(images) {
   console.log(images.totalHits);
   if (images.length == 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
   } else if (images.length < 40) {
      const markup = (images.hits).map((image) => {
      return `<div class="photo-card">
         <img class="gallery__image" src="${image.webformatURL}" alt="${image.tag}" loading="lazy" />
         <div class="info">
            <p class="info-item">
               <b>Likes ${image.likes}</b>
            </p>
            <p class="info-item">
               <b>Views ${image.views}</b>
            </p>
            <p class="info-item">
               <b>Comments ${image.comments}</b>
            </p>
            <p class="info-item">
               <b>Downloads ${image.downloads}</b>
            </p>
         </div>
      </div>`
   }).join('');
      refs.imageBox.innerHTML = markup;
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
      Notiflix.Notify.success('We are sorry, but you have reached the end of search results.');
   } else {
   refs.buttonMore.classList.remove('hidden');
   refs.buttonMore.classList.add('load-more');
   const markup = (images.hits).map((image) => {
      return `<div class="photo-card">
         <img class="gallery__image" src="${image.webformatURL}" alt="${image.tag}" loading="lazy" />
         <div class="info">
            <p class="info-item">
               <b>Likes ${image.likes}</b>
            </p>
            <p class="info-item">
               <b>Views ${image.views}</b>
            </p>
            <p class="info-item">
               <b>Comments ${image.comments}</b>
            </p>
            <p class="info-item">
               <b>Downloads ${image.downloads}</b>
            </p>
         </div>
      </div>`
   }).join('');
      refs.imageBox.innerHTML = markup;
      Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
   };
}
function onButtonClick(e) {
   e.preventDefault();
   refs.clickCount += 1;
   console.log(refs.clickCount)
   API.getTodoItems(refs.imageTag)
   .then(renderImageCard)
   .catch(catchError)
}
function catchError(error) {
   console.error(error);
}
export default { refs };
//var lightbox = new SimpleLightbox('.gallery a', { captionDelay: 250 });
