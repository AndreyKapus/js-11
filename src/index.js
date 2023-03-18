// const axios = require('axios');
import { fetchPics } from "./fetchPictures/fetchPictures";

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name=searchQuery]');
const bodyEl = document.querySelector('.body')



function onFormSubmit(e) {
  e.preventDefault();
  const inputQuery = e.currentTarget.elements.searchQuery.value;


  fetchPics(inputQuery).then(data => drawPictures(data)).catch(console.log(error))

}

function drawPictures(data) {
  const {hits} = data;

const markup = hits.map(({id, webformatURL, largeImageURL, tags, likes, comments, downloads, views}) => {
      return `
      <div>
        <ul>
          <li>
            <img src=${webformatURL} width='300px'/>
            <div>${likes}</div>
            <div>${tags}</div>
            </li>
        </ul>
      </div>
      `;
  }).join('');
  bodyEl.insertAdjacentHTML('beforeend', markup)
}

// function checkData(data) {
//   if(data.lenght >= 1) {
//     drawPictures(data)
//   }
//   drawPictures(data)
// }

formEl.addEventListener('submit', onFormSubmit)