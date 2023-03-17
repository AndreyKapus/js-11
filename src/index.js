// const axios = require('axios');
import { fetchPics } from "./fetchPictures/fetchPictures";

const formEl = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name=searchQuery]');

formEl.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
  e.preventDefault();
  const inputQuery = e.currentTarget.elements.searchQuery.value;


  fetchPics(inputQuery)
}



