const Model = function () {

  let filter = [];
  var firebase = require("firebase");
  const key = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA';

  this.createDatabase = function() {
    // Get a reference to the database service
    var database = firebase.database();
  }

  this.createStorage = function() {
    var storage = firebase.storage();
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images');
  }

  this.handleFileSelect = function(evt) {
    var storage = firebase.storage();
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images');
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];
      var metadata = {
        'contentType': file.type
      };
      // Push to child path.
      // [START oncomplete]
      storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log('File metadata:', snapshot.metadata);
        }).catch(function(error) {
          // [START onfailure]
          console.error('Upload failed:', error);
          // [END onfailure]
        });
        // [END oncomplete]
    }

  //This function is called when a user logs in via Google. It adds the user in
  //the database.
  this.writeUserData = function(email, id, profile_pic, username, fullName) {
    var name = email;
    name = name.substring(0,username.indexOf("@"));
    name = name.replace(/[^a-z0-9]+|\s+/gmi, "");
    console.log(name);

    firebase.database().ref('/users/' + name).set({
      email: email,
      id: id,
      profile_pic : profile_pic,
      username: name,
      fullName: fullName
    });
  }


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