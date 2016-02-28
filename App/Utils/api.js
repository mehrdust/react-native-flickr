var API_KEY = 'c1d19218884ad7798723808be4d48fd6';
var API_URL = 'https://api.flickr.com/services/rest/?format=json&nojsoncallback=1';
var PAGE_SIZE = 15;
var PARAMS = `&api_key=${API_KEY}&per_page=${PAGE_SIZE}`;
var REQUEST_URL = API_URL + PARAMS;

var api = {
  getPhotos(tag){
    tag = tag.toLowerCase().trim();
  	var method = (tag && tag != '') ? 'flickr.photos.search' : 'flickr.photos.getRecent';
    var url = `${REQUEST_URL}&tags=${tag}&method=${method}`;
    return fetch(url).then((res) => res.json());
  }
};

module.exports = api;