// const axios = require('axios');
import { PicturesApiService } from "./fetchPictures/fetchPictures";
import { LoadMoreBtn } from "./loadMoreBtn/loadMoreBtn";

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name=searchQuery]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

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
        <ul class="imageList">
          <li>
            <img src=${webformatURL} width='300px' height='200px'/>
              <div class="card-info-wrapper">
                <div class="card-item"><p>Likes</p>${likes}</div>
                <div class="card-item"><p>Comments</p>${comments}</div>
                <div class="card-item"><p>Views</p>${views}</div>
                <div class="card-item"><p>Downloads</p>${downloads}</div></div>
            </li>
        </ul>
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