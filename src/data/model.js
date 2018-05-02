<<<<<<< HEAD
//Hejhejhej
const DinnerModel = function () {
=======
const Model = function () {
>>>>>>> d4894ba7cc7b9029662dc3c23ae943a9d4e68acf

  let filter = [];
  var firebase = require("firebase");
  const key = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA'

  this.googleLogin = function() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)

        .then(result => {
          const user = result.user;
          window.location = 'signup';
          console.log(user)
        })
        .catch(console.log);
  }

  // API Calls

  this.map = function(finalURL){

    return fetch(finalURL)
    .then(res => res.json())
    .then(json => json.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId))

  }

  this.getVideos = function () {
    const channelID = 'UCEQi1ZNJiw3YMRwni0OLsTQ'
    const result = 20;
    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`

    return this.map(finalURL);

  }

  this.search = function (filter) {
    const channelID = 'UCEQi1ZNJiw3YMRwni0OLsTQ'
    const result = 2;
    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet,id&order=date&maxResults=${result}`
    console.log("finalurl är: " + finalURL);
    return this.map(finalURL);

  }

  this.getFilter = function () {
    return filter;
  }

  this.setFilter = function (newFilter) {
    filter = newFilter;
    {/*notifyObservers();*/}
  }

}

export const modelInstance = new Model();
