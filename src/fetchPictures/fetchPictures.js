 const API = "https://pixabay.com/api/";
 const API_KEY = "29432159-064ba5645d6ae7f18ff2bb6d2";

export class PicturesApiService{
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
async fetchPics() {
    const response = await fetch(`${API}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch-true&page=${this.page}`)
    const getPics = await response.json();
    this.page += 1
    return getPics;



  //  return fetch(`${API}/?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch-true`)
  //   .then((res) => {
  //     if(!res.ok) {
  //       throw new Error(res.statusText)
  //     }
  //     return res.json()
  //   })
   };
   get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

 }


