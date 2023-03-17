 const API = "https://pixabay.com/api/";
 const API_KEY = "29432159-064ba5645d6ae7f18ff2bb6d2";

 export function fetchPics(data) {
  fetch(`${API}/?key=${API_KEY}&q=${data}&image_type=photo&orientation=horizontal&safesearch-true`).then(res => {
    return res.json()
  })
 };

 