// const axios = require('axios');
import { PicturesApiService } from "./fetchPictures/fetchPictures";

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name=searchQuery]');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more')

const picturesApiService = new PicturesApiService()

async function onFormSubmit(e) {
  e.preventDefault();
  clearContainer();
 picturesApiService.query = e.currentTarget.elements.searchQuery.value;
try {
  const pictures = await picturesApiService.fetchPics();
  checkData(pictures);
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
      <div>
        <ul>
          <li>
            <img src=${webformatURL} width='300px'/>
            <div><p>Likes: </p> ${likes}</div>
            <div><p>Tags: </p>${tags}</div>
            <div><p>Views: </p>${views}</div>
            <div><p>Downloads: </p>${downloads}</div>
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
  drawPictures(data)
};

function clearContainer() {
  galleryEl.innerHTML = '';
};

function onLoadMore() {

}

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMore)