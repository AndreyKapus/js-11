// const axios = require('axios');
import { PicturesApiService } from "./fetchPictures/fetchPictures";
import { LoadMoreBtn } from "./loadMoreBtn/loadMoreBtn";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name=searchQuery]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
})

const picturesApiService = new PicturesApiService()

async function onFormSubmit(e) {
  e.preventDefault();
  clearContainer();

 picturesApiService.query = e.currentTarget.elements.searchQuery.value;
try {
  picturesApiService.resetPage()
  const pictures = await picturesApiService.fetchPics();
  checkData(pictures);
  loadMoreBtnEl.show()
  Notify.success(`We found ${pictures.totalHits} pictures`);
 }
catch (error) {
  console.log(error)
 }
}

function drawPictures(data) {
  const {hits} = data;

const markup = hits
.map(({id, webformatURL, largeImageURL, tags, likes, comments, downloads, views}) => {
      return `
      <div class="container">
        <div class="imageList">
          <a class="gallery-link" href="${largeImageURL}">
          <div class="list-item">
          <img src=${webformatURL} width='300px' height='200px'/>
            <div class="card-info-wrapper">
              <div class="card-item"><p class="card-title">Likes</p>${likes}</div>
              <div class="card-item"><p class="card-title">Comments</p>${comments}</div>
              <div class="card-item"><p class="card-title">Views</p>${views}</div>
              <div class="card-item"><p class="card-title">Downloads</p>${downloads}</div></div>
          </div>
          </a>


        </div>
      </div>
      `;
  }).join('');
  galleryEl.insertAdjacentHTML('beforeend', markup)
}

function checkData(data) {
  if(data.hits <= 1) {
    alert('"Sorry, there are no images matching your search query. Please try again."')
  }
  drawPictures(data);
  lightbox.refresh();
};

function clearContainer() {
  galleryEl.innerHTML = '';
};

async function onLoadMore() {
  loadMoreBtnEl.disable();
  picturesApiService.page += 1;
  const pictures = await picturesApiService.fetchPics();
  checkData(pictures);
  loadMoreBtnEl.enable()

}

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.refs.button.addEventListener('click', onLoadMore)